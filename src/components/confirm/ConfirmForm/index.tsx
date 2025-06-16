"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { InputField } from "@/components/atoms/InputField";
import { NumberField } from "@/components/atoms/NumberField";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-hot-toast";
import { confirmSchema } from "@/schemas/confirm.schema";

export interface ConfirmFormData {
  name: string;
  contact: string;
  adults: number;
  children: number;
}

export function ConfirmForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmFormData>({
    resolver: yupResolver(confirmSchema),
    defaultValues: {
      name: "",
      contact: "",
      adults: 1,
      children: 0,
    },
  });

  const onSubmit = async (data: ConfirmFormData) => {
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmitted(true);
      toast.success("Presença confirmada! 💖");
    } else {
      toast.error("Erro ao confirmar presença. Tente novamente.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-[var(--color-info-bg)] border border-[var(--color-border)] text-[var(--color-title)] rounded-xl p-6 text-center shadow-md fade-in">
        <div className="text-4xl mb-2">💖</div>
        <h2 className="text-xl font-semibold mb-1">Presença confirmada!</h2>
        <p className="text-sm text-[var(--foreground)]">
          Obrigada por confirmar. Estamos muito felizes com a sua presença! 🍼🎀
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <InputField
        label="Seu nome"
        placeholder="Digite seu nome"
        error={errors.name}
        {...register("name")}
      />
      <InputField
        label="Seu contato"
        placeholder="WhatsApp ou email"
        error={errors.contact}
        {...register("contact")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <NumberField
          label="Quantos Adultos (incluindo você)"
          placeholder="1"
          error={errors.adults}
          className="flex-1"
          {...register("adults")}
        />

        <NumberField
          label="Quantas Crianças"
          placeholder="0"
          error={errors.children}
          className="flex-1"
          {...register("children")}
        />
      </div>
      <Button type="submit" className="w-full">
        Confirmar Presença
      </Button>
    </form>
  );
}
