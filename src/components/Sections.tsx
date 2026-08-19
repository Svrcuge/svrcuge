"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import EmailSignupForm from "./EmailSignupForm";
import { SOCIAL } from "@/lib/config";

/* ── Projekti sela ─────────────────────────────────────── */
export function ProjectsSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.projects;
  return (
    <div id="projekti" style={{ marginBottom: "28px" }}>
      {/* Section header banner */}
      <div style={{ background: "#452D18", padding: "18px 18px 14px", marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0A83A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 21h4" />
            <path d="M12 3a6 6 0 0 1 3.5 10.9c-.6.5-.5 1.3-.5 2.1h-6c0-.8.1-1.6-.5-2.1A6 6 0 0 1 12 3z" />
          </svg>
        </div>
        <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "28px", textAlign: "center", color: "#F6EBD3", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {p.eyebrow}
        </div>
        <div style={{ fontSize: "14px", textAlign: "center", color: "#C9B694", marginTop: "6px" }}>{p.intro}</div>
      </div>
      <div className="dgridp" style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 18px" }}>
        {p.items.map((item) => {
          const isInProgress = item.status === "in-progress";
          const isSoon = item.status === "soon";
          const isDone = item.status === "done";
          const rowStyle: React.CSSProperties = {
            display: "flex",
            alignItems: "center",
            gap: "14px",
            borderRadius: "6px",
            padding: "14px 16px",
            ...(isInProgress
              ? { border: "2px solid #452D18", background: "#55704F", color: "#F6EBD3", boxShadow: "3px 3px 0 rgba(69,45,24,.3)" }
              : isSoon
              ? { border: "2px solid #452D18", background: "#E0A83A", color: "#452D18", boxShadow: "3px 3px 0 rgba(69,45,24,.3)" }
              : isDone
              ? { border: "2px solid #452D18", background: "#55704F", color: "#F6EBD3", boxShadow: "3px 3px 0 rgba(69,45,24,.3)" }
              : { border: "2px dashed #A5551F", background: "#FBF3E0" }),
          };
          const numColor = isInProgress || isDone ? "#E0A83A" : isSoon ? "#452D18" : "#A5551F";
          const badgeStyle: React.CSSProperties = {
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: ".1em",
            borderRadius: "3px",
            padding: "3px 8px",
            flexShrink: 0,
            ...(isInProgress || isDone
              ? { border: "1.5px solid #F6EBD3", color: "#F6EBD3" }
              : isSoon
              ? { border: "1.5px solid #452D18", color: "#452D18" }
              : {}),
          };
          const badgeLabel = isInProgress ? "U TOKU" : isSoon ? "USKORO" : isDone ? "ZAVRŠENO" : "";
          return (
            <div key={item.num} style={rowStyle}>
              <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px", color: numColor, minWidth: "28px" }}>{item.num}</span>
              <span style={{ flex: 1, fontWeight: 700, fontSize: "16px", lineHeight: 1.3 }}>{item.title}</span>
              {badgeLabel && <span style={badgeStyle}>{badgeLabel}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Događaji u selu ───────────────────────────────────── */
export function EventsSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.events;
  if (!e.items || e.items.length === 0) return null;

  const BG: string[] = ["#E0A83A", "#D96C2C", "#55704F", "#452D18"];
  const FG: string[] = ["#452D18", "#F6EBD3", "#F6EBD3", "#F6EBD3"];
  const TILTS: string[] = ["-2deg", "2deg", "-1deg", "1.5deg"];

  return (
    <div style={{ margin: "0 18px 22px" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "26px", textAlign: "center", margin: "0 0 4px", textTransform: "uppercase" }}>
        {e.eyebrow}
      </div>
      <div style={{ fontSize: "14.5px", textAlign: "center", color: "#7a5b3d", margin: "0 0 16px" }}>{e.subtitle}</div>
      <div className="dgrid" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {e.items.map((ev, i) => (
          <Link
            key={i}
            href={`/${locale}/dogadjaji`}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              border: "2px solid #452D18",
              borderRadius: "6px",
              background: "#FBF3E0",
              padding: "12px 14px",
              textDecoration: "none",
              color: "#452D18",
              boxShadow: "3px 3px 0 rgba(69,45,24,.35)",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                border: "2px solid #452D18",
                borderRadius: "4px",
                background: BG[i % BG.length],
                color: FG[i % FG.length],
                textAlign: "center",
                padding: "6px 10px",
                transform: `rotate(${TILTS[i % TILTS.length]})`,
              }}
            >
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px", lineHeight: 1 }}>{ev.day}</div>
              <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>{ev.month}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", lineHeight: 1.25, textTransform: "uppercase" }}>{ev.title}</div>
              <div style={{ fontSize: "12px", color: "#A5551F", fontWeight: 600, letterSpacing: ".04em", marginTop: "2px" }}>{ev.sub}</div>
            </div>
            <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", color: "#D96C2C", fontSize: "16px", flexShrink: 0 }}>→</span>
          </Link>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "12px" }}>
        <Link href={`/${locale}/dogadjaji`} style={{ fontSize: "13px", fontWeight: 600 }}>
          {e.allLink} →
        </Link>
      </div>
    </div>
  );
}

/* ── Ekspedicija 2026 ──────────────────────────────────── */
export function ExpeditionSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.expedition;
  return (
    <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "6px", background: "#EFDFC0" }}>
      <div style={{ border: "1px dashed #452D18", borderRadius: "3px", padding: "16px", background: "#F6EBD3" }}>
        {/* Car/truck SVG icon */}
        <div style={{ display: "flex", justifyContent: "center", margin: "0 0 6px" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#452D18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 16v-3l2.2-4.2A1.5 1.5 0 0 1 6.5 8h7l4.5 4H20a1 1 0 0 1 1 1v3h-2.2" />
            <circle cx="7" cy="16.5" r="1.8" />
            <circle cx="16.5" cy="16.5" r="1.8" />
            <path d="M8.8 16.5h5.9M3 16h2.2" />
          </svg>
        </div>
        <div style={{ fontSize: "10.5px", letterSpacing: ".16em", fontWeight: 600, color: "#A5551F", textAlign: "center", textTransform: "uppercase" }}>
          {e.eyebrow}
        </div>
        <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "24px", textAlign: "center", margin: "4px 0 12px", textTransform: "uppercase" }}>
          {e.title}
        </div>
        <p style={{ fontSize: "15px", lineHeight: 1.65, margin: "0 0 14px" }}>{e.text}</p>
        {/* Image slot */}
        <div className="dhalf" style={{ width: "100%", height: "190px", border: "1px solid #452D18", borderRadius: "3px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/illustrations/reno-put.webp" alt="Kolona na putu za Pariz" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", margin: "12px 0 0" }}>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "6px 10px", background: "#E0A83A", fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px" }}>5.137 KM</span>
            <span style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "6px 10px", background: "#D96C2C", color: "#F6EBD3", fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px" }}>3x RENAULT 4</span>
          </div>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "6px 10px", fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px" }}>11 PUTNIKA</span>
            <span style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "6px 10px", background: "#F6EBD3", fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px" }}>5 AUTOMOBILA</span>
            <span style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "6px 10px", background: "#55704F", color: "#F6EBD3", fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px" }}>14 DANA</span>
          </div>
        </div>
        {/* CTA */}
        <Link
          href={`/${locale}/prica`}
          style={{
            display: "block",
            textAlign: "center",
            boxSizing: "border-box",
            width: "100%",
            marginTop: "14px",
            padding: "12px",
            background: "transparent",
            color: "#452D18",
            border: "2px solid #452D18",
            borderRadius: "4px",
            fontFamily: "var(--font-alfa), Georgia, serif",
            fontSize: "12.5px",
            letterSpacing: ".06em",
            textDecoration: "none",
            textTransform: "uppercase",
          }}
        >
          {e.cta}
        </Link>
      </div>
    </div>
  );
}

/* ── Gdje su Svrčuge (mapa) ────────────────────────────── */
export function LocationSection({ dict }: { dict: Dictionary }) {
  const l = dict.location;
  return (
    <div className="dcol" style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", overflow: "hidden", background: "#FBF3E0" }}>
      <div style={{ padding: "14px 16px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#D96C2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-6.5-5.6-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
            <circle cx="12" cy="10.5" r="2.3" />
          </svg>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "16px", textTransform: "uppercase" }}>{l.title}</div>
        </div>
        <div style={{ fontSize: "13px", color: "#7a5b3d", marginTop: "2px" }}>{l.subtitle}</div>
      </div>
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=18.40%2C42.42%2C18.72%2C42.60&layer=mapnik&marker=42.51%2C18.56"
        className="dgrow"
        style={{ width: "100%", height: "240px", border: "none", borderTop: "2px solid #452D18", display: "block" }}
        title="Mapa: Svrčuge"
        loading="lazy"
      />
    </div>
  );
}

/* ── Citat ─────────────────────────────────────────────── */
export function BlockquoteSection({ dict }: { dict: Dictionary }) {
  const q = dict.blockquote;
  return (
    <div style={{ margin: "0 18px 22px", padding: "22px 18px", background: "#452D18", color: "#F6EBD3", borderRadius: "6px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "22px", lineHeight: 1.35 }}>
        „{q.text}"
      </div>
      <div style={{ marginTop: "12px", fontSize: "14px", color: "#E0A83A" }}>{q.author}</div>
    </div>
  );
}

/* ── Budi uz selo (email signup) ───────────────────────── */
export function EmailSignupSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const e = dict.emailSignup;
  return (
    <div id="prijava" style={{ margin: "0 18px 16px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "18px", background: "#FBF3E0" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "22px", color: "#A5551F", margin: "0 0 8px" }}>
        {e.eyebrow}
      </div>
      <p style={{ fontSize: "15px", lineHeight: 1.6, margin: "0 0 14px" }}>{e.intro}</p>
      <EmailSignupForm dict={dict} locale={locale} />
    </div>
  );
}

/* ── Časti kafu ─────────────────────────────────────────── */
export function CoffeeSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = dict.coffee;
  return (
    <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "16px", background: "#E0A83A" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#452D18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10h12v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
          <path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2" />
          <path d="M7.5 7c0-1 .8-1.2.8-2.2M11.5 7c0-1 .8-1.2.8-2.2" />
        </svg>
        <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "20px", textTransform: "uppercase" }}>{c.title}</div>
      </div>
      <p style={{ fontSize: "15px", lineHeight: 1.6, margin: "8px 0 12px" }}>{c.text}</p>
      <Link
        href={`/${locale}/kafa`}
        style={{
          display: "block",
          textAlign: "center",
          boxSizing: "border-box",
          width: "100%",
          padding: "12px",
          background: "#D96C2C",
          color: "#F6EBD3",
          border: "2px solid #452D18",
          borderRadius: "4px",
          fontFamily: "var(--font-alfa), Georgia, serif",
          fontSize: "13px",
          letterSpacing: ".06em",
          textDecoration: "none",
          textTransform: "uppercase",
        }}
      >
        {c.cta}
      </Link>
      <div style={{ fontSize: "12px", marginTop: "8px", textAlign: "center" }}>
        <Link href={`/${locale}/donatori`} style={{ color: "#452D18" }}>{c.donorLink}</Link>
      </div>
    </div>
  );
}

/* ── Transparentnost ───────────────────────────────────── */
export function TransparencySection({ dict }: { dict: Dictionary }) {
  const t = dict.transparency;
  return (
    <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "16px", background: "#FBF3E0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 10px" }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#452D18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
        </svg>
        <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "20px", textTransform: "uppercase" }}>{t.title}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "9px", fontSize: "15px", lineHeight: 1.55 }}>
        {t.items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px" }}>
            <span style={{ color: "#55704F", fontWeight: 600 }}>✓</span>
            {item}
          </div>
        ))}
      </div>
    </div>
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
    <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", padding: "16px", background: "#FBF3E0", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "22px", margin: "0 0 8px", textTransform: "uppercase" }}>{s.title}</div>
      <p style={{ fontSize: "15px", lineHeight: 1.6, margin: "0 0 14px" }}>{s.text}</p>
      <button
        type="button"
        onClick={handleShare}
        style={{
          padding: "12px 22px",
          background: "#D96C2C",
          color: "#F6EBD3",
          border: "2px solid #452D18",
          borderRadius: "4px",
          fontFamily: "var(--font-alfa), Georgia, serif",
          fontSize: "13px",
          letterSpacing: ".06em",
          cursor: "pointer",
          textTransform: "uppercase",
        }}
      >
        {copied ? s.copied : s.cta}
      </button>
    </div>
  );
}

