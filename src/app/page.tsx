"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Parallax } from "react-scroll-parallax";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        `${window.scrollY}px`
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative max-w-md mx-auto p-5 bg-[var(--color-background)] text-[color:var(--foreground)] text-center font-[var(--font-sans)] min-h-screen overflow-hidden">
      <Parallax
        speed={-20}
        className="absolute -top-20 left-5 -z-10 opacity-80"
      >
        <Image
          src="/nuvem1.png"
          alt="Nuvem 1"
          className="w-auto"
          width={120}
          height={60}
        />
      </Parallax>

      <Parallax
        speed={-25}
        className="absolute -top-40 right-0 -z-60 opacity-80"
      >
        <Image
          className="w-auto"
          src="/nuvem2.png"
          alt="Nuvem 2"
          width={130}
          height={70}
        />
      </Parallax>

      <Parallax
        speed={-10}
        className="absolute top-30 left-1/2 -translate-x-1/2 -z-30"
      >
        <Image
          src="/coelhinho-balao.png"
          alt="Balão"
          className="w-auto"
          width={180}
          height={180}
          priority
        />
      </Parallax>

      {/* Conteúdo principal */}
      <h2
        className="text-2xl text-[var(--color-subtitle)]"
        style={{ fontFamily: "var(--font-subtitle)" }}
      >
        Chá de Bebê
      </h2>
      <h1
        className="text-4xl text-[var(--color-title)]"
        style={{ fontFamily: "var(--font-title)" }}
      >
        Olívia
      </h1>

      <p className="text-lg font-light">Sábado, 05 de julho</p>

      <p className="text-base font-light mt-70">
        Estamos ansiosos para celebrar
        <br />
        nossa menina junto com você!
      </p>

      <div className="bg-[var(--color-info-bg)]  rounded-xl p-4 mt-5 flex flex-col gap-3 text-left text-sm font-extralight shadow-md fade-in">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">home_pin</span>
          Av. Madre Leonia Milito, 1130 - Apt. 804
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">event</span>
          Sábado, 05 de julho
        </div>
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined">schedule</span>
          15:00h
        </div>

        <Link
          href="/confirm"
          className="flex bg-[var(--color-button-bg)] text-white rounded-full px-6 py-4 font-light text-center justify-center"
        >
          Confirmar Presença
        </Link>

        <Link
          href="/album"
          className="flex bg-[var(--color-button-bg)] text-white rounded-full px-6 py-4 font-light text-center justify-center"
        >
          Album de Fotos
        </Link>
      </div>

      <Link
        href="/gifts"
        className="block bg-[var(--color-button-bg)] text-white rounded-full px-6 py-4 mt-6 font-light"
      >
        Lista de Presentes
      </Link>

      {false && (
        <div className="text-[color:var(--color-footer)] text-base mt-8 font-medium">
          Te aguardamos aqui!
        </div>
      )}

      {/* Banner para contratar site personalizado */}
      <div className="bg-[var(--color-highlight)] text-white mt-10 rounded-xl p-6 shadow-lg text-left fade-in">
        <h2 className="text-xl font-semibold mb-2">
          ✨ Quer uma página como esta para seu evento?
        </h2>
        <p className="text-sm mb-4">
          Posso criar um convite digital para o seu chá de bebê, aniversário,
          casamento ou o que você imaginar!
        </p>
        <Link
          href="https://wa.me/5543984933304?text=Oi%2C%20vi%20a%20p%C3%A1gina%20do%20Ch%C3%A1%20da%20Ol%C3%ADvia%20e%20gostaria%20de%20fazer%20um%20site%20igual!"
          target="_blank"
          className="inline-block bg-white text-[var(--color-highlight)] font-medium rounded-full px-5 py-2 text-sm hover:opacity-90 transition-all"
        >
          Fale comigo no WhatsApp 💬
        </Link>
      </div>
    </main>
  );
}
