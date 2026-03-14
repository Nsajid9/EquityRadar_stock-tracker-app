// lib/api/stockService.ts
import { StockQuote, ChartDataPoint, NewsArticle } from '../mockData';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser should use relative path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR in Vercel
  return `http://localhost:${process.env.PORT ?? 3000}`; // SSR in dev
};

export const StockService = {
  async getMarketSummary(): Promise<{ name: string; price: number; change: number; changePercent: number; isPositive: boolean; }[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/stock/indices`, {
        next: { revalidate: 60 } 
      });
      if (!response.ok) throw new Error('Indices API failed');
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async getTopMovers(): Promise<StockQuote[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/stock/trending`, {
        next: { revalidate: 60 } // cache for 60s
      });
      if (!response.ok) throw new Error('Trending API failed');
      return await response.json();
    } catch (e) {
      console.error(e);
      // Fallback
      return [];
    }
  },

  async getStockQuote(ticker: string): Promise<StockQuote | null> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/stock/quote/${ticker}`, {
        next: { revalidate: 30 }
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  
  async getStockChart(ticker: string, timeframe: '1D' | '1W' | '1M' | '1Y' = '1D'): Promise<ChartDataPoint[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/stock/chart/${ticker}?timeframe=${timeframe}`, {
        next: { revalidate: 60 }
      });
      if (!response.ok) throw new Error('Chart API failed');
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  
  async searchStocks(query: string): Promise<{ticker: string, name: string}[]> {
    try {
      if (!query) return [];
      const response = await fetch(`${getBaseUrl()}/api/stock/search/${encodeURIComponent(query)}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async getStockNews(ticker: string): Promise<NewsArticle[]> {
    try {
      const response = await fetch(`${getBaseUrl()}/api/stock/news/${ticker}`, {
        next: { revalidate: 300 } // cache news for 5 mins
      });
      if (!response.ok) throw new Error('News API failed');
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  }
};
