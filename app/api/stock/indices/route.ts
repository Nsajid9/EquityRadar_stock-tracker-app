import { NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET() {
  try {
    const symbols = ['^GSPC', '^DJI', '^IXIC', '^RUT'];
    const quotes = (await yahooFinance.quote(symbols)) as any[];

    if (!quotes || quotes.length === 0) {
      return NextResponse.json({ error: "No indices found" }, { status: 404 });
    }

    const formattedData = quotes.map((quote: any) => {
      let name = quote.shortName || quote.longName || quote.symbol;
      
      // Map ticker symbols to readable names
      if (quote.symbol === '^GSPC') name = 'S&P 500';
      if (quote.symbol === '^DJI') name = 'Dow Jones';
      if (quote.symbol === '^IXIC') name = 'Nasdaq';
      if (quote.symbol === '^RUT') name = 'Russell 2000';

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