/* ── Partneri ──────────────────────────────────────────── */
export function PartnersSection({ dict }: { dict: Dictionary }) {
  const p = dict.partnersSection;
  return (
    <div className="dnarrow" style={{ margin: "0 18px 22px", textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "26px", margin: "0 0 6px", textTransform: "uppercase" }}>{p.title}</div>
      <div style={{ fontSize: "14.5px", color: "#7a5b3d", margin: "0 0 14px" }}>{p.text}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
        {["Ime partnera 1", "Ime partnera 2", "Ime partnera 3"].map((n) => (
          <span
            key={n}
            style={{ border: "1.5px solid #452D18", borderRadius: "999px", padding: "7px 14px", fontSize: "13px", background: "#FBF3E0", color: "#7a5b3d" }}
          >
            {n}
          </span>
        ))}
      </div>
      <div style={{ fontSize: "12px", color: "#7a5b3d", marginTop: "10px" }}>Pošalji mi imena i logotipe partnera da ih upišem.</div>
    </div>
  );
}

/* ── FAQ ───────────────────────────────────────────────── */
export function FaqSection({ dict }: { dict: Dictionary }) {
  const f = dict.faq;
  const [open, setOpen] = useState(-1);

  return (
    <div className="dnarrow" style={{ margin: "0 18px 26px" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "26px", textAlign: "center", margin: "0 0 14px", textTransform: "uppercase" }}>
        {f.title}
      </div>
      {f.items.map((item, i) => (
        <div
          key={i}
          style={{ border: "2px solid #452D18", borderRadius: "4px", background: "#FBF3E0", margin: "0 0 8px", overflow: "hidden" }}
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              padding: "12px 14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-zilla), Georgia, serif",
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#452D18",
              textAlign: "left",
            }}
          >
            <span>{item.q}</span>
            <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", color: "#A5551F", flexShrink: 0 }}>
              {open === i ? "–" : "+"}
            </span>
          </button>
          {open === i && (
            <div style={{ padding: "0 14px 12px", fontSize: "13.5px", lineHeight: 1.6, color: "#5d4630" }}>
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
