// app/confirm/page.tsx
import { ConfirmForm } from "@/components/confirm/ConfirmForm";

export const metadata = {
  title: "Confirmar Presença – Chá da Olívia",
  description:
    "Confirme sua presença e informe quantos adultos e crianças virão.",
};

export default function ConfirmPage() {
  return (
    <main
      className={`mx-auto px-4 sm:px-6 md:px-8 py-8 bg-[var(--background)] text-[color:var(--foreground)] font-[var(--font-sans)] min-h-screen transition-opacity duration-700 max-w-md sm:max-w-lg md:max-w-xl`}
    >
      <h1 className="text-2xl text-[color:var(--color-title)] font-[var(--font-title)] mb-4">
        Confirmação de Presença
      </h1>
      <ConfirmForm />
    </main>
  );
}
