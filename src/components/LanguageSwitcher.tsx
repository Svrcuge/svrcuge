"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale, isLocale } from "@/lib/i18n";
import { IconGlobe } from "./Icons";

// Zamjenjuje jezički prefiks u trenutnoj putanji (/me/... → /en/...)
function swapLocale(pathname: string, target: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && isLocale(parts[0])) {
    parts[0] = target;
  } else {
    parts.unshift(target);
  }
  return "/" + parts.join("/");
}

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || `/${current}`;
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Jezik / Language"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-2 text-sm font-bold text-ink transition hover:bg-white"
      >
        <IconGlobe width={18} height={18} />
        {LOCALE_LABELS[current]}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul className="absolute right-0 z-20 mt-2 w-32 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
            {LOCALES.map((loc) => (
              <li key={loc}>
                <Link
                  href={swapLocale(pathname, loc)}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-semibold transition hover:bg-sand ${
                    loc === current ? "bg-amber/15 text-amber-deep" : "text-ink"
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
