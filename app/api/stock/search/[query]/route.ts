import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ query: string }> }
) {
  try {
    const query = (await params).query;
    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const result = (await yahooFinance.search(query, {
      newsCount: 0,
      quotesCount: 5 
    })) as any;

    if (!result || !result.quotes || result.quotes.length === 0) {
      return NextResponse.json([]); // Return empty array if no quotes
    }

    const formattedQuotes = result.quotes
      .filter((q: any) => q.isYahooFinance !== false) 
      .map((item: any) => {
      return {
        ticker: item.symbol,
        name: item.shortname || item.longname || item.symbol,
      };
    });

    return NextResponse.json(formattedQuotes);
  } catch (error) {
    console.error("Error fetching search:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
