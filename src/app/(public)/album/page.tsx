import { PolaroidCard } from "@/components/molecules/PolaroidCard";
import { Button } from "@/components/atoms/Button";
import { createClient } from "@/lib/supabase/server";
import { ModalCode } from "@/components/templates/ModalCode";
import { PhotosByCode } from "@/types/PhotosByCode";
import { WEDDING_CONFIG } from "@/config/wedding";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AlbumPage(props: Props) {
  const supabase = await createClient();
  const { code } = await props.searchParams;

  const guest = code
    ? (
        await supabase
          .from("guests")
          .select("id, party_id")
          .eq("code", code as string)
          .maybeSingle()
      ).data
    : null;

  const partyId = guest?.party_id || process.env.NEXT_PUBLIC_PARTY_ID!;

  const { data: photos, error } = await supabase.rpc("get_photos", {
    input_party_id: partyId,
    input_guest_code: (code as string) || "public",
  });

  console.log(photos, error);

  return (
    <div className="relative max-w-md mx-auto min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="bg-[var(--color-info-bg)] pb-8 pt-12 px-6 rounded-b-[3rem]">
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
            Nosso Álbum de Memórias
          </h1>
          <p className="text-sm text-[var(--color-accent)] mt-2">
            {photos && photos.length > 0 
              ? `${photos.length} fotos registradas`
              : "O álbum ainda está vazio"
            }
          </p>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="px-6 py-8">
        {/* Botão de upload */}
        <div className="flex justify-center mb-8">
          {code ? (
            <a href={`/upload/photos`}>
              <Button className="bg-[var(--color-button-bg)] text-white hover:bg-[var(--color-button-hover)] flex items-center gap-2 px-6 py-3 rounded-full shadow-lg">
                <span className="material-symbols-outlined">add_photo_alternate</span>
                Enviar suas fotos
              </Button>
            </a>
          ) : (
            <ModalCode />
          )}
        </div>

        {/* Mensagem quando vazio */}
        {!photos || photos.length === 0 ? (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-[var(--color-border)] mb-4">
              photo_library
            </span>
            <p className="text-[var(--color-accent)] mb-2">
              O álbum ainda está vazio
            </p>
            <p className="text-sm text-[var(--color-footer)]">
              Seja o primeiro a compartilhar uma foto!
            </p>
          </div>
        ) : (
          /* Grid de fotos */
          <div className="grid grid-cols-1 gap-6">
            {(photos as PhotosByCode[]).map(
              (photo: PhotosByCode, index: number) => (
                <PolaroidCard
                  key={index}
                  path={photo.path}
                  caption={photo.caption}
                  autor={photo.author}
                  index={index}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[var(--color-border)]">
        <p className="text-2xl text-[var(--color-subtitle)] mb-2" style={{ fontFamily: "var(--font-great-vibes)" }}>
          {WEDDING_CONFIG.couple.fullNames}
        </p>
        <p className="text-xs text-[var(--color-footer)]">
          {WEDDING_CONFIG.date.full}
        </p>
      </footer>
    </div>
  );
}
