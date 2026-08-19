import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  return (
    <section>
      {/* Hero card — dhero splits to 3:2 columns on desktop */}
      <div style={{ margin: "18px", border: "2px solid #452D18", borderRadius: "6px", padding: "6px", background: "#EFDFC0" }}>
        <div className="dhero" style={{ border: "1px dashed #452D18", borderRadius: "3px", overflow: "hidden" }}>
          {/* Photo — dimg grows to 460px on desktop */}
          <div className="dimg" style={{ width: "100%", height: "300px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/hero.webp"
              alt={h.mapCaption}
              fetchPriority="high"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Orange banner */}
          <div style={{ textAlign: "center", padding: "16px 14px 18px", background: "#D96C2C", color: "#F6EBD3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/logo-white.png" alt="Svrčuge" style={{ height: "96px", display: "block", margin: "0 auto 4px" }} />
            <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600 }}>SELO U ZALEĐU HERCEG NOVOG</div>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "30px", lineHeight: 1.12, margin: "6px 0 4px" }}>
              OD SVJETLA<br />DO ŽIVOTA
            </div>
            <div style={{ fontSize: "12.5px", letterSpacing: ".08em" }}>SELO KOJE SE BUDI IZ ZABORAVA</div>
          </div>
        </div>
      </div>

      {/* Intro + Jovica — drow2 dr32 puts them side by side (3:2) on desktop */}
      <div className="drow2 dr32" style={{ display: "contents" }}>
        {/* dstack: intro text + stat chips stacked in left column on desktop */}
        <div className="dstack" style={{ display: "contents" }}>
          <div style={{ padding: "4px 18px 8px" }}>
            <p style={{ fontSize: "15px", lineHeight: 1.65, margin: 0 }}>
              Svrčuge su selo u zelenom zaleđu Boke: <strong>14 km od Herceg Novog, 29 km od Trebinja</strong>. Nekad puno života, danas broji svega petoro mještana. Ali selo je odlučilo da ne nestane: prvo se vraća <strong>svjetlo</strong>, pa onda sve ostalo.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", margin: "16px 18px 22px" }}>
            <div style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "9px 11px", background: "#E0A83A", transform: "rotate(-2deg)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>14 km</div>
              <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>od Herceg Novog</div>
            </div>
            <div style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "9px 11px", background: "#F6EBD3", transform: "rotate(1.5deg)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>5</div>
              <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>mještana</div>
            </div>
            <div style={{ border: "2px solid #452D18", borderRadius: "4px", padding: "9px 11px", background: "#55704F", color: "#F6EBD3", transform: "rotate(-1deg)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px" }}>2026</div>
              <div style={{ fontSize: "9.5px", letterSpacing: ".1em", fontWeight: 600, textTransform: "uppercase" }}>prvo svjetlo</div>
            </div>
          </div>
        </div>

        {/* Jovica card */}
        <div style={{ margin: "0 18px 22px", border: "2px solid #452D18", borderRadius: "6px", background: "#FBF3E0", padding: "16px", display: "flex", gap: "14px", alignItems: "flex-start", boxShadow: "3px 3px 0 rgba(69,45,24,.35)" }}>
          <div style={{ width: "74px", height: "74px", flexShrink: 0, border: "2px solid #452D18", borderRadius: "50%", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/putnici/01.webp" alt={h.jovicaName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontSize: "10.5px", letterSpacing: ".16em", fontWeight: 600, color: "#A5551F", textTransform: "uppercase" }}>{h.jovicaLabel}</div>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "17px", margin: "2px 0 4px" }}>{h.jovicaName}</div>
            <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: 0 }}>{h.jovicaText}</p>
            <Link href={`/${locale}/prica`} style={{ fontSize: "12.5px", display: "inline-block", marginTop: "6px" }}>
              {h.jovicaLink}
            </Link>
          </div>
        </div>
      </div>

      {/* Polaroid photo strip */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", margin: "0 18px 24px" }}>
        <div style={{ background: "#fff", border: "1px solid #d8c9a8", padding: "7px 7px 22px", boxShadow: "0 3px 10px rgba(69,45,24,.22)", transform: "rotate(-2.5deg)" }}>
          <div style={{ width: "150px", height: "120px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/story.webp" alt="Kamena kuća" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d8c9a8", padding: "7px 7px 22px", boxShadow: "0 3px 10px rgba(69,45,24,.22)", transform: "rotate(1.5deg)" }}>
          <div style={{ width: "150px", height: "120px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/illustrations/vision.webp" alt="Zelenilo i staze" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #d8c9a8", padding: "7px 7px 22px", boxShadow: "0 3px 10px rgba(69,45,24,.22)", transform: "rotate(2.5deg)" }}>
          <div style={{ width: "150px", height: "120px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/putnici/02.webp" alt="Mještani" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
