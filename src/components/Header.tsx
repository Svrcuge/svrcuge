"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";

const LOCALE_FULL: Record<string, string> = {
  me: "ME · Crnogorski",
  en: "EN · English",
  fr: "FR · Français",
  ru: "RU · Русский",
  de: "DE · Deutsch",
};

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;
  const n = dict.nav;

  const desktopLinks = [
    { href: home, label: "Početna" },
    { href: `${home}/prica`, label: n.story },
    { href: `${home}/novosti`, label: n.news },
    { href: `${home}/dogadjaji`, label: n.events },
    { href: `${home}/istorija`, label: n.history },
    { href: `${home}/posjeti`, label: n.visit },
    { href: `${home}#projekti`, label: n.projects },
    { href: `${home}/donatori`, label: n.friends },
    { href: `${home}/mediji`, label: n.media },
    { href: `${home}/prodavnica`, label: n.shop },
    { href: `${home}/knjiga`, label: n.guestbook },
  ];

  const mobileLinks = [
    { href: home, label: "Početna" },
    { href: `${home}/prica`, label: n.story },
    { href: `${home}/novosti`, label: n.news },
    { href: `${home}/dogadjaji`, label: n.events },
    { href: `${home}/istorija`, label: n.history },
    { href: `${home}/posjeti`, label: n.visit },
    { href: `${home}#projekti`, label: n.projects },
    { href: `${home}/donatori`, label: n.friends },
    { href: `${home}/mediji`, label: n.media },
    { href: `${home}/prodavnica`, label: n.shop },
    { href: `${home}/knjiga`, label: n.guestbook },
  ];

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 18px",
          borderBottom: "3px solid #2a1a0a",
          background: "#452D18",
        }}
      >
        {/* Logo */}
        <Link
          href={home}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-alfa), Georgia, serif",
            fontSize: "17px",
            color: "#452D18",
            textDecoration: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo-white.png" alt="Svrčuge" style={{ height: "34px" }} />
          <span style={{ color: "#F6EBD3" }}>SVRČUGE</span>
        </Link>

        {/* Desktop nav — hidden on mobile, shown via .dnav CSS class at ≥900px */}
        <nav
          className="dnav"
          style={{
            display: "none",
            gap: "14px",
            alignItems: "center",
            fontSize: "12px",
            fontFamily: "var(--font-alfa), Georgia, serif",
            letterSpacing: "0.02em",
          }}
        >
          {desktopLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: "#F6EBD3", textDecoration: "none" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Language dropdown */}
          <details style={{ position: "relative" }}>
            <summary
              style={{
                listStyle: "none",
                cursor: "pointer",
                border: "2px solid #F6EBD3",
                borderRadius: "4px",
                padding: "8px 10px",
                fontSize: "12px",
                fontWeight: 600,
                fontFamily: "var(--font-zilla), Georgia, serif",
                userSelect: "none",
                color: "#F6EBD3",
              }}
            >
              {locale.toUpperCase()} ▾
            </summary>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "44px",
                background: "#2a1a0a",
                border: "2px solid #F6EBD3",
                borderRadius: "4px",
                display: "flex",
                flexDirection: "column",
                minWidth: "140px",
                zIndex: 60,
                overflow: "hidden",
              }}
            >
              {LOCALES.map((loc, i) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    fontWeight: loc === locale ? 700 : 500,
                    background: loc === locale ? "#E0A83A" : undefined,
                    color: loc === locale ? "#2a1a0a" : "#F6EBD3",
                    borderTop: i > 0 ? "1px solid rgba(246,235,211,.15)" : "none",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  {LOCALE_FULL[loc]}
                </Link>
              ))}
            </div>
          </details>

          {/* Hamburger — samo na mobilnom */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Meni"
            className="dmobile-only"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              background: "none",
              border: "2px solid #F6EBD3",
              borderRadius: "4px",
              padding: "9px 8px",
              cursor: "pointer",
            }}
          >
            <span style={{ width: "18px", height: "2px", background: "#F6EBD3", display: "block" }} />
            <span style={{ width: "18px", height: "2px", background: "#F6EBD3", display: "block" }} />
            <span style={{ width: "18px", height: "2px", background: "#F6EBD3", display: "block" }} />
          </button>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "#452D18",
            color: "#F6EBD3",
            display: "flex",
            flexDirection: "column",
            padding: "18px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-white.png" alt="Svrčuge" style={{ height: "64px" }} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "2px solid #F6EBD3",
                borderRadius: "4px",
                color: "#F6EBD3",
                fontSize: "16px",
                padding: "6px 12px",
                cursor: "pointer",
                fontFamily: "var(--font-zilla), Georgia, serif",
              }}
            >
              ✕
            </button>
          </div>

          <nav style={{ display: "flex", flexDirection: "column", gap: "2px", margin: "22px 0 0", overflowY: "auto", minHeight: 0 }}>
            {mobileLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-alfa), Georgia, serif",
                  fontSize: "20px",
                  color: i === 0 ? "#E0A83A" : "#F6EBD3",
                  textDecoration: "none",
                  padding: "8px 0",
                  borderBottom: i < mobileLinks.length - 1 ? "1px dashed rgba(246,235,211,.3)" : "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: "auto", fontSize: "13px", color: "#C9B694" }}>
            Instagram @svrcuge.me · TikTok<br />zdravo@svrcuge.me
          </div>
        </div>
      )}
    </>
  );
}
