"use client";

import Image from "next/image";
import Link from "next/link";
import { convertNumberToPtBrString } from "@/utils/currency";
import { useGiftStore } from "@/store/giftStore";
import { useEffect, useState } from "react";
import { WEDDING_CONFIG } from "@/config/wedding";

// Lista de presentes para casamento - cota lua de mel e itens de casa
const gifts = [
  {
    id: 0,
    name: "Cota Lua de Mel - Valor Livre",
    value: 0,
    image: "/gifts/pix.png",
    description: "Contribua com o valor que desejar para nossa lua de mem",
  },
  {
    id: 1,
    name: "Jantar Romântico",
    value: 150,
    image: "/gifts/dinner.png",
    description: "Um jantar especial na lua de mel",
  },
  {
    id: 2,
    name: "Passeio de Barco",
    value: 300,
    image: "/gifts/boat.png",
    description: "Passeio romântico de barco",
  },
  {
    id: 3,
    name: "Noite em Hotel Luxo",
    value: 500,
    image: "/gifts/hotel.png",
    description: "Uma noite especial em hotel 5 estrelas",
  },
  {
    id: 4,
    name: "Spa para Casal",
    value: 400,
    image: "/gifts/presente.jpeg",
    description: "Dia de relaxamento juntos",
  },
  {
    id: 5,
    name: "Jogo de Panelas",
    value: 350,
    image: "/gifts/presente.jpeg",
    description: "Para nossas refeições juntos",
  },
  {
    id: 6,
    name: "Liquidificador",
    value: 250,
    image: "/gifts/presente.jpeg",
    description: "Para os cafés da manhã",
  },
  {
    id: 7,
    name: "Aspirador de Pó",
    value: 450,
    image: "/gifts/presente.jpeg",
    description: "Para manter nossa casa limpa",
  },
  {
    id: 8,
    name: "Jogo de Toalhas",
    value: 180,
    image: "/gifts/presente.jpeg",
    description: "Toalhas de banho e rosto",
  },
  {
    id: 9,
    name: "Cafeteira",
    value: 280,
    image: "/gifts/presente.jpeg",
    description: "Para os cafezinhos diários",
  },
  {
    id: 10,
    name: "Air Fryer",
    value: 380,
    image: "/gifts/presente.jpeg",
    description: "Para preparar refeições saudáveis",
  },
  {
    id: 11,
    name: "Jogo de Lençóis",
    value: 220,
    image: "/gifts/presente.jpeg",
    description: "Lençóis de algodão egípcio",
  },
];

export default function GiftsPage() {
  const selected = useGiftStore((state) => state.selected);
  const toggle = useGiftStore((state) => state.toggle);

  const selectedGifts = gifts.filter((g) => selected.includes(g));
  const totalValue = selectedGifts.reduce((sum, g) => sum + g.value, 0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (selected.length === 0) return;

    setPulse(true);
    const timeout = setTimeout(() => setPulse(false), 400);

    return () => clearTimeout(timeout);
  }, [selected]);

  return (
    <main className="relative flex flex-col h-screen max-w-md mx-auto bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--color-info-bg)] pb-6 pt-10 px-4 rounded-b-[2rem]">
        <div className="text-center">
          <p
            className="text-2xl text-[var(--color-subtitle)] mb-1"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {WEDDING_CONFIG.couple.fullNames}
          </p>
          <h1
            className="text-xl text-[var(--color-title)] font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Lista de Presentes
          </h1>
        </div>
      </header>

      {/* Mensagem */}
      <div className="px-6 py-4 text-center">
        <p className="text-sm text-[var(--color-accent)] italic">
          &ldquo;Sua presença é o maior presente! Mas se quiser nos presentear,
          ficaremos muito gratos 💕&rdquo;
        </p>
      </div>

      {/* Lista de presentes */}
      <section className="flex-1 overflow-y-auto px-4 pb-40">
        <div className="grid grid-cols-2 gap-4">
          {gifts.map((gift) => {
            const isSelected = selected.includes(gift);
            return (
              <button
                key={gift.id}
                onClick={() => toggle(gift)}
                className={`rounded-2xl p-4 flex flex-col items-center bg-white transition-all duration-300 elegant-border
                  ${
                    isSelected
                      ? "ring-2 ring-[var(--color-subtitle)] bg-[var(--color-info-bg)]"
                      : ""
                  }
                  hover:shadow-lg hover:-translate-y-1`}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-[var(--color-info-bg)]">
                  <Image
                    src={gift.image}
                    alt={gift.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-[var(--color-title)] text-center leading-snug">
                  {gift.name}
                </span>
                {gift.value > 0 ? (
                  <span className="text-xs text-[var(--color-subtitle)] mt-1 font-semibold">
                    {convertNumberToPtBrString({
                      value: gift.value,
                      type: "currency",
                    })}
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-accent)] mt-1">
                    Valor livre
                  </span>
                )}
                <p className="text-[10px] text-[var(--color-footer)] text-center mt-2 line-clamp-2">
                  {gift.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Footer fixo com total */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] px-4 py-4 z-50 ${
          pulse ? "animate-pulse-once" : ""
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-accent)]">
              {selected.length > 0
                ? `${selected.length} presente(s) selecionado(s)`
                : "Selecione um ou mais presentes"}
            </span>

            <span className="text-sm font-semibold text-[var(--color-title)]">
              {`Total: ${
                totalValue === 0 && selected.length > 0
                  ? "Livre"
                  : convertNumberToPtBrString({
                      value: totalValue,
                      type: "currency",
                    })
              }`}
            </span>
          </div>

          <Link
            href={selected.length > 0 ? `/payment` : "#"}
            className={`flex items-center justify-center gap-2 rounded-full px-6 py-4 text-white font-medium transition-all
              ${
                selected.length > 0
                  ? "bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            <span className="material-symbols-outlined text-xl">redeem</span>
            Presentear
          </Link>
        </div>
      </div>
    </main>
  );
}
