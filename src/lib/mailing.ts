// ── E-mail capture integracija ─────────────────────────────
// OVDJE se povezuje pravi e-mail servis (MailerLite / Brevo / Mailchimp).
//
// Trenutno (pre-launch) lead-ovi se samo loguju u server konzolu i vraća
// se uspjeh. Tako forma radi odmah, bez ikakvog ključa. Kada budeš
// spreman, otkomentariši JEDAN od blokova ispod i dodaj ključ u
// .env.local (vidi .env.example).

export type SubscribeLead = {
  type: "first-circle" | "prelaunch";
  name?: string;
  email: string;
  city?: string;
  country?: string;
  language: string;
  consentCampaign: boolean;
  consentFirstCircle: boolean;
  consentShare: boolean;
};

export type PartnerLead = {
  name: string;
  organization?: string;
  email: string;
  phone?: string;
  partnershipType: string;
  message: string;
  language: string;
};

// Tagovi koji se šalju e-mail platformi (segmentacija publike).
export function buildTags(lead: SubscribeLead): string[] {
  const tags = ["prelaunch", `language-${lead.language}`];
  if (lead.consentFirstCircle) tags.push("first-circle");
  if (lead.consentShare) tags.push("can-share");
  if (lead.country) tags.push(`country-${lead.country.toLowerCase().slice(0, 20)}`);
  return tags;
}

export async function subscribeLead(lead: SubscribeLead): Promise<void> {
  const tags = buildTags(lead);

  // ── DEV / pre-launch: samo log ───────────────────────────
  console.log("[svrcuge] NEW SUBSCRIBE LEAD", { ...lead, tags });

  // ── MAILERLITE (otkomentariši kada dobiješ ključ) ────────
  // const key = process.env.MAILERLITE_API_KEY;
  // const groupId = process.env.MAILERLITE_GROUP_ID;
  // if (key) {
  //   await fetch("https://connect.mailerlite.com/api/subscribers", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${key}`,
  //     },
  //     body: JSON.stringify({
  //       email: lead.email,
  //       fields: { name: lead.name, city: lead.city, country: lead.country },
  //       groups: groupId ? [groupId] : undefined,
  //       // MailerLite nema "tags" direktno, koristi groups ili fields.
  //     }),
  //   });
  // }

  // ── BREVO (alternativa) ──────────────────────────────────
  // const brevoKey = process.env.BREVO_API_KEY;
  // if (brevoKey) {
  //   await fetch("https://api.brevo.com/v3/contacts", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", "api-key": brevoKey },
  //     body: JSON.stringify({
  //       email: lead.email,
  //       attributes: { FIRSTNAME: lead.name, CITY: lead.city, COUNTRY: lead.country },
  //       listIds: process.env.BREVO_LIST_ID ? [Number(process.env.BREVO_LIST_ID)] : undefined,
  //       updateEnabled: true,
  //     }),
  //   });
  // }
}

export async function submitPartnerLead(lead: PartnerLead): Promise<void> {
  // Za partnere je obično dovoljan e-mail organizatoru ili upis u CRM.
  // Za sada: log. Kasnije: pošalji e-mail (Resend/Brevo) ili upiši u bazu.
  console.log("[svrcuge] NEW PARTNER LEAD", lead);
}
