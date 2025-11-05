import { NextResponse } from "next/server";

type WeatherResponse = {
  city: string;
  tempC: number;
  description: string;
  source: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim() || "Hyderabad";
  const apiKey = process.env.OPENWEATHER_KEY;

  try {
    if (apiKey) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`;
      const res = await fetch(apiUrl);
      const js = await res.json();
      if (!res.ok) {
        const msg = (js && js.message) || `Weather fetch failed for "${city}".`;
        return NextResponse.json({ error: msg }, { status: res.status });
      }
      const data: WeatherResponse = {
        city: js.name,
        tempC: js.main.temp,
        description: js.weather?.[0]?.description ?? "N/A",
        source: "openweather",
      };
      return NextResponse.json(data);
    }

    // fallback mock if no key
    const mockData: WeatherResponse = {
      city,
      tempC: 26.5,
      description: "clear sky (mock)",
      source: "mock",
    };
    return NextResponse.json(mockData);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
