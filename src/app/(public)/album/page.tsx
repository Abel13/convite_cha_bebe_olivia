// app/(public)/album/page.tsx
import { PolaroidCard } from "@/components/molecules/PolaroidCard";
import { Button } from "@/components/atoms/Button";
import { createClient } from "@/lib/supabase/server";
import { ModalCode } from "@/components/templates/ModalCode";
import { PhotosByCode } from "@/types/PhotosByCode";

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

  const { data: photos } = await supabase.rpc("get_photos_by_code", {
    party_id: partyId,
    guest_code: code as string,
  });

  if (!photos)
    return (
      <div className="min-h-screen px-4 py-10 bg-[--color-info-bg]">
        <h1 className="text-3xl font-bold text-[--color-title] text-center mb-6">
          Nosso álbum de memórias
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-10 bg-[--color-info-bg] items-center">
      <h1 className="text-3xl font-bold text-[--color-title] text-center mb-6">
        Nosso álbum de memórias
      </h1>

      <div className="flex justify-center mb-6">
        {code ? (
          <a href={`/upload/photos`}>
            <Button className="bg-[--color-button-bg] text-white hover:opacity-90">
              {"Enviar suas fotos ✨"}
            </Button>
          </a>
        ) : (
          <ModalCode />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(photos as PhotosByCode[]).map(
          (photo: PhotosByCode, index: number) => (
            <PolaroidCard
              key={index}
              path={photo.image_url}
              caption={photo.message}
              index={index}
            />
          )
        )}
      </div>
    </div>
  );
}
