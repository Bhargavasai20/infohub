import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();

  
  if (!city) {
    return NextResponse.json(
      { error: "City name is required" },
      { status: 400 }
    );
  }

  // Mock data 
  const mockWeatherData: Record<
    string,
    { tempC: number; description: string }
  > = {
    hyderabad: { tempC: 29, description: "Sunny with mild clouds" },
    delhi: { tempC: 26, description: "Clear sky and breezy" },
    mumbai: { tempC: 32, description: "Humid and warm" },
    chennai: { tempC: 30, description: "Partly cloudy" },
    bangalore: { tempC: 25, description: "Cool and pleasant" },
  };

  // Convert to lowercase for flexible input
  const key = city.toLowerCase();

  const data = mockWeatherData[key] || {
    tempC: 27,
    description: "Moderate weather conditions",
  };

  return NextResponse.json({
    city,
    tempC: data.tempC,
    description: data.description,
    source: "Mock Data (No API)",
  });
}
