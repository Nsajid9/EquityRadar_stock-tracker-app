"use client";

import { StockQuote } from "@/lib/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface StockListProps {
  stocks: StockQuote[];
  onRemove?: (ticker: string) => void;
}

export default function StockList({ stocks, onRemove }: StockListProps) {
  const router = useRouter();

  if (!stocks || stocks.length === 0) {
    return (
      <div className="py-8 text-center text-zinc-500">
        No stocks found.
      </div>
    );
  }

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-900/50">
          <TableRow className="border-zinc-800 hover:bg-transparent">
            <TableHead className="w-[100px] text-zinc-400">Ticker</TableHead>
            <TableHead className="text-zinc-400">Name</TableHead>
            <TableHead className="text-right text-zinc-400">Price</TableHead>
            <TableHead className="text-right text-zinc-400">Change</TableHead>
            {onRemove && <TableHead className="text-right text-zinc-400">Action</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow 
              key={stock.ticker} 
              className="cursor-pointer border-zinc-800 hover:bg-zinc-900/50 transition-colors"
              onClick={() => router.push(`/stock/${stock.ticker}`)}
            >
              <TableCell className="font-medium text-zinc-100">{stock.ticker}</TableCell>
              <TableCell className="text-zinc-400">{stock.name}</TableCell>
              <TableCell className="text-right font-medium text-zinc-100">
                ${stock.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <span className={`px-2 py-1 rounded-md text-sm font-medium ${
                  stock.change >= 0 
                  ? "bg-green-500/10 text-green-500" 
                  : "bg-red-500/10 text-red-500"
                }`}>
                  {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </TableCell>
              {onRemove && (
                <TableCell className="text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(stock.ticker);
                    }}
                    className="text-zinc-500 hover:text-red-500 transition-colors px-2 py-1"
                  >
                    Remove
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
