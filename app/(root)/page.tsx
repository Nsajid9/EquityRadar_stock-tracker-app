"use client";

import { useEffect, useState } from "react";
import { StockService } from "@/lib/api/stockService";
import { StockQuote, MOCK_MARKET_SUMMARY } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingDown, TrendingUp, Activity, ArrowRight } from "lucide-react";
import TopMoversCarousel from "@/components/TopMoversCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [marketSummary, setMarketSummary] = useState<typeof MOCK_MARKET_SUMMARY>([]);
  const [topMovers, setTopMovers] = useState<StockQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      const [summary, movers] = await Promise.all([
        StockService.getMarketSummary(),
        StockService.getTopMovers(),
      ]);
      setMarketSummary(summary);
      setTopMovers(movers);
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const query = searchQuery.trim();
        const results = await StockService.searchStocks(query);
        
        if (results && results.length > 0) {
           router.push(`/stock/${results[0].ticker}`);
        } else {
           // Fallback if search doesn't find anything
           router.push(`/stock/${query.toUpperCase()}`);
        }
      } catch (err) {
        setIsSearching(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Market Overview</h1>
          <p className="text-zinc-500 mt-1">Real-time market insights and trending stocks.</p>
        </div>
        
        <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-yellow-500 transition-colors" />
          <Input 
            placeholder="Search by ticker (e.g. AAPL)" 
            className="pl-10 h-12 bg-zinc-900/50 border-zinc-800 focus-visible:ring-yellow-500/50 focus-visible:border-yellow-500 transition-all text-base rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isSearching}
          />
        </form>
      </div>

      {/* Market Indices Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading 
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl bg-zinc-900/50" />)
          : marketSummary.map((index) => (
            <Card key={index.name} className="bg-zinc-950/50 border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">
                  {index.name}
                </CardTitle>
                <Activity className="h-4 w-4 text-zinc-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-100">{index.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div className={`text-sm mt-1 flex items-center font-medium ${index.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {index.isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                  {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                </div>
              </CardContent>
            </Card>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 gap-8 mt-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-zinc-100 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-yellow-500" /> Today's Top Movers
            </h2>
          </div>
          {loading ? (
             <div className="flex gap-4 overflow-hidden">
               <Skeleton className="min-w-[300px] h-[160px] rounded-xl bg-zinc-900/50" />
               <Skeleton className="min-w-[300px] h-[160px] rounded-xl bg-zinc-900/50" />
               <Skeleton className="min-w-[300px] h-[160px] rounded-xl bg-zinc-900/50" />
               <Skeleton className="min-w-[300px] h-[160px] rounded-xl bg-zinc-900/50" />
             </div>
          ) : (
            <TopMoversCarousel stocks={topMovers} />
          )}
        </div>
      </div>
    </div>
  );
}
