"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";
import { SOCIAL } from "@/lib/config";

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;
  const n = dict.nav;

  const desktopLinks = [
    { href: `${home}/prica`, label: n.story },
    { href: `${home}/novosti`, label: n.news },
    { href: `${home}/dogadjaji`, label: n.events },
    { href: `${home}/posjeti`, label: n.visit },
    { href: `${home}/prodavnica`, label: n.shop },
  ];

  const mobileLinks = [
    { href: home, label: "Početna" },
    { href: `${home}/prica`, label: n.story },
    { href: `${home}/novosti`, label: n.news },
    { href: `${home}/dogadjaji`, label: n.events },
    { href: `${home}/istorija`, label: n.history },
    { href: `${home}/posjeti`, label: n.visit },
    { href: `${home}/projekti`, label: n.projects },
    { href: `${home}/donatori`, label: n.friends },
    { href: `${home}/mediji`, label: n.media },
    { href: `${home}/prodavnica`, label: n.shop },
    { href: `${home}/knjiga`, label: n.guestbook },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-cream"
        style={{ borderBottom: "3px double #452D18" }}
      >
        <div className="container-content flex items-center justify-between gap-4 py-3.5">
          {/* Logo */}
          <Link
            href={home}
            className="flex items-center gap-2.5 text-ink"
            style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "18px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-black.png" alt="Svrčuge" style={{ height: "34px" }} />
            SVRČUGE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            {desktopLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13.5px] font-semibold text-ink transition hover:text-amber-deep"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageSwitcher current={locale} />
            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Meni"
              className="flex flex-col gap-[5px] border-2 border-ink bg-cream px-2.5 py-2.5 lg:hidden"
              style={{ borderRadius: "4px" }}
            >
              <span className="block h-0.5 w-[18px] bg-ink" />
              <span className="block h-0.5 w-[18px] bg-ink" />
              <span className="block h-0.5 w-[18px] bg-ink" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-5 py-5 text-cream lg:hidden">
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-white.png" alt="Svrčuge" style={{ height: "64px" }} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-2 border-cream px-3 py-1.5 text-cream text-base"
              style={{ fontFamily: "var(--font-zilla), Georgia, serif", borderRadius: "4px" }}
            >
              ✕
            </button>
          </div>

          <nav className="mt-6 flex flex-col overflow-y-auto">
            {mobileLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-cream transition hover:text-amber"
                style={{
                  fontFamily: "var(--font-alfa), Georgia, serif",
                  fontSize: "20px",
                  borderBottom: i < mobileLinks.length - 1 ? "1px dashed rgba(246,235,211,0.3)" : "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-wrap gap-2">
            {LOCALES.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                onClick={() => setOpen(false)}
                className={`border px-3 py-1 text-xs font-bold uppercase transition ${
                  loc === locale
                    ? "border-amber bg-amber text-ink"
                    : "border-cream/40 text-cream/75 hover:border-amber hover:text-amber"
                }`}
                style={{ borderRadius: "999px" }}
              >
                {LOCALE_LABELS[loc]}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-6 text-xs text-cream/50">
            Instagram @svrcuge.me · TikTok · {SOCIAL.email}
          </div>
        </div>
      )}
    </>
  );
}
