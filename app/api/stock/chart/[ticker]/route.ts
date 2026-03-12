import { NextRequest, NextResponse } from "next/server";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
    const ticker = (await params).ticker;
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get("timeframe") || "1D";

    if (!ticker) {
      return NextResponse.json({ error: "Ticker is required" }, { status: 400 });
    }

    // Map timeframes to Yahoo Finance intervals and ranges
    let period1 = new Date();
    let interval: "1m" | "5m" | "15m" | "1d" | "1wk" | "1mo" = "5m";
    let range = "1d";

    switch (timeframe) {
      case "1W":
        period1.setDate(period1.getDate() - 7);
        interval = "15m";
        break;
      case "1M":
        period1.setMonth(period1.getMonth() - 1);
        interval = "1d";
        break;
      case "1Y":
        period1.setFullYear(period1.getFullYear() - 1);
        interval = "1wk";
        break;
      case "1D":
      default:
        period1.setDate(period1.getDate() - 1);
        interval = "5m";
        break;
    }

    const queryOptions = {
        period1: period1,
        interval: interval
    };

    const result = (await yahooFinance.chart(ticker.toUpperCase(), queryOptions)) as any;

    if (!result || !result.quotes || result.quotes.length === 0) {
      return NextResponse.json({ error: "No chart data found" }, { status: 404 });
    }

    // Format to match our ChartDataPoint interface
    const formattedData = result.quotes
        .filter((q: any) => q.close !== null) // Filter out null values
        .map((q: any) => {
      const date = new Date(q.date);
      // Format time differently based on timeframe
      let timeLabel = "";
      if (timeframe === "1D" || timeframe === "1W") {
        timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (timeframe === "1W") timeLabel = `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${timeLabel}`;
      } else {
        timeLabel = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: timeframe === '1Y' ? '2-digit' : undefined });
      }

      return {
        time: timeLabel,
        price: Number((q.close || 0).toFixed(2)),
      };
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }
}
