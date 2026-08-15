import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json({ error: "Servis privremeno nedostupan." }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { name, email, donation_note } = body;
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Ime i email su obavezni." }, { status: 400 });
    }
    const { error } = await supabase
      .from("pending_donors")
      .insert({ name: name.trim(), email: email.trim(), donation_note: donation_note?.trim() ?? "" });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Greška pri slanju." }, { status: 500 });
  }
}
