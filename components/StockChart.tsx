"use client";

import { useState, useEffect, useMemo } from 'react';
import { Area, AreaChart, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StockService } from "@/lib/api/stockService";
import { ChartDataPoint } from "@/lib/mockData";
import { Skeleton } from "@/components/ui/skeleton";

interface StockChartProps {
  ticker: string;
  currencySymbol?: string;
}

export default function StockChart({ ticker, currencySymbol = '₹' }: StockChartProps) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [showSma, setShowSma] = useState(false);

  useEffect(() => {
    const fetchChartUrl = async () => {
      setLoading(true);
      const chartData = await StockService.getStockChart(ticker, timeframe);
      setData(chartData);
      setLoading(false);
    };
    fetchChartUrl();
  }, [ticker, timeframe]);

  if (loading) {
    return <Skeleton className="w-full h-[300px] rounded-xl" />;
  }

  // Calculate Simple Moving Average (using a period of e.g. 5 points for smoothing)
  const chartDataWithSma = useMemo(() => {
    if (data.length === 0) return [];
    const period = 5;
    return data.map((point, index, arr) => {
      let sma = null;
      if (index >= period - 1) {
        const slice = arr.slice(index - period + 1, index + 1);
        const sum = slice.reduce((acc, curr) => acc + curr.price, 0);
        sma = Number((sum / period).toFixed(2));
      } else {
        sma = point.price; // Fill start points
      }
      return { ...point, sma };
    });
  }, [data]);

  const isPositive = data.length > 0 && data[data.length - 1].price >= data[0].price;
  const strokeColor = isPositive ? "#22c55e" : "#ef4444";
  const fillColor = isPositive ? "url(#colorPositive)" : "url(#colorNegative)";

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === tf
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setShowSma(!showSma)}
          className={`px-3 py-1 border border-zinc-700 rounded-md text-sm font-medium transition-colors ${
            showSma ? 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          SMA Overlay
        </button>
      </div>
      
      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartDataWithSma}>
            <defs>
              <filter id="neonGlowPositive" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.6"/>
              </filter>
              <filter id="neonGlowNegative" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.6"/>
              </filter>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              domain={['auto', 'auto']} 
              hide 
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const pricePayload = payload.find(p => p.dataKey === 'price');
                  const smaPayload = payload.find(p => p.dataKey === 'sma');
                  
                  return (
                    <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl outline outline-1 outline-white/5">
                      <p className="text-zinc-400 text-xs mb-1 font-medium">{payload[0].payload.time}</p>
                      <div className="flex flex-col gap-1">
                          <p className="text-zinc-100 font-semibold text-lg flex items-center justify-between gap-4">
                            <span>Price:</span>
                            <span>{currencySymbol}{pricePayload?.value}</span>
                          </p>
                          {showSma && smaPayload && (
                            <p className="text-yellow-500 font-medium text-sm flex items-center justify-between gap-4">
                              <span>SMA:</span>
                              <span>{currencySymbol}{smaPayload.value}</span>
                            </p>
                          )}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              fillOpacity={1}
              fill={fillColor}
              strokeWidth={3}
              filter={isPositive ? "url(#neonGlowPositive)" : "url(#neonGlowNegative)"}
            />
            {showSma && (
              <Line 
                type="monotone" 
                dataKey="sma" 
                stroke="#eab308" 
                strokeWidth={1.5} 
                dot={false}
                strokeDasharray="4 4"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
