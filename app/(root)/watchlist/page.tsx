"use client";

import { useEffect, useState } from "react";
import { StockService } from "@/lib/api/stockService";
import { StockQuote } from "@/lib/mockData";
import StockList from "@/components/StockList";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WatchlistPage() {
  const [stocks, setStocks] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const saved = JSON.parse(localStorage.getItem('stock_watchlist') || '[]');
      
      if (saved.length === 0) {
        setStocks([]);
        setLoading(false);
        return;
      }

      // Fetch quotes for all saved tickers
      const quotes = await Promise.all(
        saved.map((ticker: string) => StockService.getStockQuote(ticker))
      );
      
      setStocks(quotes.filter((q) => q !== null) as StockQuote[]);
    } catch (e) {
      console.error("Failed to load watchlist", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleRemove = (ticker: string) => {
    try {
      const saved = JSON.parse(localStorage.getItem('stock_watchlist') || '[]');
      const newWatchlist = saved.filter((t: string) => t !== ticker);
      localStorage.setItem('stock_watchlist', JSON.stringify(newWatchlist));
      
      // Update local state
      setStocks((prev) => prev.filter((s) => s.ticker !== ticker));
    } catch (e) {}
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[70vh]">
      <div className="flex flex-col gap-2 border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight flex items-center">
          <Star className="mr-3 h-8 w-8 text-yellow-500 fill-yellow-500/20" /> My Watchlist
        </h1>
        <p className="text-zinc-500 text-lg">Track your favorite stocks and monitor their performance.</p>
      </div>

      <div className="mt-4">
        {loading ? (
          <Skeleton className="w-full h-[300px] rounded-xl bg-zinc-900/50" />
        ) : stocks.length > 0 ? (
          <StockList stocks={stocks} onRemove={handleRemove} />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30">
            <AlertCircle className="h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-medium text-zinc-300 mb-2">Your watchlist is empty</h3>
            <p className="text-zinc-500 mb-6 max-w-md">Search for stocks on the dashboard and click the star icon to add them to your watchlist.</p>
            <Link href="/">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-semibold shadow-xl">
                Explore Stocks
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
