import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();

export async function POST(req: Request) {
  try {
    const { ticker } = await req.json();

    if (!ticker) {
      return NextResponse.json(
        { error: "Ticker symbol is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 1. Fetch real-time context about the stock to feed to the AI
    const quote = await yahooFinance.quote(ticker) as any;
    const summary = await yahooFinance.quoteSummary(ticker, {
      modules: ["price", "summaryDetail", "financialData"],
    }) as any;

    // 2. Build the precise prompt for the model
    const prompt = `
      You are an expert financial analyst. Analyze the following real-time data for the stock ticker ${ticker} (${quote?.shortName || quote?.longName || ticker}).
      
      Current Price: ${quote?.regularMarketPrice || "N/A"} ${quote?.currency || "INR"}
      Day Range: ${quote?.regularMarketDayLow || "N/A"} - ${quote?.regularMarketDayHigh || "N/A"}
      52-Week Range: ${quote?.fiftyTwoWeekLow || "N/A"} - ${quote?.fiftyTwoWeekHigh || "N/A"}
      Market Cap: ${summary?.summaryDetail?.marketCap || "N/A"}
      Trailing PE: ${summary?.summaryDetail?.trailingPE || "N/A"}
      Revenue Growth: ${summary?.financialData?.revenueGrowth || "N/A"}

      Provide a 3-paragraph executive summary covering:
      1. A brief overview of the company's current market position based on these metrics.
      2. Key strengths or weaknesses visible in these numbers (e.g., P/E ratio, 52-week position).
      3. A neutral, forward-looking sentiment (avoid giving direct buy/sell advice).
      
      Format the response cleanly with markdown bolding headers, using a professional but accessible tone. Try to keep it concise and strictly focused on the provided data.
    `;

    // 3. Generate content using Gemini 2.5 Flash
    const response = await model.generateContent(prompt);
    const analysis = response.response.text();

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error("AI Insight Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI insights: " + error.message },
      { status: 500 }
    );
  }
}
