"use client";
import Image from "next/image";
import Link from "next/link";
import { convertNumberToPtBrString } from "@/utils/currency";
import { useGiftStore } from "@/store/giftStore";

const gifts = [
  { id: 0, name: "Pix Livre", value: 0, image: "/gifts/pix.png" },
  {
    id: 4,
    name: "Pacote de fralda - 36 unidades",
    value: 40,
    image: "/gifts/fraldas.webp",
  },
  {
    id: 5,
    name: "Pacote de fralda - 80 unidades",
    value: 120,
    image: "/gifts/fraldas80.jpeg",
  },
  {
    id: 6,
    name: "Pacote de fralda - 160 unidades",
    value: 250,
    image: "/gifts/fraldas160.jpeg",
  },
  { id: 7, name: "Kit presente", value: 50, image: "/gifts/presente.jpeg" },
  { id: 8, name: "Manta", value: 60, image: "/gifts/manta.webp" },
  { id: 9, name: "Kit higiene", value: 75, image: "/gifts/higiene.jpeg" },
  { id: 10, name: "Kit body", value: 100, image: "/gifts/body.jpeg" },
  { id: 11, name: "Banheira", value: 220, image: "/gifts/banheira.jpeg" },
  {
    id: 12,
    name: "Cadeira de descanso e balanço",
    value: 300,
    image: "/gifts/cadeira.jpeg",
  },
];

export default function GiftsPage() {
  const selected = useGiftStore((state) => state.selected);
  const toggle = useGiftStore((state) => state.toggle);

  const selectedGifts = gifts.filter((g) => selected.includes(g));
  const totalValue = selectedGifts.reduce((sum, g) => sum + g.value, 0);

  return (
    <main className="relative flex flex-col h-screen max-w-2xl mx-auto bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)] animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-center py-6 px-4 relative">
        <h1
          className="text-2xl sm:text-3xl text-[var(--color-title)] font-[var(--font-title)]"
          style={{ fontFamily: "var(--font-title)" }}
        >
          <Image
            src="/coelhinho-flutuando.png"
            alt="Coelhinho flutuando"
            width={50}
            height={50}
            className="w-auto absolute animate-float -mx-8 -my-3"
          />
          Lista de Presentes
        </h1>
      </header>

      <span className="flex text-center text-sm sm:text-lg py-2">
        Sua presença é o maior presente, mas se quiser, fique à vontade para
        presentear nossa Olívia! 🥰
      </span>
      {/* Scrollable list */}
      <section className="flex-1 overflow-y-auto px-4 pb-4 pt-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {gifts.map((gift) => {
            const isSelected = selected.includes(gift);
            return (
              <button
                key={gift.id}
                onClick={() => {
                  toggle(gift);
                }}
                className={`rounded-xl p-4 flex bg-white flex-col items-center shadow-md transition border border-[var(--color-border)]
                  ${isSelected ? "ring-2 bg-[var(--color-info-bg)]" : "ring-0"}
                  hover:brightness-105`}
              >
                <Image
                  src={gift.image}
                  alt={gift.name}
                  width={100}
                  height={100}
                  className="mb-3 rounded-md object-top-left h-24 w-24 select-none pointer-events-none"
                />
                <span className="text-sm font-medium leading-snug text-center">
                  {gift.name}
                </span>
                {gift.value > 0 && (
                  <span className="text-xs text-[var(--foreground)] mt-1">
                    {convertNumberToPtBrString({ value: gift.value })}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Footer fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-info-bg)] border-t border-[var(--color-border)] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-4 py-3 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-sm">
            {selected.length > 0
              ? `${selected.length} presente(s) selecionado(s) — Total: ${
                  totalValue === 0
                    ? "Valor Livre"
                    : convertNumberToPtBrString({ value: totalValue })
                }`
              : "Selecione um ou mais presentes"}
          </span>

          <Link
            href={selected.length > 0 ? `/payment` : "#"}
            className={`rounded-full px-6 py-2 text-white text-sm font-light transition
              ${
                selected.length > 0
                  ? "bg-[var(--color-button-bg)] hover:brightness-110"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Presentear
          </Link>
        </div>
      </div>
    </main>
  );
}
