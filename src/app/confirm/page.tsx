"use client";
// app/confirm/page.tsx
import { ConfirmForm } from "@/components/confirm/ConfirmForm";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main
      className={`max-w-md mx-auto p-5 bg-[var(--background)] text-[color:var(--foreground)] font-[var(--font-sans)] min-h-screen transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-2xl text-[color:var(--color-title)] font-[var(--font-title)] mb-4">
        Confirmação de Presença
      </h1>
      <ConfirmForm />
    </main>
  );
}
