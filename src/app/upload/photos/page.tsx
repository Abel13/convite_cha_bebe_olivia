"use client";

import Image from "next/image";
import { useState } from "react";

export default function UploadPhotosPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setCaptions(new Array(selected.length).fill(""));
  };

  const handleUpload = async () => {
    // if (!guestId || !partyId) return alert("Link inválido.");
    // setSending(true);
    // const form = new FormData();
    // form.append("guestId", guestId);
    // form.append("partyId", partyId);
    // files.forEach((file, i) => {
    //   form.append("files", file);
    //   form.append(`caption-${i}`, captions[i] || "");
    // });
    // const res = await fetch("/api/upload-photos", {
    //   method: "POST",
    //   body: form,
    // });
    // setSending(false);
    // if (res.ok) {
    //   alert("Fotos enviadas com sucesso!");
    //   setFiles([]);
    //   setCaptions([]);
    // } else {
    //   alert("Erro ao enviar. Tente novamente.");
    // }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-[#a27b78] font-bold mb-2">
        Envie suas fotos 📸
      </h1>
      <p className="text-gray-600 mb-4">
        Selecione as fotos da festa e adicione uma legenda se quiser!
      </p>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {files.map((file, index) => {
          const preview = URL.createObjectURL(file);

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
              <input
                className="w-full px-2 py-1 text-sm border rounded"
                value={captions[index]}
                placeholder="Legenda da imagem"
                onChange={(e) => {
                  const updated = [...captions];
                  updated[index] = e.target.value;
                  setCaptions(updated);
                }}
              />
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
