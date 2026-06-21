"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

export default function ShareButtons({ dict, url }: { dict: Dictionary; url: string }) {
  const s = dict.share;
  const msg = dict.thankYou.shareMessage;
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const links = [
    { label: s.facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: s.whatsapp, href: `https://wa.me/?text=${enc(`${msg} ${url}`)}` },
    { label: s.viber, href: `viber://forward?text=${enc(`${msg} ${url}`)}` },
    { label: s.twitter, href: `https://twitter.com/intent/tweet?text=${enc(msg)}&url=${enc(url)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line bg-white/80 px-5 py-2.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-white"
        >
          {l.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-amber-deep"
      >
        {copied ? s.copied : s.copy}
      </button>
    </div>
  );
}
