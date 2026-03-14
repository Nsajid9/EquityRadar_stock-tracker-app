"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function FlashPrice({ price, className }: { price: number, className?: string }) {
  const prevPriceRef = useRef(price);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (price > prevPriceRef.current) {
      setDirection('up');
      const timer = setTimeout(() => setDirection(null), 600);
      prevPriceRef.current = price;
      return () => clearTimeout(timer);
    } else if (price < prevPriceRef.current) {
      setDirection('down');
      const timer = setTimeout(() => setDirection(null), 600);
      prevPriceRef.current = price;
      return () => clearTimeout(timer);
    }
  }, [price]);

  return (
    <span className={cn(
        "transition-colors duration-300", 
        direction === 'up' && "text-green-400 neon-text-green font-bold", 
        direction === 'down' && "text-red-500 neon-text-red font-bold",
        !direction && "text-zinc-100",
        className
    )}>
      {price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
}
