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
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 189.32,
    change: 2.15,
    changePercent: 1.15,
    marketCap: "2.9T",
    peRatio: 28.5,
    high52Week: 199.62,
    low52Week: 165.67,
    volume: "52.3M",
    currencySymbol: '$'
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    price: 405.12,
    change: -1.05,
    changePercent: -0.26,
    marketCap: "3.0T",
    peRatio: 35.8,
    high52Week: 420.82,
    low52Week: 311.55,
    volume: "24.1M",
    currencySymbol: '$'
  },
  GOOGL: {
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.65,
    change: 1.85,
    changePercent: 1.31,
    marketCap: "1.8T",
    peRatio: 24.1,
    high52Week: 153.78,
    low52Week: 102.63,
    volume: "31.2M",
    currencySymbol: '$'
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla, Inc.",
    price: 195.43,
    change: -4.21,
    changePercent: -2.11,
    marketCap: "620B",
    peRatio: 45.2,
    high52Week: 299.29,
    low52Week: 152.37,
    volume: "105.4M",
    currencySymbol: '$'
  },
  AMZN: {
    ticker: "AMZN",
    name: "Amazon.com, Inc.",
    price: 174.45,
    change: 0.95,
    changePercent: 0.55,
    marketCap: "1.8T",
    peRatio: 60.4,
    high52Week: 176.82,
    low52Week: 95.5,
    volume: "45.1M",
    currencySymbol: '$'
  },
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    price: 785.38,
    change: 12.45,
    changePercent: 1.61,
    marketCap: "1.9T",
    peRatio: 65.2,
    high52Week: 823.94,
    low52Week: 222.97,
    volume: "68.5M",
    currencySymbol: '$'
  },
  META: {
    ticker: "META",
    name: "Meta Platforms, Inc.",
    price: 484.03,
    change: -5.12,
    changePercent: -1.05,
    marketCap: "1.2T",
    peRatio: 32.1,
    high52Week: 488.62,
    low52Week: 167.66,
    volume: "18.2M",
    currencySymbol: '$'
  },
  NFLX: {
    ticker: "NFLX",
    name: "Netflix, Inc.",
    price: 587.65,
    change: 8.90,
    changePercent: 1.54,
    marketCap: "255B",
    peRatio: 48.7,
    high52Week: 605.50,
    low52Week: 285.33,
    volume: "5.4M",
    currencySymbol: '$'
  },
  AMD: {
    ticker: "AMD",
    name: "Advanced Micro Devices, Inc.",
    price: 176.52,
    change: 4.15,
    changePercent: 2.41,
    marketCap: "285B",
    peRatio: 335.2,
    high52Week: 184.92,
    low52Week: 76.50,
    volume: "82.1M",
    currencySymbol: '$'
  }
};

export const MOCK_TOP_MOVERS: StockQuote[] = [
    MOCK_STOCKS["NVDA"],
    MOCK_STOCKS["AMD"],
    MOCK_STOCKS["AAPL"],
    MOCK_STOCKS["GOOGL"],
    MOCK_STOCKS["AMZN"],
    MOCK_STOCKS["NFLX"],
    MOCK_STOCKS["META"],
    MOCK_STOCKS["TSLA"]
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
