"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Entry = { name: string; text: string; when: string };

const SAMPLE: Entry[] = [
  { name: "Marija B., Ljubljana", text: "Predivna inicijativa! Svako selo zaslužuje ovakvu ljubav.", when: "Avgust 2026" },
  { name: "Petar K., Beograd", text: "Pratimo vas od prvog dana. Hvala Jovici što ne odustaje!", when: "Jul 2026" },
];

export default function GuestbookForm({ dict }: { dict: Dictionary }) {
  const p = dict.guestbookPage;
  const [entries, setEntries] = useState<Entry[]>(SAMPLE);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setEntries((prev) => [{ name: name.trim(), text: text.trim(), when: "Upravo" }, ...prev]);
    setSubmitted(true);
    setSubmitting(false);
  }

  return (
    <div>
      {/* Forma */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="border-2 border-ink bg-sand p-6 space-y-4 mb-8"
          style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
        >
          <div>
            <label className="label">Ime / grad</label>
            <input
              required
              className="input"
              placeholder={p.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Poruka</label>
            <textarea
              required
              className="input min-h-[100px]"
              placeholder={p.textPlaceholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? p.submitting : p.submitLabel}
          </button>
        </form>
      ) : (
        <div className="border-2 border-forest bg-forest/10 p-5 text-center mb-8" style={{ borderRadius: "6px" }}>
          <p className="font-bold text-forest">{p.formSuccess}</p>
          <p className="text-muted text-sm">{p.formSuccessNote}</p>
        </div>
      )}

      {/* Poruke */}
      <div className="space-y-4">
        {entries.map((e, i) => (
          <blockquote
            key={i}
            className="border-2 border-ink bg-cream p-5"
            style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.15)" }}
          >
            <p className="text-ink/85 leading-relaxed italic">„{e.text}"</p>
            <footer className="mt-2 text-xs font-bold text-muted">
              {e.name} · <span className="text-muted/60">{e.when}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
