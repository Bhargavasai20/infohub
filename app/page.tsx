"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-4xl font-bold">🌐 InfoHub</h1>
      <p className="text-gray-600">Weather • Currency • Quotes</p>
      <div className="flex gap-4">
        <Link
          href="/weather"
          className="px-4 py-2 bg-sky-600 text-white rounded"
        >
          ☀️ Weather
        </Link>
        <Link
          href="/converter"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          💱 Converter
        </Link>
        <Link
          href="/quotes"
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          💬 Quotes
        </Link>
      </div>
    </main>
  );
}
