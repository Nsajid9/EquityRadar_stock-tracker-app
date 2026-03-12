"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StockService } from "@/lib/api/stockService";
import { StockQuote, NewsArticle } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingDown, TrendingUp, Star, ArrowLeft } from "lucide-react";
import StockChart from "@/components/StockChart";
import NewsFeed from "@/components/NewsFeed";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function StockDetailsPage() {
  const params = useParams();
  const ticker = params.ticker as string;
  const [stock, setStock] = useState<StockQuote | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      const [quoteData, newsData] = await Promise.all([
        StockService.getStockQuote(ticker),
        StockService.getStockNews(ticker)
      ]);
      setStock(quoteData);
      setNews(newsData);
      setLoading(false);
      
      // Check if in watchlist
      try {
        const saved = JSON.parse(localStorage.getItem('stock_watchlist') || '[]');
        if (saved.includes(ticker.toUpperCase())) {
          setInWatchlist(true);
        }
      } catch (e) {}
    };
    if (ticker) {
      fetchStockData();
    }
  }, [ticker]);

  const toggleWatchlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('stock_watchlist') || '[]');
      let newWatchlist;
      if (inWatchlist) {
        newWatchlist = saved.filter((t: string) => t !== ticker.toUpperCase());
      } else {
        newWatchlist = [...saved, ticker.toUpperCase()];
      }
      localStorage.setItem('stock_watchlist', JSON.stringify(newWatchlist));
      setInWatchlist(!inWatchlist);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-20 w-1/3 rounded-xl bg-zinc-900/50" />
        <Skeleton className="h-[400px] w-full rounded-xl bg-zinc-900/50" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full rounded-xl bg-zinc-900/50" />
          <Skeleton className="h-24 w-full rounded-xl bg-zinc-900/50" />
          <Skeleton className="h-24 w-full rounded-xl bg-zinc-900/50" />
          <Skeleton className="h-24 w-full rounded-xl bg-zinc-900/50" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-xl bg-zinc-900/50 mt-4" />
      </div>
    );
  }

  if (!stock) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 w-full max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-zinc-100">Stock Not Found</h1>
        <p className="text-zinc-500">Could not find data for ticker: {ticker}</p>
        <Link href="/">
          <Button variant="outline" className="mt-4 border-zinc-700 hover:bg-zinc-800 text-zinc-300">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <Link href="/" className="text-sm text-zinc-500 hover:text-yellow-500 mb-4 inline-flex items-center transition-colors">
            <ArrowLeft className="mr-1 h-3 w-3" /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">{stock.ticker}</h1>
            <span className="px-2 py-1 bg-zinc-800/80 text-zinc-400 text-sm font-medium rounded-md">{stock.name}</span>
          </div>
          <div className="flex items-end gap-3 mt-3">
            <span className="text-5xl font-bold text-zinc-100">{stock.currencySymbol || '$'}{stock.price.toFixed(2)}</span>
            <div className={`text-lg font-medium mb-1 flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? <TrendingUp className="mr-1 h-5 w-5" /> : <TrendingDown className="mr-1 h-5 w-5" />}
              {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        <Button 
          onClick={toggleWatchlist}
          variant={inWatchlist ? "secondary" : "default"}
          className={`h-12 px-6 shadow-xl transition-all ${
            inWatchlist 
              ? 'bg-zinc-800 text-yellow-500 hover:bg-zinc-700/80' 
              : 'bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-semibold'
          }`}
        >
          <Star className={`mr-2 h-5 w-5 ${inWatchlist ? 'fill-yellow-500' : ''}`} />
          {inWatchlist ? "Saved to Watchlist" : "Add to Watchlist"}
        </Button>
      </div>

      {/* Chart Section */}
      <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm pt-6 pb-2 px-6">
        <StockChart ticker={stock.ticker} currencySymbol={stock.currencySymbol} />
      </Card>

      {/* Key Stats Grid */}
      <div>
        <h2 className="text-xl font-semibold text-zinc-100 mb-4">Key Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">{stock.marketCap}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">P/E Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">{stock.peRatio.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">52-Week Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-zinc-100">{stock.currencySymbol || '$'}{stock.low52Week} - {stock.currencySymbol || '$'}{stock.high52Week}</div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-100">{stock.volume}</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* News Feed Section */}
      <div className="pt-4 border-t border-zinc-900">
        <NewsFeed news={news} loading={loading} />
      </div>
    </div>
  );
}
