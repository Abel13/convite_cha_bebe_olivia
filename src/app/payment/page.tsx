"use client";

import { useGiftStore } from "@/store/giftStore";
import { useState, useMemo } from "react";
import Image from "next/image";
import { convertNumberToPtBrString } from "@/utils/currency";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/atoms/InputField";

type FormValues = { amount: string }; // valor livre (string “1.234,56”)

export default function PaymentPage() {
  const selected = useGiftStore((s) => s.selected);

  const fixedTotal = useMemo(
    () => selected.reduce((sum, g) => sum + g.value, 0),
    [selected]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: { amount: "0.00" },
  });

  const amountRaw = watch("amount") || "";

  const openValue = useMemo(() => {
    const numeric = Number(amountRaw.replace(/\./g, "").replace(",", "."));
    return isNaN(numeric) ? 0 : numeric;
  }, [amountRaw]);

  const totalToShow = fixedTotal + openValue;

  const [qr, setQr] = useState<string | null>(null);
  const [payload, setPayload] = useState<string>("");

  const onSubmit = async ({ amount }: FormValues) => {
    const free = Number(amount.replace(/\./g, "").replace(",", ".") || 0);
    const value = fixedTotal + free;

    const res = await fetch("/api/pix", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: value }),
    });

    const json = await res.json();
    setQr(json.qr);
    setPayload(json.payload);
  };

  const copy = () => {
    navigator.clipboard.writeText(payload);
    toast.success("Código copiado! ✨");
  };

  if (!selected.length) {
    return (
      <main className="p-6 text-center">
        <p>Nenhum presente selecionado 😢</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-6 bg-[var(--background)] text-[var(--foreground)] font-[var(--font-sans)] min-h-screen">
      <h1 className="text-2xl text-center font-[var(--font-title)] text-[var(--color-title)] mb-6">
        Confirmar Presentes
      </h1>

      {/* —— formulário para gerar PIX —— */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {selected.some((g) => g.value === 0) && (
          <InputField
            label="Defina o valor livre"
            error={errors.amount}
            prefix="R$"
            type="currency"
            control={control}
            name="amount"
          />
        )}

        <div className="text-center mb-2 text-lg">
          Total:{" "}
          <strong>
            {totalToShow > 0
              ? convertNumberToPtBrString({ value: totalToShow })
              : "Valor livre"}
          </strong>
        </div>

        {qr ? (
          <>
            <img
              src={qr}
              alt="QR Code Pix"
              className="w-44 h-44 mx-auto rounded-2xl"
            />
            <span className="flex overflow-clip text-xs border rounded">
              {payload}
            </span>
            <button
              type="button"
              onClick={copy}
              className="w-full bg-[var(--color-button-bg)] text-white rounded-full py-3 text-sm"
            >
              Pix copia e cola
            </button>
          </>
        ) : (
          <button
            type="submit"
            className={`w-full rounded-full py-3 text-sm text-white ${
              totalToShow > 0
                ? "bg-[var(--color-button-bg)] hover:brightness-110"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={totalToShow === 0}
          >
            Gerar Pix
          </button>
        )}
      </form>

      <ul className="space-y-3 mb-6 mt-3">
        <span>Itens:</span>
        {selected.map((gift) => (
          <li
            key={gift.id}
            className="flex items-center gap-3 bg-[var(--color-info-bg)] p-3 rounded-md shadow-sm"
          >
            <Image
              src={gift.image}
              alt={gift.name}
              width={60}
              height={60}
              className="rounded-md w-15 h-15 object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">{gift.name}</p>
              {gift.value > 0 ? (
                <p className="text-sm">
                  {convertNumberToPtBrString({
                    value: gift.value,
                    type: "currency",
                  })}
                </p>
              ) : (
                <p className="text-sm italic text-[var(--color-footer)]">
                  {openValue
                    ? convertNumberToPtBrString({
                        value: openValue,
                        type: "currency",
                      })
                    : "Valor livre"}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
