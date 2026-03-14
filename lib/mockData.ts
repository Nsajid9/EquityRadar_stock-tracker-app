// lib/mockData.ts

export interface StockQuote {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  high52Week: number;
  low52Week: number;
  volume: string;
  currencySymbol?: string;
}

export interface ChartDataPoint {
  time: string;
  price: number;
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  timeAgo: string;
  url: string;
}

export const MOCK_STOCKS: Record<string, StockQuote> = {
  "RELIANCE.NS": {
    ticker: "RELIANCE.NS",
    name: "Reliance Industries",
    price: 2950.45,
    change: 15.20,
    changePercent: 0.52,
    marketCap: "19.8T",
    peRatio: 28.5,
    high52Week: 3020.00,
    low52Week: 2220.30,
    volume: "8.2M",
    currencySymbol: '₹'
  },
  "TCS.NS": {
    ticker: "TCS.NS",
    name: "Tata Consultancy Services",
    price: 4120.15,
    change: -12.50,
    changePercent: -0.30,
    marketCap: "14.9T",
    peRatio: 32.1,
    high52Week: 4254.75,
    low52Week: 3115.00,
    volume: "2.1M",
    currencySymbol: '₹'
  },
  "HDFCBANK.NS": {
    ticker: "HDFCBANK.NS",
    name: "HDFC Bank Limited",
    price: 1445.60,
    change: 8.90,
    changePercent: 0.62,
    marketCap: "11.0T",
    peRatio: 16.4,
    high52Week: 1757.50,
    low52Week: 1363.55,
    volume: "18.5M",
    currencySymbol: '₹'
  },
  "INFY.NS": {
    ticker: "INFY.NS",
    name: "Infosys Limited",
    price: 1630.90,
    change: -5.40,
    changePercent: -0.33,
    marketCap: "6.8T",
    peRatio: 26.2,
    high52Week: 1733.00,
    low52Week: 1215.45,
    volume: "6.4M",
    currencySymbol: '₹'
  },
  "ICICIBANK.NS": {
    ticker: "ICICIBANK.NS",
    name: "ICICI Bank Limited",
    price: 1085.35,
    change: 12.45,
    changePercent: 1.16,
    marketCap: "7.6T",
    peRatio: 18.5,
    high52Week: 1113.85,
    low52Week: 899.00,
    volume: "12.8M",
    currencySymbol: '₹'
  },
  "SBIN.NS": {
    ticker: "SBIN.NS",
    name: "State Bank of India",
    price: 765.20,
    change: 4.15,
    changePercent: 0.55,
    marketCap: "6.8T",
    peRatio: 9.2,
    high52Week: 793.40,
    low52Week: 501.55,
    volume: "22.5M",
    currencySymbol: '₹'
  },
  "BHARTIARTL.NS": {
    ticker: "BHARTIARTL.NS",
    name: "Bharti Airtel Limited",
    price: 1215.45,
    change: 18.70,
    changePercent: 1.56,
    marketCap: "6.9T",
    peRatio: 52.4,
    high52Week: 1238.00,
    low52Week: 735.80,
    volume: "4.8M",
    currencySymbol: '₹'
  },
  "ITC.NS": {
    ticker: "ITC.NS",
    name: "ITC Limited",
    price: 412.30,
    change: -2.15,
    changePercent: -0.52,
    marketCap: "5.1T",
    peRatio: 25.1,
    high52Week: 499.70,
    low52Week: 399.30,
    volume: "15.4M",
    currencySymbol: '₹'
  }
};

export const MOCK_TOP_MOVERS: StockQuote[] = [
    MOCK_STOCKS["RELIANCE.NS"],
    MOCK_STOCKS["TCS.NS"],
    MOCK_STOCKS["HDFCBANK.NS"],
    MOCK_STOCKS["INFY.NS"],
    MOCK_STOCKS["ICICIBANK.NS"],
    MOCK_STOCKS["SBIN.NS"],
    MOCK_STOCKS["BHARTIARTL.NS"],
    MOCK_STOCKS["ITC.NS"]
];

export const generateMockNews = (ticker: string) => {
  return [
    {
      id: `${ticker}-news-1`,
      headline: `${ticker} Announces Breakthrough in Core Technology Segment`,
      summary: `In a surprise announcement today, executives at ${ticker} revealed a major advancement that could disrupt the industry over the next decade. Analysts are already upgrading their price targets.`,
      source: "Financial Times",
      timeAgo: "2 hours ago",
      url: "#"
    },
    {
      id: `${ticker}-news-2`,
      headline: `Wall Street Reacts to ${ticker}'s Latest Earnings Report`,
      summary: `Following a volatile trading session, ${ticker} managed to beat earnings estimates by a slim margin, citing strong international growth despite domestic headwinds.`,
      source: "Bloomberg",
      timeAgo: "5 hours ago",
      url: "#"
    },
    {
      id: `${ticker}-news-3`,
      headline: `Why ${ticker} Is Seeing Unusual Options Activity Today`,
      summary: `Traders are betting heavily on a short-term movement for ${ticker} ahead of a major industry conference next week. Implied volatility has spiked to a 3-month high.`,
      source: "Reuters",
      timeAgo: "1 day ago",
      url: "#"
    },
    {
      id: `${ticker}-news-4`,
      headline: `${ticker} Expands Operations into Emerging Markets`,
      summary: `Looking for new avenues of growth, ${ticker} has officially broken ground on its new international headquarters, signaling a strategic shift away from saturated domestic sectors.`,
      source: "CNBC",
      timeAgo: "2 days ago",
      url: "#"
    }
  ];
};

export const MOCK_MARKET_SUMMARY = [
  { name: "S&P 500", price: 5088.8, change: 17.5, changePercent: 0.35, isPositive: true },
  { name: "Dow Jones", price: 39131.53, change: 62.1, changePercent: 0.16, isPositive: true },
  { name: "Nasdaq", price: 15996.82, change: -44.8, changePercent: -0.28, isPositive: false },
  { name: "Russell 2000", price: 2016.69, change: 2.7, changePercent: 0.13, isPositive: true },
];

export const generateMockChartData = (basePrice: number, points: number = 30): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let currentPrice = basePrice;
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000); // minus minutes
    // Random walk
    const change = (Math.random() - 0.45) * (basePrice * 0.005);
    currentPrice += change;
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Number(currentPrice.toFixed(2))
    });
  }
  return data;
};
