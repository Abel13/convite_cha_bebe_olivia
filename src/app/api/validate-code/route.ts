import { createClient } from "@/lib/supabase/server";
import { GuestByCode } from "@/types/GuestByCode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  const supabase = await createClient();

  const { data: response, error } = await supabase.rpc("get_guest_by_code", {
    input_code: code,
  });

  const guest = response[0];

  if (error || !guest) {
    console.log(error);
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  return NextResponse.json({ guestId: guest.id, partyId: guest.party_id });
}
