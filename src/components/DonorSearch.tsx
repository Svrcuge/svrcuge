"use client";

import { useState } from "react";
import type { Donor } from "@/lib/supabase";

function flagEmoji(code: string | null): string {
  if (!code) return "";
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}

export function DonorSearch({ donors }: { donors: Donor[] }) {
  const [q, setQ] = useState("");
  const filtered = q.trim()
    ? donors.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()))
    : donors;

  return (
    <div>
      <div className="relative mx-auto mt-8 max-w-md">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pretraži po imenu…"
          className="w-full rounded-2xl border border-line bg-white px-5 py-3 pr-12 text-ink shadow-sm outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">🔍</span>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted">Nije pronađeno. Provjeri pravopis ili prijavi donaciju ispod.</p>
      ) : (
        <div className="mx-auto mt-8 grid max-w-5xl gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white/80 px-4 py-3"
            >
              {d.anonymous ? (
                <>
                  <span className="text-xl">🤍</span>
                  <span className="font-semibold text-ink/60 italic">{d.name}</span>
                </>
              ) : (
                <>
                  <span className="text-xl">{flagEmoji(d.country_code)}</span>
                  <span className="font-semibold text-ink">{d.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-sm text-muted">
        Prikazano {filtered.length} od {donors.length} prijatelja Svrčuga
      </p>
    </div>
  );
}

export function PendingDonorForm() {
  const [form, setForm] = useState({ name: "", email: "", donation_note: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/pending-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div className="mx-auto mt-6 max-w-lg rounded-3xl bg-amber/15 p-8 text-center">
        <p className="text-2xl">✓</p>
        <p className="mt-2 font-display font-bold text-ink">Hvala, primili smo tvoju poruku!</p>
        <p className="mt-1 text-sm text-muted">Provjerit ćemo i dodati te na spisak.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-6 max-w-lg space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">Ime i prezime *</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Kako si se potpisao/la pri doniranju"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">Email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="email@primjer.me"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">Napomena (opciono)</label>
        <textarea
          rows={3}
          value={form.donation_note}
          onChange={(e) => setForm({ ...form, donation_note: e.target.value })}
          placeholder="Kada si donirao/la, platforma, iznos…"
          className="w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
      </div>
      {status === "err" && (
        <p className="text-sm text-red-600">Greška pri slanju. Pokušaj ponovo.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Šalje se…" : "Pošalji prijavu"}
      </button>
    </form>
  );
}
