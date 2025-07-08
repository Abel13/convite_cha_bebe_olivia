import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const guestId = form.get("guestId") as string;
  const partyId = form.get("partyId") as string;

  const files = form.getAll("files") as File[];
  const captions = files.map(
    (_, i) => form.get(`caption-${i}`)?.toString() || ""
  );

  const supabase = await createClient();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const caption = captions[i];
    const path = `${partyId}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("party")
      .upload(path, file, {
        upsert: true,
      });

    if (uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const { error: photoError } = await supabase.from("photos").insert({
      guest_id: guestId,
      party_id: partyId,
      path,
      caption,
    });

    if (photoError) {
      await supabase.storage.from("party").remove([path]);
      return NextResponse.json({ error: photoError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
