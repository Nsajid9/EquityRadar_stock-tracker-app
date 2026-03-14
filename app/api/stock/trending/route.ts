import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    // Trending symbols for 'IN' can be flaky in yahoo-finance2, so we manually fetch the top NSE stocks
    const symbols = [
      'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS',
      'ICICIBANK.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'ITC.NS', 'HINDUNILVR.NS', 'LT.NS'
    ];
    
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
