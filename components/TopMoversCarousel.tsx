"use client";

import { useRef } from "react";
import { StockQuote } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import FlashPrice from "./FlashPrice";

interface TopMoversCarouselProps {
  stocks: StockQuote[];
}

export default function TopMoversCarousel({ stocks }: TopMoversCarouselProps) {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  if (!stocks || stocks.length === 0) return null;

  return (
    <div className="w-full relative px-2 sm:px-12 py-4">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <div className="absolute -top-12 right-12 hidden sm:flex space-x-2 z-10">
          <CarouselPrevious className="relative bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:text-yellow-500 translate-y-0 left-0 right-0 top-0 h-8 w-8" />
          <CarouselNext className="relative bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:text-yellow-500 translate-y-0 left-0 right-0 top-0 h-8 w-8" />
        </div>
        
        <CarouselContent className="-ml-2 md:-ml-4">
          {stocks.map((stock) => (
            <CarouselItem key={stock.ticker} className="pl-2 md:pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <Link href={`/stock/${stock.ticker}`}>
                <Card className="bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all cursor-pointer h-full group">
                  <CardContent className="p-4 flex flex-col justify-between h-full gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-yellow-500 transition-colors">{stock.ticker}</h3>
                        <p className="text-xs text-zinc-500 line-clamp-1">{stock.name}</p>
                      </div>
                      <div className={`p-1.5 rounded-full ${stock.change >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                        {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-bold text-zinc-100 flex items-center">{stock.currencySymbol || '₹'}<FlashPrice price={stock.price} /></div>
                        <div className={`text-sm font-medium ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-zinc-700 group-hover:text-yellow-500 transition-colors -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
