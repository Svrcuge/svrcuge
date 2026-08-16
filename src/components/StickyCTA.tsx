"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

// Sticky CTA dugme na dnu, vidljivo na mobilnom nakon malo skrolovanja.
export default function StickyCTA({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 bg-cream p-3 transition-transform duration-300 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link href={`/${locale}#prvi-krug`} className="btn-primary w-full">
        {dict.hero.ctaPrimary}
      </Link>
    </div>
  );
}
