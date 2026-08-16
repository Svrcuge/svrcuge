"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_LABELS, type Locale, isLocale } from "@/lib/i18n";

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
        className="flex items-center gap-1 border-2 border-ink bg-cream px-2.5 py-1.5 text-xs font-bold text-ink transition hover:bg-sand"
        style={{ borderRadius: "4px", fontFamily: "var(--font-zilla), Georgia, serif" }}
      >
        {LOCALE_LABELS[current]} ▾
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <ul
            className="absolute right-0 z-20 mt-1.5 w-36 overflow-hidden border-2 border-ink bg-cream"
            style={{ borderRadius: "4px", boxShadow: "3px 3px 0 rgba(69,45,24,.30)" }}
          >
            {LOCALES.map((loc, i) => (
              <li key={loc}>
                <Link
                  href={swapLocale(pathname, loc)}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 text-sm font-semibold transition hover:bg-sand ${
                    loc === current ? "bg-ink text-cream" : "text-ink"
                  } ${i > 0 ? "border-t border-line" : ""}`}
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
