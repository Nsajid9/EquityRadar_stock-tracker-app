// lib/api/stockService.ts
import { MOCK_STOCKS, MOCK_MARKET_SUMMARY, StockQuote, ChartDataPoint, NewsArticle } from '../mockData';

export const StockService = {
  async getMarketSummary(): Promise<typeof MOCK_MARKET_SUMMARY> {
    try {
      const response = await fetch('/api/stock/indices', {
        next: { revalidate: 60 } 
      });
      if (!response.ok) throw new Error('Indices API failed');
      return await response.json();
    } catch (e) {
      console.error(e);
      return MOCK_MARKET_SUMMARY;
    }
  },

  async getTopMovers(): Promise<StockQuote[]> {
    try {
      const response = await fetch('/api/stock/trending', {
        next: { revalidate: 60 } // cache for 60s
      });
      if (!response.ok) throw new Error('Trending API failed');
      return await response.json();
    } catch (e) {
      console.error(e);
      // Fallback
      return Object.values(MOCK_STOCKS).slice(0, 5);
    }
  },

  async getStockQuote(ticker: string): Promise<StockQuote | null> {
    try {
      const response = await fetch(`/api/stock/quote/${ticker}`, {
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
      const response = await fetch(`/api/stock/chart/${ticker}?timeframe=${timeframe}`, {
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
      const response = await fetch(`/api/stock/search/${encodeURIComponent(query)}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async getStockNews(ticker: string): Promise<NewsArticle[]> {
    try {
      const response = await fetch(`/api/stock/news/${ticker}`, {
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
