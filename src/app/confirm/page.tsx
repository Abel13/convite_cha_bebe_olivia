import { ConfirmForm } from "@/components/confirm/ConfirmForm";
import { WEDDING_CONFIG } from "@/config/wedding";

export const metadata = {
  title: `Confirmar Presença - ${WEDDING_CONFIG.couple.fullNames} 💍`,
  description: `Confirme sua presença no casamento de ${WEDDING_CONFIG.couple.fullNames} no dia ${WEDDING_CONFIG.date.full}.`,
};

export default function ConfirmPage() {
  return (
    <main className="relative max-w-md mx-auto min-h-screen bg-[var(--background)]">
      {/* Header decorativo */}
      <div className="bg-[var(--color-info-bg)] pb-8 pt-12 px-6 rounded-b-[3rem]">
        <div className="text-center">
          <p
            className="text-3xl text-[var(--color-subtitle)] mb-2"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            {WEDDING_CONFIG.couple.fullNames}
          </p>
          <h1
            className="text-2xl text-[var(--color-title)] font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Confirmação de Presença
          </h1>
          <p className="text-sm text-[var(--color-accent)] mt-2">
            {WEDDING_CONFIG.date.full} às {WEDDING_CONFIG.ceremony.time}h
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl p-6 elegant-border">
          <p className="text-sm text-[var(--color-accent)] text-center mb-6">
            Por favor, confirme sua presença até <span className="font-semibold">15 de outubro de 2026</span>
          </p>
          <ConfirmForm />
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[var(--color-footer)]">
            Dúvidas? Entre em contato pelo WhatsApp
          </p>
          <a
            href={`https://wa.me/${WEDDING_CONFIG.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-[var(--color-subtitle)] text-sm font-medium hover:underline"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            Falar com os noivos
          </a>
        </div>
      </div>
    </main>
  );
}
