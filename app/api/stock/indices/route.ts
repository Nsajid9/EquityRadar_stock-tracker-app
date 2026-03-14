import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const symbols = ['^BSESN', '^NSEI', '^NSEBANK', '^CNXIT'];
    const quotes = (await yahooFinance.quote(symbols)) as any[];

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ error: "No indices found" }, { status: 404 });
    }

    const formattedData = quotes.map((quote: any) => {
      let name = quote.shortName || quote.longName || quote.symbol;
      
      // Map ticker symbols to readable names
      if (quote.symbol === '^BSESN') name = 'BSE SENSEX';
      if (quote.symbol === '^NSEI') name = 'NIFTY 50';
      if (quote.symbol === '^NSEBANK') name = 'NIFTY BANK';
      if (quote.symbol === '^CNXIT') name = 'NIFTY IT';

      const change = quote.regularMarketChange || 0;
      return {
        name,
        price: quote.regularMarketPrice || 0,
        change: change,
        changePercent: quote.regularMarketChangePercent || 0,
        isPositive: change >= 0
      };
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching indices:", error);
    return NextResponse.json({ error: "Failed to fetch indices" }, { status: 500 });
  }
}
