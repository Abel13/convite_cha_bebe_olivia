"use client";
import { useState } from "react";
import { Button } from "../atoms/Button";
import { useGuestStore } from "@/store/guestStore";
import { useRouter, useSearchParams } from "next/navigation";

export const ModalCode = () => {
  const { setGuest } = useGuestStore((store) => store);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const validateCode = async (codeToValidate: string) => {
    setError("");
    setLoading(true);
    const res = await fetch("/api/validate-code", {
      method: "POST",
      body: JSON.stringify({ code: codeToValidate }),
    });

    if (!res.ok) {
      setError("Código inválido. Tente novamente.");
      setLoading(false);
      return;
    }

    const { guestId } = await res.json();
    setGuest({
      code: codeToValidate,
      guestId,
    });
    setVisible(false);
    setLoading(false);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("code", codeToValidate);
    router.replace(`?${current.toString()}`);
  };

  const handleSubmit = async () => {
    if (!code) return;
    validateCode(code);
  };

  return (
    <div className="flex">
      <Button
        className="bg-[--color-button-bg] text-white hover:opacity-90"
        onClick={() => setVisible(true)}
      >
        {"Ver como convidado"}
      </Button>

      {visible && (
        <div className="flex flex-col top-0 left-0 right-0 p-6 max-w-xl mx-auto absolute bg-[var(--color-info-bg)] z-50 rounded-b-3xl">
          <h1 className="text-2xl text-[#a27b78] font-bold mb-4">
            Digite seu código de convidado
          </h1>

          <input
            disabled={loading}
            className="border w-full p-2 rounded mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código..."
          />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-[#e56552] text-white px-4 py-2 rounded"
          >
            {loading ? "Validando..." : "Confirmar"}
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};
