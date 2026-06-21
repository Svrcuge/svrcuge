"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { IconMenu, IconClose } from "./Icons";

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;

  const links = [
    { href: `${home}/prica`, label: dict.nav.story },
    { href: `${home}#plan`, label: dict.nav.plan },
    { href: `${home}#prvi-krug`, label: dict.nav.firstCircle },
    { href: `${home}/mediji`, label: dict.media.navLabel },
    { href: `${home}#partneri`, label: dict.nav.partners },
    { href: `${home}#transparentnost`, label: dict.nav.transparency },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md">
      <div className="container-content flex items-center justify-between gap-4 py-3">
        <Link href={home} className="flex items-center gap-2 font-display text-xl font-extrabold text-ink">
          <span className="flex h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-amber p-0.5 shadow-glow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-black.png" alt="Svrčuge" className="h-full w-full object-contain" />
          </span>
          Svrčuge
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-semibold text-ink/80 transition hover:text-amber-deep">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <Link href={`${home}#prvi-krug`} className="hidden btn-primary !px-5 !py-2.5 !text-sm sm:inline-flex">
            {dict.nav.follow}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Meni"
          >
            {open ? <IconClose width={22} height={22} /> : <IconMenu width={22} height={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-cream lg:hidden">
          <div className="container-content flex flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-base font-semibold text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link href={`${home}#prvi-krug`} onClick={() => setOpen(false)} className="btn-primary mt-4">
              {dict.nav.follow}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
