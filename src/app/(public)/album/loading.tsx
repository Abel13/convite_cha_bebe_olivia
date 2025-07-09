import Image from "next/image";

export default function Loading() {
  return (
    <div className="relative max-w-fit mx-auto p-5 bg-[var(--color-background)] text-[color:var(--foreground)] text-center font-[var(--font-sans)] min-h-screen overflow-hidden">
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
          Carregando...
        </h1>
      </header>
    </div>
  );
}
