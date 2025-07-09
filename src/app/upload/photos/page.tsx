"use client";

import { ModalCode } from "@/components/templates/ModalCode";
import { useGuestStore } from "@/store/guestStore";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { FiGlobe, FiLock } from "react-icons/fi";

export default function UploadPhotosPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [privacy, setPrivacy] = useState<string[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const { guest } = useGuestStore((store) => store);

  const previews = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setCaptions(new Array(selected.length).fill(""));
    setCaptions(new Array(selected.length).fill(""));
    setPrivacy(new Array(selected.length).fill("public")); // default
  };

  const handleUpload = async () => {
    if (!guest) return alert("Link inválido.");

    setSending(true);
    const form = new FormData();
    form.append("guestId", guest.guestId);
    form.append("partyId", guest.partyId);
    files.forEach((file, i) => {
      form.append("files", file);
      form.append(`caption-${i}`, captions[i] || "");
      form.append(`privacy-${i}`, privacy[i] || "public");
    });
    const res = await fetch("/api/upload-photos", {
      method: "POST",
      body: form,
    });
    setSending(false);
    if (res.ok) {
      alert("Fotos enviadas com sucesso!");
      setFiles([]);
      setCaptions([]);
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }
  };

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  if (!guest)
    return (
      <Suspense fallback={null}>
        <div className="flex justify-center">
          <ModalCode startVisible />
        </div>
      </Suspense>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-[#a27b78] font-bold mb-2">
        Envie suas fotos 📸
      </h1>
      <p className="text-gray-600 mb-4">
        Selecione as fotos da festa e adicione uma legenda se quiser!
      </p>

      <label className="inline-flex items-center gap-2 cursor-pointer bg-[#e56552] text-white px-6 py-2 rounded hover:bg-[#d55444] transition mb-6">
        📷 Selecionar fotos
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {previews.map((preview, index) => {
          return (
            <div
              key={index}
              className="bg-white border border-[#e3c9c2] rounded shadow-sm p-2"
            >
              <div className="w-full h-48 relative mb-2">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  fill
                  style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                />
              </div>

              {/* Legenda */}
              <input
                className="w-full px-2 py-1 text-sm border rounded mb-2"
                value={captions[index]}
                placeholder="Legenda da imagem"
                onChange={(e) => {
                  const updated = [...captions];
                  updated[index] = e.target.value;
                  setCaptions(updated);
                }}
              />

              <div className="flex gap-2 items-center">
                {privacy[index] === "public" ? (
                  <FiGlobe size={24} color="#888" />
                ) : (
                  <FiLock size={24} color="#888" />
                )}
                <select
                  className="w-full px-2 py-1 text-sm border rounded bg-white text-gray-700"
                  value={privacy[index] || "public"}
                  onChange={(e) => {
                    const updated = [...privacy];
                    updated[index] = e.target.value;
                    setPrivacy(updated);
                  }}
                >
                  <option value="public">Pública</option>
                  <option value="private">Privada</option>
                </select>
              </div>
              {privacy[index] === "public" ? (
                <span className="text-xs">Visível para todos.</span>
              ) : (
                <span className="text-xs">
                  Visível somente para convidados.
                </span>
              )}
            </div>
          );
        })}
      </div>

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={sending}
          className="bg-[#e56552] text-white px-6 py-2 rounded mt-6 hover:bg-[#d55444] transition"
        >
          {sending ? "Enviando..." : "Enviar fotos"}
        </button>
      )}
    </div>
  );
}
