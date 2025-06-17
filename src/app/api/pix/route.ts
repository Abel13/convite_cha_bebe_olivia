// app/api/pix/route.ts
import { NextResponse } from "next/server";
import { QrCodePix } from "qrcode-pix";
import QRCode from "qrcode";

// var. de ambiente — NUNCA no client
const PIX_KEY = process.env.PIX_KEY!; // ex.: chave aleatória
const MERCHANT = process.env.PIX_MERCHANT!; // ex.: "Olívia Baby"
const CITY = process.env.PIX_CITY!; // ex.: "LONDRINA"

export async function POST(req: Request) {
  const { amount } = await req.json(); // valor decimal  -> 145.5

  // 1) cria a BR Code payload ‘copia-e-cola’
  const qrCodePix = QrCodePix({
    version: "01",
    key: PIX_KEY,
    name: MERCHANT,
    city: CITY,
    value: amount, // <= valor final
  });

  const payload = qrCodePix.payload(); // string ~ 200 chars

  // 2) converte para SVG embutido em Data-URL
  const svg = await QRCode.toString(payload, { type: "svg" });
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString(
    "base64"
  )}`;

  return NextResponse.json({ payload, qr: dataUrl });
}
