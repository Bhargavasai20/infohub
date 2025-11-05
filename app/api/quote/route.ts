import { NextResponse } from "next/server";

const quotes = [
  {
    author: "Nelson Mandela",
    text: "It always seems impossible until it’s done.",
  },
  {
    author: "Eleanor Roosevelt",
    text: "No one can make you feel inferior without your consent.",
  },
  {
    author: "Confucius",
    text: "It does not matter how slowly you go as long as you do not stop.",
  },
  {
    author: "Steve Jobs",
    text: "The only way to do great work is to love what you do.",
  },
];

export async function GET() {
  const pick = quotes[Math.floor(Math.random() * quotes.length)];
  return NextResponse.json(pick);
}
