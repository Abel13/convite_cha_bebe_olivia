// app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const data = await req.json();
  const supabase = await createClient();

  const { name, contact, adults, children } = data;

  const { error } = await supabase
    .from("rsvps")
    .upsert([
      {
        party_id: process.env.NEXT_PUBLIC_PARTY_ID,
        contact,
        name,
        adults,
        children,
      },
    ])
    .eq("contact", contact);

  console.log(error);
  if (error) {
    return NextResponse.json(
      { message: "Erro ao salvar RSVP" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: "RSVP salvo com sucesso!" },
    { status: 200 }
  );
}
