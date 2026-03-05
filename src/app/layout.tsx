import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Poppins, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Great_Vibes } from "next/font/google";
import "./globals.css";
import { ParallaxWrapper } from "../components/ParallaxWrapper";
import { PageTransition } from "../components/PageTransition";
import { Toaster } from "react-hot-toast";

// Fontes do sistema (Geist)
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// Fontes do Google
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Alexandre & Lígia - 11.11.2026 💍",
  description: "Você é nosso convidado especial! Venha celebrar conosco o dia mais importante das nossas vidas. 💕",
  openGraph: {
    title: "Alexandre & Lígia - Save the Date",
    description: "11 de novembro de 2026 - Você é nosso convidado especial!",
    type: "website",
  },
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
        className={`${geistSans.variable} ${poppins.variable} ${playfair.variable} ${cormorant.variable} ${greatVibes.variable} antialiased`}
      >
        <Toaster position="top-center" />
        <ParallaxWrapper>
          <PageTransition>{children}</PageTransition>
        </ParallaxWrapper>
      </body>
    </html>
  );
}
