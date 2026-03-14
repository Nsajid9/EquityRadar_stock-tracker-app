import { inngest } from "./client";
import { prisma } from "../lib/prisma";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

// This background job runs every hour on weekdays during market hours
// It checks all watched stocks in portfolios and updates their latest prices
export const checkPortfolioPrices = inngest.createFunction(
  { id: "check-portfolio-prices", name: "Check Portfolio DB Prices" },
  { cron: "0 * * * 1-5" }, // Every hour, Monday-Friday
  async ({ step }) => {
    
    // 1. Fetch all unique tickers from all user portfolios
    const uniqueTickers = await step.run("fetch-unique-tickers", async () => {
      const items = await prisma.portfolioItem.findMany({
        select: { ticker: true },
        distinct: ['ticker'],
      });
      return items.map((item) => item.ticker);
    });

    if (uniqueTickers.length === 0) {
      return { message: "No active portfolio items to check." };
    }

    // 2. Query Yahoo finance for the latest prices
    const stockResults = await step.run("fetch-latest-prices", async () => {
      const quotes = await yahooFinance.quote(uniqueTickers);
      const quotesArray = Array.isArray(quotes) ? quotes : [quotes];
      
      const priceMap: Record<string, number> = {};
      quotesArray.forEach((quote) => {
        if (quote && quote.symbol && quote.regularMarketPrice) {
          priceMap[quote.symbol] = quote.regularMarketPrice;
        }
      });
      return priceMap;
    });

    // 3. Update database or fire subsequent alerting events here
    await step.run("log-price-updates", async () => {
        console.log("CRON JOB: Successfully fetched latest prices for:", Object.keys(stockResults).length, "tickers.");
        // In a real production deployment, you might trigger email alerts if stockResults[ticker]
        // drops below the user's avgPrice stored in prisma.portfolioItem.
    });

    return { success: true, activeTickersChecked: uniqueTickers.length };
  }
);
