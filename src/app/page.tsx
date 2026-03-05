"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import { WEDDING_CONFIG } from "@/config/wedding";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const weddingDate = new Date(WEDDING_CONFIG.date.iso);
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl p-3 min-w-[70px] shadow-sm">
      <span className="text-2xl sm:text-3xl font-semibold text-[var(--color-title)] font-[var(--font-playfair)]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-[var(--color-accent)] uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <main className="relative max-w-md mx-auto bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)] min-h-screen overflow-hidden">
      {/* Hero Section com parallax */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Elementos decorativos parallax */}
        <Parallax speed={-20} className="absolute top-10 left-4 -z-10 opacity-60">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-subtitle)]/20 to-transparent blur-xl" />
        </Parallax>

        <Parallax speed={-15} className="absolute top-32 right-6 -z-10 opacity-50">
          <div className="w-32 h-32 rounded-full bg-gradient-to-bl from-[var(--color-accent)]/15 to-transparent blur-2xl" />
        </Parallax>

        <Parallax speed={-10} className="absolute bottom-40 left-8 -z-10 opacity-40">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-[var(--color-subtitle)]/10 to-transparent blur-3xl" />
        </Parallax>

        {/* Data no topo */}
        <div className="absolute top-8 text-center fade-in">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-accent)] font-light">
            Save the Date
          </p>
          <p className="text-lg text-[var(--color-subtitle)] font-medium mt-1">
            {WEDDING_CONFIG.date.short}
          </p>
        </div>

        {/* Foto do casal (placeholder) */}
        <Parallax speed={-5} className="mb-8 fade-in">
          <div className="relative">
            <div className="w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 elegant-border">
              {/* Substitua esta div por uma Image real quando tiver a foto */}
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-info-bg)] to-[var(--color-border)] flex items-center justify-center">
                <div className="text-center p-6">
                  <span className="material-symbols-outlined text-6xl text-[var(--color-subtitle)]">
                    favorite
                  </span>
                  <p className="text-sm text-[var(--color-accent)] mt-4 font-light">
                    Foto do casal
                  </p>
                </div>
              </div>
            </div>
            {/* Elemento decorativo */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-[var(--color-subtitle)]/30 rounded-full -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-[var(--color-accent)]/20 rounded-full -z-10" />
          </div>
        </Parallax>

        {/* Nomes */}
        <div className="text-center mb-8 fade-in" style={{ animationDelay: "0.2s" }}>
          <h2
            className="text-3xl sm:text-4xl text-[var(--color-subtitle)] mb-2"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {WEDDING_CONFIG.couple.groom}
          </h2>
          <span className="text-2xl text-[var(--color-accent)] font-light">&</span>
          <h1
            className="text-4xl sm:text-5xl text-[var(--color-title)] mt-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {WEDDING_CONFIG.couple.bride}
          </h1>
        </div>

        {/* Frase romântica */}
        <p
          className="text-center text-[var(--color-accent)] italic text-lg mb-10 max-w-xs fade-in"
          style={{ fontFamily: "var(--font-cormorant)", animationDelay: "0.4s" }}
        >
          &ldquo;O amor é paciente, o amor é bondoso...&rdquo;<br />
          <span className="text-sm">1 Coríntios 13:4-8</span>
        </p>

        {/* Contagem regressiva */}
        {mounted && (
          <div className="mb-10 fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] mb-4">
              Faltam apenas
            </p>
            <div className="flex gap-3 count-pulse">
              <CountdownBox value={timeLeft.days} label="dias" />
              <CountdownBox value={timeLeft.hours} label="hrs" />
              <CountdownBox value={timeLeft.minutes} label="min" />
              <CountdownBox value={timeLeft.seconds} label="seg" />
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="w-full max-w-xs space-y-3 fade-in" style={{ animationDelay: "0.8s" }}>
          <Link
            href="/confirm"
            className="flex items-center justify-center gap-2 bg-[var(--color-button-bg)] text-white rounded-full px-8 py-4 font-medium text-center transition-all hover:bg-[var(--color-button-hover)] hover:shadow-lg hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined text-xl">check_circle</span>
            Confirmar Presença
          </Link>

          <Link
            href="/gifts"
            className="flex items-center justify-center gap-2 bg-white text-[var(--color-title)] border-2 border-[var(--color-subtitle)] rounded-full px-8 py-4 font-medium text-center transition-all hover:bg-[var(--color-info-bg)] hover:shadow-md"
          >
            <span className="material-symbols-outlined text-xl">redeem</span>
            Lista de Presentes
          </Link>

          <Link
            href="/album"
            className="flex items-center justify-center gap-2 bg-transparent text-[var(--color-accent)] rounded-full px-8 py-4 font-medium text-center transition-all hover:text-[var(--color-title)]"
          >
            <span className="material-symbols-outlined text-xl">photo_library</span>
            Álbum de Fotos
          </Link>
        </div>
      </section>

      {/* Seção de Informações */}
      <section className="px-6 py-12 bg-[var(--color-info-bg)]">
        <div className="max-w-xs mx-auto space-y-6">
          {/* Local */}
          <div className="bg-white rounded-2xl p-6 elegant-border fade-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[var(--color-subtitle)]">location_on</span>
              <h3 className="text-lg font-semibold text-[var(--color-title)]">Cerimônia</h3>
            </div>
            <div className="space-y-2 text-sm text-[var(--foreground)]">
              <p className="font-medium">{WEDDING_CONFIG.location.name}</p>
              <p>{WEDDING_CONFIG.location.address}</p>
              <p>{WEDDING_CONFIG.location.city} - {WEDDING_CONFIG.location.state}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--color-border)]">
                <span className="material-symbols-outlined text-lg">schedule</span>
                <span>{WEDDING_CONFIG.ceremony.time}h</span>
              </div>
            </div>
            <a
              href={WEDDING_CONFIG.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 text-[var(--color-subtitle)] text-sm font-medium hover:underline"
            >
              <span className="material-symbols-outlined text-base">map</span>
              Ver no mapa
            </a>
          </div>

          {/* Dress Code */}
          <div className="bg-white rounded-2xl p-6 elegant-border fade-in">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[var(--color-subtitle)]">apparel</span>
              <h3 className="text-lg font-semibold text-[var(--color-title)]">Dress Code</h3>
            </div>
            <div className="space-y-2 text-sm text-[var(--foreground)]">
              <p><span className="font-medium">Estilo:</span> {WEDDING_CONFIG.dressCode.style}</p>
              <p><span className="font-medium">Cores:</span> {WEDDING_CONFIG.dressCode.colors}</p>
              <p className="text-xs text-[var(--color-accent)] italic mt-2">
                * {WEDDING_CONFIG.dressCode.notes}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-2xl text-[var(--color-subtitle)] mb-2" style={{ fontFamily: "var(--font-great-vibes)" }}>
          Alexandre & Lígia
        </p>
        <p className="text-xs text-[var(--color-footer)]">
          11 de novembro de 2026
        </p>
      </footer>
    </main>
  );
}
