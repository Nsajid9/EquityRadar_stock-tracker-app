import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
      const ticker = (await params).ticker;
      if (!ticker) {
      return NextResponse.json({ error: "Ticker is required" }, { status: 400 });
    }

    const quote = (await yahooFinance.quote(ticker.toUpperCase())) as any;
    
    if (!quote) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 });
    }

    // Format to match our StockQuote interface
    const formattedQuote = {
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
      currencySymbol: formatCurrencySymbol(quote.currency)
    };

    return NextResponse.json(formattedQuote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
}

function formatCurrencySymbol(currencyStr: string | undefined): string {
  if (!currencyStr) return "$";
  const upper = currencyStr.toUpperCase();
  if (upper === "INR") return "₹";
  if (upper === "EUR") return "€";
  if (upper === "GBP") return "£";
  if (upper === "JPY") return "¥";
  return "$";
}
