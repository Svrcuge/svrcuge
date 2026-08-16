"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import EmailSignupForm from "./EmailSignupForm";
import { SOCIAL } from "@/lib/config";

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center">
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-display text-3xl font-bold text-ink text-balance sm:text-4xl">{title}</h2>
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  done: "bg-forest text-cream",
  "in-progress": "bg-amber text-ink",
  soon: "bg-amber/40 text-ink",
  next: "bg-paper-light text-muted",
  planned: "bg-paper-light text-muted",
};

const STATUS_DISPLAY: Record<string, string> = {
  done: "Završeno",
  "in-progress": "U TOKU",
  soon: "USKORO",
  next: "Sljedeće",
  planned: "",
};

/* ── Projekti sela ─────────────────────────────────────── */
export function ProjectsSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.projects;
  return (
    <section id="projekti" className="section border-t-2 border-line py-14">
      <div className="container-content">
        <SectionHeading eyebrow={`✦ ${p.eyebrow}`} title={p.intro} />
        <ul className="mt-10 mx-auto max-w-xl space-y-3">
          {p.items.map((item) => (
            <li
              key={item.num}
              className="flex items-center gap-4 border-2 border-ink bg-sand px-4 py-3"
              style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
            >
              <span
                className="flex-none flex h-8 w-8 items-center justify-center border-2 border-ink text-sm font-black"
                style={{ borderRadius: "50%", background: "#F6EBD3", fontFamily: "var(--font-alfa), Georgia, serif" }}
              >
                {item.num}
              </span>
              <span className="flex-1 font-semibold text-ink">{item.title}</span>
              {STATUS_DISPLAY[item.status] && (
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 ${STATUS_STYLES[item.status]}`}
                  style={{ borderRadius: "3px" }}
                >
                  {STATUS_DISPLAY[item.status]}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Događaji u selu ───────────────────────────────────── */
export function EventsSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.events;
  if (!e.items || e.items.length === 0) return null;

  const BG_COLORS = ["#E0A83A", "#D96C2C", "#55704F", "#452D18"];
  const FG_COLORS = ["#452D18", "#F6EBD3", "#F6EBD3", "#F6EBD3"];
  const TILTS = ["-2deg", "2deg", "-1deg", "1.5deg"];

  return (
    <section id="dogadjaji" className="section border-t-2 border-line py-14">
      <div className="container-content">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <div className="eyebrow mb-2">✦ {e.eyebrow}</div>
            <h2 className="font-display text-3xl font-bold text-ink">{e.subtitle}</h2>
          </div>
          <Link href={`/${locale}/dogadjaji`} className="text-sm font-bold text-amber-deep hover:underline hidden sm:block">
            {e.allLink} →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {e.items.map((ev, i) => (
            <div
              key={i}
              className="relative overflow-hidden border-2 border-ink p-5"
              style={{
                borderRadius: "6px",
                background: BG_COLORS[i % BG_COLORS.length],
                color: FG_COLORS[i % FG_COLORS.length],
                transform: `rotate(${TILTS[i % TILTS.length]})`,
                boxShadow: "4px 4px 0 rgba(69,45,24,0.25)",
              }}
            >
              <div
                className="font-display text-5xl font-bold leading-none opacity-20 absolute right-4 top-2"
                style={{ fontFamily: "var(--font-alfa), Georgia, serif" }}
              >
                {ev.day}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] mb-1 opacity-75">{ev.month}</div>
              <div
                className="text-xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-alfa), Georgia, serif" }}
              >
                {ev.title}
              </div>
              <div className="text-xs font-semibold mt-1 opacity-80">{ev.sub}</div>
              <Link
                href={`/${locale}/dogadjaji`}
                className="mt-3 inline-block text-xs font-black uppercase tracking-widest opacity-90 hover:opacity-100"
              >
                →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center sm:hidden">
          <Link href={`/${locale}/dogadjaji`} className="text-sm font-bold text-amber-deep hover:underline">
            {e.allLink} →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Ekspedicija 2026 ──────────────────────────────────── */
export function ExpeditionSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.expedition;
  return (
    <section id="ekspedicija" className="section border-t-2 border-line py-14">
      <div className="container-content">
        <div className="max-w-2xl">
          <div className="eyebrow mb-3">✦ {e.eyebrow}</div>
          <h2 className="font-display text-3xl font-bold text-ink text-balance sm:text-4xl">{e.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{e.text}</p>
        </div>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-3">
          {e.stats.map((s, i) => (
            <div
              key={i}
              className="border-2 border-ink bg-sand px-4 py-2 text-center"
              style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
            >
              <div
                className="text-2xl font-bold text-amber-deep leading-none"
                style={{ fontFamily: "var(--font-alfa), Georgia, serif" }}
              >
                {s.value}
              </div>
              {s.label && <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted mt-0.5">{s.label}</div>}
            </div>
          ))}
        </div>

        <div className="mt-7">
          <Link href={`/${locale}/prica`} className="btn-primary">
            {e.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Gdje su Svrčuge ───────────────────────────────────── */
export function LocationSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const l = dict.location;
  return (
    <section id="lokacija" className="section border-t-2 border-line py-14 bg-sand">
      <div className="container-content">
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{l.title}</h2>
          <p className="mt-2 text-sm font-semibold text-muted tracking-wide">{l.subtitle}</p>
        </div>
        {/* Map placeholder */}
        <div
          className="w-full border-2 border-ink overflow-hidden"
          style={{ borderRadius: "6px", aspectRatio: "16/7", background: "#EFDFC0" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2872.0!2d18.5380!3d42.4420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c72c4d0bbcb29%3A0x8a5b1e3c0b5c5a2!2sSvr%C4%8Duge!5e0!3m2!1sen!2sme!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Lokacija Svrčuga"
          />
        </div>
        <div className="mt-4 text-center">
          <Link href={`/${locale}/posjeti`} className="btn-secondary">
            Kako doći →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Citat ─────────────────────────────────────────────── */
export function BlockquoteSection({ dict }: { dict: Dictionary }) {
  const q = dict.blockquote;
  return (
    <section
      className="py-14 px-5 text-center"
      style={{ background: "#452D18", borderTop: "3px double #C0A882", borderBottom: "3px double #C0A882" }}
    >
      <blockquote className="mx-auto max-w-2xl">
        <p
          className="text-cream leading-tight text-balance"
          style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "clamp(20px, 4vw, 30px)" }}
        >
          „{q.text}"
        </p>
        <footer className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-amber/80">
          — {q.author}
        </footer>
      </blockquote>
    </section>
  );
}

/* ── Budi uz selo (email signup) ───────────────────────── */
export function EmailSignupSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.emailSignup;
  return (
    <section id="prijava" className="section border-t-2 border-line py-14">
      <div className="container-content">
        <div className="mx-auto max-w-xl">
          <div className="eyebrow mb-3">✦ {e.eyebrow}</div>
          <h2 className="font-display text-2xl font-bold text-ink text-balance sm:text-3xl mb-2">
            {e.label}
          </h2>
          <p className="text-muted mb-6">{e.intro}</p>
          <div
            className="border-2 border-ink bg-sand p-6"
            style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
          >
            <EmailSignupForm dict={dict} locale={locale} />
            <p className="mt-3 text-xs text-muted text-center">{e.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Časti kafu ─────────────────────────────────────────── */
export function CoffeeSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.coffee;
  return (
    <section id="kafa" className="section border-t-2 border-line py-14 bg-sand">
      <div className="container-content">
        <div className="mx-auto max-w-2xl">
          <div
            className="border-2 border-ink bg-cream p-7 text-center"
            style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.25)" }}
          >
            <h2
              className="font-display text-3xl font-bold text-ink"
            >
              {c.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink/80">{c.text}</p>
            <a href={`/${locale}/kafa`} className="btn-accent mt-5 inline-block">
              {c.cta}
            </a>
            <div className="mt-4">
              <Link href={`/${locale}/donatori`} className="text-sm font-semibold text-amber-deep hover:underline">
                {c.donorLink} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Transparentnost ───────────────────────────────────── */
export function TransparencySection({ dict }: { dict: Dictionary }) {
  const t = dict.transparency;
  return (
    <section id="transparentnost" className="section border-t-2 border-line py-14">
      <div className="container-content">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-2xl font-bold text-ink text-center mb-6">{t.title}</h2>
          <ul className="space-y-2">
            {t.items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-ink/85">
                <span className="text-forest font-bold text-lg flex-none">✓</span>
                <span className="font-semibold">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Podijeli priču ─────────────────────────────────────── */
export function ShareSection({ dict }: { dict: Dictionary }) {
  const s = dict.shareSection;
  const [copied, setCopied] = useState(false);

  function handleShare() {
    if (typeof navigator === "undefined") return;
    const data = { title: "Svrčuge — Selo koje se budi", url: "https://svrcuge.me" };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else {
      navigator.clipboard.writeText(data.url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  }

  return (
    <section id="podijeli" className="section border-t-2 border-line py-14 bg-sand">
      <div className="container-content text-center">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">{s.title}</h2>
        <p className="text-muted mb-5 max-w-md mx-auto">{s.text}</p>
        <button
          type="button"
          onClick={handleShare}
          className="btn-primary"
        >
          {copied ? s.copied : s.cta}
        </button>
      </div>
    </section>
  );
}

/* ── Partneri ──────────────────────────────────────────── */
export function PartnersSection({ dict }: { dict: Dictionary }) {
  const p = dict.partnersSection;
  return (
    <section id="partneri" className="section border-t-2 border-line py-14">
      <div className="container-content text-center">
        <h2 className="font-display text-2xl font-bold text-ink mb-2">{p.title}</h2>
        <p className="text-muted mb-8 max-w-md mx-auto">{p.text}</p>
        {/* Placeholder za logotipe partnera */}
        <div className="flex flex-wrap justify-center gap-6 opacity-50">
          {["Partner 1", "Partner 2", "Partner 3"].map((n) => (
            <div
              key={n}
              className="border-2 border-line px-6 py-3 text-sm font-bold text-muted"
              style={{ borderRadius: "6px" }}
            >
              {n}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted/60">Pošalji mi imena i logotipe partnera da ih upišem.</p>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────── */
export function FaqSection({ dict }: { dict: Dictionary }) {
  const f = dict.faq;
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" className="section border-t-2 border-line py-14 bg-sand">
      <div className="container-content">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-8">{f.title}</h2>
        <div className="mx-auto max-w-2xl space-y-3">
          {f.items.map((item, i) => (
            <details
              key={i}
              open={open === i}
              onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open ? i : -1)}
              className="border-2 border-ink bg-sand"
              style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-bold text-ink list-none">
                {item.q}
                <span className="flex-none text-xl font-black text-amber-deep">{open === i ? "–" : "+"}</span>
              </summary>
              <div className="px-5 pb-4 leading-relaxed text-ink/80">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
