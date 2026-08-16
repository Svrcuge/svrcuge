"use client";

import { useState, useRef } from "react";
import type { Dictionary } from "@/lib/i18n";

export default function IdentityCardDownload({ dict }: { dict: Dictionary }) {
  const id = dict.identityCard;
  const card = id.card;
  const [name, setName] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  function hashNumber(s: string): string {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffffff;
    return String((Math.abs(h) % 9000) + 1000);
  }

  function downloadCard() {
    const displayName = name.trim() || "—";
    const num = name.trim() ? hashNumber(name.trim()) : "—";
    const W = 1120, H = 706;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d")!;

    // background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#1A1207");
    bg.addColorStop(1, "#5A4327");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // decorative star
    ctx.font = "380px Georgia";
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.fillText("✦", W * 0.58, H * 0.52);

    // top-left brand
    ctx.font = "bold 38px Georgia";
    ctx.fillStyle = "#D4A843";
    ctx.textAlign = "left";
    ctx.fillText("Svrčuge", 52, 76);

    // top-right label
    ctx.font = "22px Georgia";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.textAlign = "right";
    ctx.fillText(card.heading, W - 52, 76);

    // divider line
    ctx.strokeStyle = "rgba(212,168,67,0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(52, 100); ctx.lineTo(W - 52, 100);
    ctx.stroke();

    // name label
    ctx.font = "20px system-ui";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.textAlign = "left";
    ctx.fillText(id.nameLabel.toUpperCase(), 52, 240);

    // name value
    ctx.font = `bold ${displayName.length > 22 ? 42 : 54}px Georgia`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(displayName, 52, 320);

    // status label + value
    ctx.font = "18px system-ui";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillText(card.statusLabel.toUpperCase(), 52, 440);
    ctx.font = "bold 26px system-ui";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(card.statusValue ?? "Prijatelj Svrčuga", 52, 476);

    // number label + value
    ctx.font = "18px system-ui";
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.textAlign = "right";
    ctx.fillText(card.numberLabel.toUpperCase(), 560, 440);
    ctx.font = "bold 26px system-ui";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(num ? `#${num}` : card.number, 560, 476);

    // stamp circle
    ctx.beginPath();
    ctx.arc(W - 110, H - 110, 78, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212,168,67,0.55)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.font = "bold 20px system-ui";
    ctx.fillStyle = "#D4A843";
    ctx.textAlign = "center";
    ctx.fillText("SVRČUGE", W - 110, H - 118);
    ctx.fillText("2026", W - 110, H - 90);

    // QR placeholder box
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillRect(W - 64 - 10, H - 64 - 20, 64, 64);
    ctx.font = "bold 32px monospace";
    ctx.fillStyle = "#1A1207";
    ctx.textAlign = "center";
    ctx.fillText("▦", W - 10 - 32 + 32, H - 20 - 10);

    // bottom watermark
    ctx.font = "15px system-ui";
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.textAlign = "left";
    ctx.fillText("svrcuge.me", 52, H - 24);

    const a = document.createElement("a");
    a.download = `svrcuge-karta-${displayName.replace(/\s+/g, "-").toLowerCase()}.png`;
    a.href = c.toDataURL("image/png");
    a.click();
  }

  const displayName = name.trim() || "___";
  const num = name.trim() ? hashNumber(name.trim()) : card.number;

  return (
    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
      {/* Live preview */}
      <div className="mx-auto w-full max-w-md" ref={cardRef}>
        <div className="relative aspect-[1.586/1] overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-[#5A4327] p-6 text-cream shadow-soft">
          <div className="pointer-events-none absolute -right-6 -top-8 text-[9rem] opacity-10">✦</div>
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold uppercase tracking-widest text-amber">Svrčuge</span>
            <span className="text-xs text-cream/70">{card.heading}</span>
          </div>
          <div className="mt-6">
            <div className="text-xs uppercase tracking-wide text-cream/60">{id.nameLabel}</div>
            <div className={`font-display font-bold transition-all ${name ? "text-2xl text-cream" : "text-xl text-cream/30"}`}>
              {name || id.namePlaceholder}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-cream/60">{card.statusLabel}</div>
              <div className="font-semibold">{card.statusValue ?? "Prijatelj Svrčuga"}</div>
            </div>
            <div>
              <div className="text-cream/60">{card.numberLabel}</div>
              <div className="font-semibold">#{num}</div>
            </div>
          </div>
          <div className="absolute bottom-5 right-6 flex items-center gap-2">
            <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-amber/60 text-center text-[8px] font-bold leading-tight text-amber">
              {card.stamp}
            </span>
            <span className="grid h-10 w-10 place-items-center rounded bg-cream/90 text-ink">▦</span>
          </div>
        </div>
      </div>

      {/* Input + download */}
      <div className="flex flex-col justify-center">
        <div>
          <label className="mb-2 block text-sm font-semibold text-ink">{id.nameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={id.namePlaceholder}
            maxLength={40}
            className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-amber focus:ring-2 focus:ring-amber/30"
          />
        </div>
        <button
          onClick={downloadCard}
          className="btn-primary mt-6 w-full"
        >
          ↓ {id.downloadCta}
        </button>
        <p className="mt-3 text-center text-xs text-muted">{id.downloadNote}</p>

        {/* Tiers */}
        <div className="mt-8">
          <h3 className="font-display text-lg font-bold text-ink">{id.tiersTitle}</h3>
          <ul className="mt-3 space-y-2">
            {id.tiers.map((t, i) => (
              <li key={i} className="flex items-center justify-between rounded-2xl border border-line bg-white/70 px-4 py-2.5">
                <span className="font-display text-lg font-bold text-amber-deep">{t.amount}</span>
                <span className="font-semibold text-ink/80">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
