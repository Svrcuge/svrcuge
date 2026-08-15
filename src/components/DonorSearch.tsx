"use client";

import { useState, useMemo } from "react";
import type { Donor } from "@/lib/supabase";

type DonorTranslations = {
  searchPlaceholder: string;
  noResults: string;
  countLabel: string;
  countOf: string;
  formName: string;
  formNamePlaceholder: string;
  formEmail: string;
  formNote: string;
  formNotePlaceholder: string;
  formSubmit: string;
  formSending: string;
  formError: string;
  formSuccess: string;
  formSuccessNote: string;
};

function flagEmoji(code: string | null): string {
  if (!code) return "🤍";
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}

function firstLetter(name: string) {
  return name.trim()[0]?.toUpperCase() ?? "#";
}

export function DonorSearch({ donors, t }: { donors: Donor[]; t: DonorTranslations }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();

  const filtered = useMemo(
    () => (query ? donors.filter((d) => d.name.toLowerCase().includes(query)) : donors),
    [donors, query]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, Donor[]>();
    for (const d of filtered) {
      const letter = firstLetter(d.name);
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(d);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b, "sr"));
  }, [filtered]);

  const letters = grouped.map(([l]) => l);

  return (
    <div className="mx-auto mt-8 max-w-5xl">
      <div className="relative mx-auto max-w-md">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-2xl border border-line bg-white px-5 py-3 pr-12 text-ink shadow-sm outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted">🔍</span>
      </div>

      {!query && letters.length > 0 && (
        <div className="mt-6 flex flex-wrap justify-center gap-1">
          {letters.map((l) => (
            <a
              key={l}
              href={`#slovo-${l}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-amber-deep transition hover:bg-amber/20"
            >
              {l}
            </a>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-muted">{t.noResults}</p>
      ) : query ? (
        <ul className="mt-6 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <DonorRow key={d.id} donor={d} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map(([letter, group]) => (
            <div key={letter} id={`slovo-${letter}`}>
              <div className="mb-2 flex items-center gap-3">
                <span className="font-display text-2xl font-extrabold text-amber">{letter}</span>
                <div className="h-px flex-1 bg-line" />
                <span className="text-xs text-muted">{group.length}</span>
              </div>
              <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
                {group.map((d) => (
                  <DonorRow key={d.id} donor={d} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        {filtered.length === donors.length
          ? `${donors.length} ${t.countLabel}`
          : `${filtered.length} ${t.countOf} ${donors.length} ${t.countLabel}`}
      </p>
    </div>
  );
}

function DonorRow({ donor: d }: { donor: Donor }) {
  return (
    <li className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-amber/10">
      <span className="text-base leading-none">{flagEmoji(d.country_code)}</span>
      <span className={`truncate text-sm font-medium ${d.anonymous ? "italic text-ink/50" : "text-ink"}`}>
        {d.name}
      </span>
    </li>
  );
}

export function PendingDonorForm({ t }: { t: DonorTranslations }) {
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
        <p className="mt-2 font-display font-bold text-ink">{t.formSuccess}</p>
        <p className="mt-1 text-sm text-muted">{t.formSuccessNote}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-6 max-w-lg space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">{t.formName} *</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={t.formNamePlaceholder}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">{t.formEmail} *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="email@example.com"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-semibold text-ink">{t.formNote}</label>
        <textarea
          rows={3}
          value={form.donation_note}
          onChange={(e) => setForm({ ...form, donation_note: e.target.value })}
          placeholder={t.formNotePlaceholder}
          className="w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
        />
      </div>
      {status === "err" && (
        <p className="text-sm text-red-600">{t.formError}</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? t.formSending : t.formSubmit}
      </button>
    </form>
  );
}
