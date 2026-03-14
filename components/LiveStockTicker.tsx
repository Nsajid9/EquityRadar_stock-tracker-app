"use client";
import { StockQuote } from "@/lib/mockData";
import { TrendingDown, TrendingUp } from "lucide-react";
import FlashPrice from "./FlashPrice";

export default function LiveStockTicker({ stocks }: { stocks: StockQuote[] }) {
  if (!stocks || stocks.length === 0) return null;

  return (
    <div className="w-full bg-gray-950/80 border-b border-white/5 backdrop-blur-md overflow-hidden flex whitespace-nowrap py-2 z-40 relative">
      <div className="flex animate-marquee min-w-max">
        {/* We duplicate the array to allow for infinite smooth scrolling */}
        {[...stocks, ...stocks, ...stocks, ...stocks, ...stocks, ...stocks].map((stock, i) => (
          <div key={`${stock.ticker}-${i}`} className="flex items-center space-x-3 px-6 border-r border-white/10 last:border-none">
            <span className="font-bold text-gray-200">{stock.ticker}</span>
            <FlashPrice price={stock.price} className="text-gray-300" />
            <span className={`text-sm flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" /> }
              {Math.abs(stock.changePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
