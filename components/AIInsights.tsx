"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function AIInsights({ ticker, stockName }: { ticker: string; stockName: string }) {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch AI insights.");
      }

      const data = await res.json();
      setInsights(data.analysis);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                    shadow-[0_0_30px_rgba(0,195,255,0.05)] relative overflow-hidden group">
      {/* Decorative Background Blur */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">AI Flash Insights</h2>
          </div>

          <button
            onClick={fetchInsights}
            disabled={loading}
            className={`
              relative overflow-hidden px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300
              ${loading 
                ? "bg-white/10 text-gray-400 cursor-not-allowed" 
                : "bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing {ticker}...
              </span>
            ) : insights ? "Re-Analyze" : "Generate Analysis"}
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {insights && (
          <div className="prose prose-invert max-w-none text-gray-300">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
        )}

        {!insights && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">
              Click Generate to receive a real-time, comprehensive analysis of {stockName}'s financial position powered by Google Gemini 2.5.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
