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

export const metadata = {
  title: "Confirmar Presença – Chá da Olívia",
  description:
    "Confirme sua presença e informe quantos adultos e crianças virão.",
};

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
      <p className="text-green-700 text-lg text-center">
        Presença confirmada! 💖
      </p>
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

      <div className="flex flex-col sm:flex-row gap-4">
        <NumberField
          label="Quantos Adultos (incluindo você)"
          placeholder="1"
          error={errors.adults}
          {...register("adults")}
        />

        <NumberField
          label="Quantas Crianças"
          placeholder="0"
          error={errors.children}
          {...register("children")}
        />
      </div>

      <Button type="submit" className="w-full">
        Confirmar Presença
      </Button>
    </form>
  );
}
