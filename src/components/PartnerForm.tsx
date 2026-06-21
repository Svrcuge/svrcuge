"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function PartnerForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.partnerForm;
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      organization: fd.get("organization") || undefined,
      email: fd.get("email"),
      phone: fd.get("phone") || undefined,
      partnershipType: fd.get("partnershipType"),
      message: fd.get("message"),
      language: locale,
    };
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card flex min-h-[300px] flex-col items-center justify-center bg-forest/10 text-center">
        <span className="text-5xl">🤝</span>
        <p className="mt-4 max-w-sm text-lg font-semibold text-forest-deep">{p.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 sm:p-7">
      <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="p-name">{p.name}</label>
          <input id="p-name" name="name" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="p-org">{p.organization}</label>
          <input id="p-org" name="organization" className="input" />
        </div>
        <div>
          <label className="label" htmlFor="p-email">{p.email}</label>
          <input id="p-email" name="email" type="email" required className="input" />
        </div>
        <div>
          <label className="label" htmlFor="p-phone">{p.phone}</label>
          <input id="p-phone" name="phone" className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="p-type">{p.type}</label>
        <select id="p-type" name="partnershipType" className="select" defaultValue={p.types[0]}>
          {p.types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="p-msg">{p.message}</label>
        <textarea id="p-msg" name="message" rows={4} className="input resize-none" placeholder={p.messagePlaceholder} />
      </div>
      {state === "error" && (
        <p className="rounded-2xl bg-terracotta/10 px-4 py-3 text-sm font-semibold text-terracotta">{p.error}</p>
      )}
      <button type="submit" disabled={state === "loading"} className="btn-forest w-full">
        {state === "loading" ? p.submitting : p.submit}
      </button>
    </form>
  );
}
