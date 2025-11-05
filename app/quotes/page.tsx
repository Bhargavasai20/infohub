"use client";
import { useState } from "react";

type Quote = { author: string; text: string; };

export default function QuotesPage() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  async function getQuote() {
    setLoading(true);
    try {
      const res = await fetch("/api/quote");
      const js = await res.json();
      setQuote(js);
    } catch {
      setQuote({ author: "Unknown", text: "Failed to fetch quote." });
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">💬 Motivational Quotes</h2>
      <button onClick={getQuote} className="px-4 py-2 bg-purple-600 text-white rounded">Get Quote</button>
      {loading && <p>Loading...</p>}
      {quote && (
        <div className="border p-4 rounded shadow max-w-md text-center">
          <p className="italic">“{quote.text}”</p>
          <p className="mt-2">— <b>{quote.author}</b></p>
        </div>
      )}
    </main>
  );
}
