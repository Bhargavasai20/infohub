"use client";
import { useState } from "react";

type WeatherData = {
  city: string;
  tempC: number;
  description: string;
  source: string;
};

export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather() {
    if (!city.trim()) {
      setError("Please enter a city");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const js = await res.json();
      if (!res.ok || "error" in js)
        throw new Error(js.error || "Unknown error");
      setData(js);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">🌦 Weather</h2>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City name"
        className="border p-2 rounded"
      />
      <button
        onClick={fetchWeather}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Get Weather
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div className="border p-4 rounded shadow text-center">
          <p className="font-bold">{data.city}</p>
          <p>
            {data.tempC}°C — {data.description}
          </p>
          <p className="text-sm text-gray-500">({data.source})</p>
        </div>
      )}
    </main>
  );
}
