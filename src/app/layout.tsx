import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Poppins, Playfair_Display } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import "./globals.css";
import { ParallaxWrapper } from "./components/ParallaxWrapper";

// Fontes do sistema (Geist)
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Fontes do Google
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Chá de Bebê da Olívia",
  description: "Convite especial para o chá da nossa pequena Olívia 💖",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${poppins.variable} ${playfair.variable} ${greatVibes.variable} antialiased`}
      >
        <ParallaxWrapper>{children}</ParallaxWrapper>
      </body>
    </html>
  );
}
