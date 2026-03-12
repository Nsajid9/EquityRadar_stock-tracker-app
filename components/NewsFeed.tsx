"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  timeAgo: string;
  url: string;
}

interface NewsFeedProps {
  news: NewsArticle[];
  loading?: boolean;
}

export default function NewsFeed({ news, loading }: NewsFeedProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-xl bg-zinc-900/50" />
        <Skeleton className="h-32 w-full rounded-xl bg-zinc-900/50" />
        <Skeleton className="h-32 w-full rounded-xl bg-zinc-900/50" />
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="py-8 text-center text-zinc-500 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
        No recent news available for this company.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">Recent News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((article) => (
            <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-xl">
              <Card className="bg-zinc-950/50 border-zinc-800 hover:border-zinc-600 transition-colors h-full">
                <CardContent className="p-5 flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">
                        {article.source}
                        </span>
                        <div className="flex items-center text-xs text-zinc-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.timeAgo}
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-100 line-clamp-2 leading-tight">{article.headline}</h3>
                    <p className="text-sm text-zinc-400 mt-2 line-clamp-3">{article.summary}</p>
                  </div>
                  <div className="flex items-center text-yellow-500 text-sm font-medium pt-2 border-t border-zinc-800/50">
                    Read full article <ExternalLink className="h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
