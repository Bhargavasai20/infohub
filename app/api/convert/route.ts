import { NextResponse } from "next/server";

type ConvertResponse = {
  from: string;
  to: string;
  amount: number;
  result: number;
  source: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = (searchParams.get("from") || "INR").toUpperCase();
    const to = (searchParams.get("to") || "USD").toUpperCase();
    const amountRaw = searchParams.get("amount") || "0";
    const amount = Number(amountRaw);

    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid or missing amount" },
        { status: 400 }
      );
    }

    const apiUrl = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}&amount=${encodeURIComponent(amount)}`;

    const res = await fetch(apiUrl);
    if (!res.ok) {
      const fallback = Number((amount * 0.012).toFixed(4));
      const fallbackBody: ConvertResponse = {
        from,
        to,
        amount,
        result: fallback,
        source: "mock-fallback",
      };
      return NextResponse.json(fallbackBody);
    }

    const js = await res.json();
    if (js?.result == null) {
      const fallback = Number((amount * 0.012).toFixed(4));
      const fallbackBody: ConvertResponse = {
        from,
        to,
        amount,
        result: fallback,
        source: "mock-fallback",
      };
      return NextResponse.json(fallbackBody);
    }

    const body: ConvertResponse = {
      from,
      to,
      amount,
      result: js.result,
      source: "exchangerate.host",
    };
    return NextResponse.json(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
