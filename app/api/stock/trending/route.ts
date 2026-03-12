import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const queryOptions = { count: 10, lang: 'en-US' };
    const result = (await yahooFinance.trendingSymbols('US', queryOptions)) as any;
    
    if (!result || !result.quotes || result.quotes.length === 0) {
      return NextResponse.json({ error: "No trending symbols found" }, { status: 404 });
    }

    // Trending symbols only returns basic info, we need to fetch quotes for these to get prices/changes
    const symbols = result.quotes.map((q: any) => q.symbol).slice(0, 10); // get top 10
    
    // Fetch full quotes for trending symbols
    const quotes = (await yahooFinance.quote(symbols)) as any[];
    
    const formattedData = quotes.map((quote: any) => ({
      ticker: quote.symbol,
      name: quote.longName || quote.shortName || quote.symbol,
      price: quote.regularMarketPrice || 0,
      change: quote.regularMarketChange || 0,
      changePercent: quote.regularMarketChangePercent || 0,
      marketCap: quote.marketCap ? formatLargeNumber(quote.marketCap) : "N/A",
      peRatio: quote.trailingPE || quote.forwardPE || 0,
      high52Week: quote.fiftyTwoWeekHigh || 0,
      low52Week: quote.fiftyTwoWeekLow || 0,
      volume: quote.regularMarketVolume ? formatLargeNumber(quote.regularMarketVolume) : "N/A",
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching trending data:", error);
    return NextResponse.json({ error: "Failed to fetch trending data" }, { status: 500 });
  }
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
}
