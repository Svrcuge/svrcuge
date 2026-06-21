import { NextResponse } from "next/server";
import { submitPartnerLead, type PartnerLead } from "@/lib/mailing";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim();
    if (!name || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    const lead: PartnerLead = {
      name: name.slice(0, 160),
      organization: body.organization ? String(body.organization).trim().slice(0, 200) : undefined,
      email,
      phone: body.phone ? String(body.phone).trim().slice(0, 60) : undefined,
      partnershipType: String(body.partnershipType ?? "").slice(0, 80),
      message: String(body.message ?? "").trim().slice(0, 4000),
      language: String(body.language ?? "me").slice(0, 5),
    };

    await submitPartnerLead(lead);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[svrcuge] partner error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
