"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export default function VisitForm({ dict }: { dict: Dictionary }) {
  const p = dict.visitPage;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="border-2 border-forest bg-forest/10 p-6 text-center" style={{ borderRadius: "6px" }}>
        <p className="font-bold text-forest text-lg mb-1">{p.formSuccess}</p>
        <p className="text-muted text-sm">{p.formSuccessNote}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-ink bg-sand p-6 space-y-4"
      style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
    >
      <div>
        <label className="label">{p.formName}</label>
        <input required className="input" placeholder="Tvoje ime" />
      </div>
      <div>
        <label className="label">{p.formEmail}</label>
        <input required type="email" className="input" placeholder="ti@primjer.com" />
      </div>
      <div>
        <label className="label">{p.formDate}</label>
        <input type="date" className="input" />
      </div>
      <div>
        <label className="label">
          {p.formNote} <span className="font-normal text-muted">(opciono)</span>
        </label>
        <textarea className="input min-h-[80px]" placeholder={p.formNotePlaceholder} />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? p.formSubmitting : p.formCta}
      </button>
    </form>
  );
}
