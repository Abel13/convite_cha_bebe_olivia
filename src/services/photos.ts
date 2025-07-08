import { createClient } from "@/lib/supabase/server";

export async function fetchAlbumPhotos(partyId: string, guestCode?: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_photos_by_code", {
    party_id: partyId,
    guest_code: guestCode || null,
  });

  console.log(data, error);
  if (error) throw new Error(error.message);
  return data;
}
