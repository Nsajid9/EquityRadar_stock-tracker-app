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

    const result = (await yahooFinance.search(ticker.toUpperCase(), {
      newsCount: 6,
      quotesCount: 0 
    })) as any;

    if (!result || !result.news || result.news.length === 0) {
      return NextResponse.json([]); // Return empty array if no news
    }

    const formattedNews = result.news.map((item: any, index: number) => {
      // Calculate time ago
      let timeAgo = "Recently";
      if (item.providerPublishTime) {
        const publishTime = new Date(item.providerPublishTime); // Already in ms in yahoo-finance2
        const diffMs = Date.now() - publishTime.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffHours < 1) timeAgo = "Just now";
        else if (diffHours < 24) timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        else timeAgo = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      }

      return {
        id: item.uuid || `${ticker}-news-${index}`,
        headline: item.title,
        summary: item.publisher, // Yahoo search often doesn't give a huge summary, use publisher as fallback
        source: item.publisher,
        timeAgo: timeAgo,
        url: item.link || "#",
      };
    });

    return NextResponse.json(formattedNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
