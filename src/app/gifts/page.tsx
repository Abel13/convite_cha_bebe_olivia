"use client";
import { useState } from "react";

const gifts = [
  { id: 0, name: "Pix", price: "Valor livre", image: "/gifts/pix.png" },
  {
    id: 1,
    name: "Macacão de algodão",
    price: "R$ 45,00",
    image: "/gifts/macacao.jpg",
  },
  {
    id: 2,
    name: "Fraldas RN - pacote",
    price: "R$ 50,00",
    image: "/gifts/fraldas.webp",
  },
  { id: 3, name: "Manta", price: "R$ 60,00", image: "/gifts/manta.avif" },
];

export default function GiftsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const handlePresentear = (id: number) => {
    setSelected(id);
  };

  return (
    <main
      className={`max-w-md mx-auto p-5 bg-[var(--background)] text-[color:var(--foreground)] font-[var(--font-sans)] min-h-screen transition-opacity duration-700`}
    >
      <h1 className="text-2xl text-center mb-6 text-[color:var(--color-title)] font-[var(--font-title)]">
        Escolha seu presente para a Olívia
      </h1>

      <ul className="grid grid-cols-2 gap-4">
        {gifts.map((gift) => (
          <li
            key={gift.id}
            className="bg-[var(--color-info-bg)] rounded-xl p-4 flex flex-col items-center text-center"
          >
            {gift.image && (
              <img
                src={gift.image}
                alt={gift.name}
                className="w-30 h-30 object-contain rounded mb-2"
              />
            )}
            <span className="text-sm font-medium mb-1">{gift.name}</span>
            <span className="text-sm font-extralight mb-2">{gift.price}</span>

            <button
              onClick={() => handlePresentear(gift.id)}
              className={`text-sm px-4 py-2 rounded-full transition ${
                selected === gift.id
                  ? "text-green-700"
                  : "bg-[var(--color-button-bg)] text-white"
              }`}
            >
              {selected === gift.id ? "Presenteado 🎁" : "Presentear"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
