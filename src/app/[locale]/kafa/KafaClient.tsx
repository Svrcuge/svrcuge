"use client";
import { useState } from "react";
import Link from "next/link";

const ONCE_TIERS = [
  { amount: "€5", val: 5, name: "Kafa za selo", desc: "Simbolična kafa na budućoj konobi" },
  { amount: "€20", val: 20, name: "Sijalica", desc: "Dio rasvjete koja vraća svjetlo" },
  { amount: "€50", val: 50, name: "Klupa u selu", desc: "Mjesto za sjedenje i priču" },
  { amount: "€100", val: 100, name: "Prijatelj projekta", desc: "Veći korak za sljedeći projekat" },
];

const MONTHLY_TIERS = [
  { amount: "€5/mj", val: 5, name: "Kafa svakog mjeseca", desc: "Mala stalna podrška" },
  { amount: "€10/mj", val: 10, name: "Redovni prijatelj", desc: "Najdraža podrška: selo može da planira" },
  { amount: "€25/mj", val: 25, name: "Domaćin izdaleka", desc: "Ozbiljan oslonac projektima" },
  { amount: "€50/mj", val: 50, name: "Kum sela", desc: "Za one koji žele najviše da ponesu" },
];

export default function KafaClient({ locale }: { locale: string }) {
  const [mode, setMode] = useState<"once" | "monthly">("once");
  const [picked, setPicked] = useState(5);
  const [custom, setCustom] = useState("");
  const [pay, setPay] = useState<"card" | "slip">("card");

  const isMonthly = mode === "monthly";
  const tiers = isMonthly ? MONTHLY_TIERS : ONCE_TIERS;
  const customVal = parseInt(custom, 10);
  const activeVal = custom && customVal > 0 ? null : picked;
  const amount = activeVal === null ? customVal : picked;
  const summary = `€${amount}${isMonthly ? "/mj" : ""}`;
  const ctaLabel = pay === "slip" ? "PREUZMI UPLATNICU" : isMonthly ? "POSTAJEM REDOVNI PRIJATELJ" : "ČASTIM SELO";

  return (
    <>
      <div style={{ padding: "26px 18px 4px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#452D18" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
            <path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2" />
            <path d="M7.5 7c0-1 .8-1.2.8-2.2M11.5 7c0-1 .8-1.2.8-2.2" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "26px", lineHeight: 1.15, margin: "0 0 10px" }}>
          ČASTI SELO KAFOM
        </h1>
        <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 10px" }}>
          Svaki doprinos ide direktno na projekte sela: javno, uz fotografije i izvještaje. Tvoje ime staje na{" "}
          <Link href={`/${locale}/donatori`} style={{ color: "#A5551F" }}>zid prijatelja Svrčuga</Link>.
        </p>
      </div>

      <div style={{ margin: "20px 18px 14px", display: "flex", border: "2px solid #452D18", borderRadius: "6px", overflow: "hidden" }}>
        <button
          onClick={() => { setMode("once"); setPicked(5); setCustom(""); }}
          style={{
            flex: 1, padding: "12px", border: "none", cursor: "pointer",
            fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px", letterSpacing: ".04em",
            background: !isMonthly ? "#452D18" : "#F6EBD3",
            color: !isMonthly ? "#F6EBD3" : "#452D18",
          }}
        >
          JEDNOM
        </button>
        <button
          onClick={() => { setMode("monthly"); setPicked(10); setCustom(""); }}
          style={{
            flex: 1, padding: "12px", border: "none", borderLeft: "2px solid #452D18", cursor: "pointer",
            fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px", letterSpacing: ".04em",
            background: isMonthly ? "#452D18" : "#F6EBD3",
            color: isMonthly ? "#F6EBD3" : "#452D18",
          }}
        >
          SVAKI MJESEC
        </button>
      </div>

      {isMonthly && (
        <div style={{ margin: "0 18px 14px", border: "2px dashed #55704F", borderRadius: "6px", padding: "12px 14px", background: "#FBF3E0", fontSize: "13.5px", lineHeight: 1.55 }}>
          <strong style={{ color: "#55704F" }}>Redovni prijatelj sela.</strong> Mjesečna podrška znači da selo može da planira: struja za rasvjetu, održavanje, sljedeći projekat. Otkažeš kad hoćeš, jednim mailom.
        </div>
      )}

      <div style={{ margin: "0 18px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {tiers.map((t) => (
          <button
            key={t.val}
            onClick={() => { setPicked(t.val); setCustom(""); }}
            style={{
              textAlign: "left", cursor: "pointer",
              border: "2px solid #452D18", borderRadius: "6px", padding: "14px",
              background: activeVal === t.val ? "#E0A83A" : "#FBF3E0",
              color: "#452D18",
              fontFamily: "inherit",
              boxShadow: "3px 3px 0 rgba(69,45,24,.35)",
            }}
          >
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "20px" }}>{t.amount}</div>
            <div style={{ fontSize: "12.5px", fontWeight: 600, margin: "2px 0" }}>{t.name}</div>
            <div style={{ fontSize: "11.5px", lineHeight: 1.4, opacity: 0.85 }}>{t.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ margin: "0 18px 18px", display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: "13.5px", fontWeight: 600, flexShrink: 0 }}>Drugi iznos:</span>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="€"
          style={{
            flex: 1, minWidth: 0, padding: "11px 12px",
            border: "2px solid #452D18", borderRadius: "4px",
            fontSize: "14px", background: "#fff", color: "#452D18",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div style={{ margin: "0 18px 18px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "18px", background: "#FBF3E0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
          <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", color: "#A5551F" }}>TVOJA PODRŠKA</span>
          <span style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "22px" }}>{summary}</span>
        </div>
        <input
          placeholder="Ime i prezime (za zid prijatelja)"
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "2px solid #452D18", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#452D18", fontFamily: "inherit", marginBottom: "8px", display: "block" }}
        />
        <input
          placeholder="Tvoj email"
          type="email"
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "2px solid #452D18", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#452D18", fontFamily: "inherit", marginBottom: "8px", display: "block" }}
        />
        <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "12.5px", lineHeight: 1.5, marginBottom: "12px", cursor: "pointer" }}>
          <input type="checkbox" defaultChecked style={{ margin: "3px 0 0" }} />
          Želim da moje ime bude na javnom zidu prijatelja Svrčuga
        </label>
        <div style={{ fontSize: "12px", letterSpacing: ".14em", fontWeight: 600, color: "#A5551F", marginBottom: "8px" }}>NAČIN PLAĆANJA</div>
        <div style={{ display: "flex", border: "2px solid #452D18", borderRadius: "4px", overflow: "hidden", marginBottom: "12px" }}>
          <button
            onClick={() => setPay("card")}
            style={{
              flex: 1, padding: "11px", border: "none", cursor: "pointer",
              fontSize: "13.5px", fontWeight: 600, fontFamily: "inherit",
              background: pay === "card" ? "#452D18" : "#FBF3E0",
              color: pay === "card" ? "#F6EBD3" : "#452D18",
            }}
          >
            Kartica
          </button>
          <button
            onClick={() => setPay("slip")}
            style={{
              flex: 1, padding: "11px", border: "none", borderLeft: "2px solid #452D18", cursor: "pointer",
              fontSize: "13.5px", fontWeight: 600, fontFamily: "inherit",
              background: pay === "slip" ? "#452D18" : "#FBF3E0",
              color: pay === "slip" ? "#F6EBD3" : "#452D18",
            }}
          >
            Uplata na račun
          </button>
        </div>
        {pay === "slip" && (
          <div style={{ border: "2px solid #452D18", borderRadius: "4px", background: "#fff", padding: "14px", marginBottom: "12px" }}>
            <div style={{ fontSize: "11px", letterSpacing: ".14em", fontWeight: 600, color: "#A5551F", marginBottom: "8px" }}>UPLATNICA</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13.5px", lineHeight: 1.4 }}>
              {[
                ["Primalac", "Mjesna zajednica, za selo Svrčuge"],
                ["Žiro račun", "XXX-XXXXXXXXXX-XX"],
                ["Svrha uplate", "Podrška projektima sela Svrčuge"],
                ["Iznos", summary],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                  <span style={{ color: "#7a5b3d" }}>{label}</span>
                  <strong style={{ textAlign: "right" }}>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          style={{
            width: "100%", padding: "14px",
            background: "#D96C2C", color: "#F6EBD3",
            border: "2px solid #452D18", borderRadius: "4px",
            fontFamily: "var(--font-alfa), Georgia, serif",
            fontSize: "14px", letterSpacing: ".06em", cursor: "pointer",
          }}
        >
          {ctaLabel}
        </button>
        <div style={{ fontSize: "12px", color: "#7a5b3d", marginTop: "8px", textAlign: "center" }}>
          {pay === "slip"
            ? "Preuzmi uplatnicu i plati u banci ili aplikaciji. Ime šalješ na email da ga dodamo na zid."
            : "Sigurno plaćanje karticom."}
        </div>
      </div>

      <div style={{ margin: "0 18px 26px", border: "2px solid #452D18", borderRadius: "6px", padding: "16px", background: "#FBF3E0" }}>
        <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "14px", marginBottom: "8px" }}>NA ŠTA IDE NOVAC?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", fontSize: "13.5px", lineHeight: 1.5 }}>
          {[
            "Isključivo na projekte sela: rasvjeta, pa dalje redom",
            "Svaki trošak javno objavljen, uz fotografije",
            "Redovni izvještaji svim prijateljima sela",
          ].map((item) => (
            <div key={item} style={{ display: "flex", gap: "8px" }}>
              <span style={{ color: "#55704F", fontWeight: 600 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
