import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";
import { SOCIAL } from "@/lib/config";

export default function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.footer;
  const n = dict.nav;
  const home = `/${locale}`;

  const links = [
    { href: `${home}/prica`, label: n.story },
    { href: `${home}/donatori`, label: n.friends },
    { href: `${home}/mediji`, label: n.media },
    { href: `${home}/novosti`, label: n.news },
    { href: `${home}/dogadjaji`, label: n.events },
    { href: `${home}/istorija`, label: n.history },
    { href: `${home}/posjeti`, label: n.visit },
    { href: `${home}/knjiga`, label: n.guestbook },
    { href: `${home}/prodavnica`, label: n.shop },
    { href: `${home}/privatnost`, label: f.privacy },
    { href: `${home}/uslovi`, label: f.terms },
  ];

  return (
    <footer style={{ padding: "20px 18px", borderTop: "3px double #452D18", background: "#EFDFC0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/logo-black.png" alt="Svrčuge" style={{ height: "80px", margin: "0 auto 12px", display: "block" }} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 16px", fontSize: "13px", marginBottom: "12px" }}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} style={{ color: "#452D18", textDecoration: "none" }}>
            {l.label}
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        {LOCALES.map((loc) => (
          <Link
            key={loc}
            href={`/${loc}`}
            style={{
              border: "1.5px solid #452D18",
              borderRadius: "999px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 600,
              textDecoration: "none",
              ...(loc === locale
                ? { background: "#452D18", color: "#F6EBD3" }
                : { background: "transparent", color: "#452D18" }),
            }}
          >
            {LOCALE_LABELS[loc]}
          </Link>
        ))}
      </div>
      <div style={{ fontSize: "12px", color: "#7a5b3d", textAlign: "center" }}>
        <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>Instagram @svrcuge.me</a>
        {" · "}
        <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>TikTok</a>
        <br />
        <a href={`mailto:${SOCIAL.email}`} style={{ color: "inherit" }}>{SOCIAL.email}</a>
        <br />
        Svrčuge · Crna Gora
      </div>
      <div style={{ fontSize: "10px", color: "#C0A882", textAlign: "center", marginTop: "10px", letterSpacing: ".06em" }}>
        v{process.env.BUILD_ID ?? "dev"}
      </div>
    </footer>
  );
}
