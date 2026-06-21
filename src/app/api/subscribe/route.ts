import { NextResponse } from "next/server";
import { subscribeLead, type SubscribeLead } from "@/lib/mailing";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    // GDPR saglasnost je obavezna.
    if (!body.consentGdpr) {
      return NextResponse.json({ error: "consent_required" }, { status: 400 });
    }

    const lead: SubscribeLead = {
      type: body.type === "first-circle" ? "first-circle" : "prelaunch",
      name: body.name ? String(body.name).trim().slice(0, 120) : undefined,
      email,
      city: body.city ? String(body.city).trim().slice(0, 120) : undefined,
      country: body.country ? String(body.country).trim().slice(0, 120) : undefined,
      language: String(body.language ?? "me").slice(0, 5),
      consentCampaign: Boolean(body.consentCampaign),
      consentFirstCircle: Boolean(body.consentFirstCircle),
      consentShare: Boolean(body.consentShare),
    };

    await subscribeLead(lead);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[svrcuge] subscribe error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
