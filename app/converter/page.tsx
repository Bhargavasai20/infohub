"use client";
import { useState } from "react";

type ConvertResult = {
  from: string;
  to: string;
  amount: number;
  result: number;
  source: string;
};

export default function ConverterPage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ConvertResult | null>(null);

  async function doConvert(to: "USD" | "EUR") {
    setError("");
    setResult(null);
    const numeric = Number(amount);
    if (!amount || Number.isNaN(numeric) || numeric <= 0) {
      setError("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/convert?from=INR&to=${to}&amount=${encodeURIComponent(
          numeric.toString()
        )}`
      );
      const js = await res.json();
      if (!res.ok || js?.error)
        throw new Error(js?.error || "Conversion failed");
      setResult({
        from: js.from,
        to: js.to,
        amount: js.amount,
        result: js.result,
        source: js.source || "unknown",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">
        💱 Currency Converter (INR → USD/EUR)
      </h2>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in INR"
        inputMode="decimal"
        className="border p-2 rounded w-64"
      />
      <div className="flex gap-3">
        <button
          onClick={() => doConvert("USD")}
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={loading}
        >
          Convert to USD
        </button>
        <button
          onClick={() => doConvert("EUR")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          Convert to EUR
        </button>
      </div>
      {loading && <p>Converting…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {result && (
        <div className="border p-4 rounded shadow text-center mt-2">
          <p>
            {result.amount} {result.from} ={" "}
            <b>
              {Number(result.result).toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })}
            </b>{" "}
            {result.to}
          </p>
          <p className="text-sm text-gray-500">Source: {result.source}</p>
        </div>
      )}
    </main>
  );
}
