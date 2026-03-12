# 🚀 Signalist - Real-Time Stock Market Tracker

Signalist is a premium, real-time stock market tracking application built with **Next.js 15**, **Tailwind CSS**, and **Yahoo Finance**. It provides users with live market insights, interactive technical charts, and intelligent search capabilities.

![Signalist Dashboard Mockup](public/dashboard_mockup.png) <!-- Note: User can replace this with a real screenshot -->

## ✨ Features

- **📊 Real-Time Market Data**: Live quotes, price changes, and trending stocks fetched directly from Yahoo Finance.
- **📈 Interactive Technical Charts**: High-performance charts using **Recharts** with toggleable Simple Moving Average (SMA) overlays.
- **🔍 Intelligent Search**: Search by company name (e.g., "Apple" or "Deepak Nitrite") and automatically resolve to the correct market ticker (e.g., `AAPL` or `DEEPAKNTR.BO`).
- **💱 Multi-Currency Support**: Automatically detects and displays local currency symbols (e.g. `$` for US stocks, `₹` for Indian stocks).
- **📱 Premium Dark UI**: A sleek, modern dashboard featuring glassmorphic effects, micro-animations, and a responsive layout.
- **💫 Top Movers Carousel**: Dynamic, auto-scrolling display of the day's most active stocks.
- **📰 Real-Time News**: Company-specific financial news feeds integrated directly into stock detail pages.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animations**: [Embla Carousel](https://www.embla-carousel.com/)
- **Data Source**: [Yahoo Finance (via yahoo-finance2)](https://github.com/gadicc/node-yahoo-finance2)

## 🏗️ Coming Soon (Pro Features)

- **👤 User Authentication**: Secure login and profiles using **Better Auth**.
- **💾 Persistent Watchlist**: Sync your favorite stocks across devices with **PostgreSQL** & **Prisma**.
- **🤖 AI Insights**: Automated stock analysis and daily market summaries powered by **Google Gemini AI**.
- **📩 Smart Alerts**: Personalized price notifications and background updates via **Inngest**.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/signalist.git
   cd signalist
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard in action!

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Your Name/Github Handle]
