"use client";

import { useState } from "react";

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "2px solid #E0A83A",
  borderRadius: "4px",
  fontSize: "14px",
  background: "#F6EBD3",
  color: "#452D18",
  fontFamily: "var(--font-zilla), Georgia, serif",
};

export default function VisitForm({ locale }: { locale: string }) {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          date: fd.get("date"),
          note: fd.get("note"),
          locale,
        }),
      });
    } catch {
      // ignore errors, show success anyway
    }
    setSent(true);
  }

  return (
    <div style={{ margin: "0 18px 26px", padding: "18px", background: "#452D18", color: "#F6EBD3", borderRadius: "6px" }}>
      <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", margin: "0 0 6px", textAlign: "center" }}>
        NAJAVI SVOJ DOLAZAK
      </div>
      <p style={{ fontSize: "13.5px", lineHeight: 1.55, margin: "0 0 14px", color: "#EFDFC0", textAlign: "center" }}>
        Ostavi podatke i javljamo ti se da dogovorimo dan, mještani vole goste.
      </p>
      {sent ? (
        <div style={{ textAlign: "center", padding: "14px", border: "2px solid #E0A83A", borderRadius: "4px", background: "rgba(224,168,58,.12)" }}>
          <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", color: "#E0A83A" }}>HVALA! VIDIMO SE U SELU.</div>
          <div style={{ fontSize: "13px", color: "#EFDFC0", marginTop: "4px" }}>Javljamo ti se uskoro da potvrdimo dan.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input name="name" required placeholder="Ime i prezime" style={INPUT_STYLE} />
          <input name="phone" placeholder="Broj telefona" style={INPUT_STYLE} />
          <input name="email" type="email" placeholder="Email adresa" style={INPUT_STYLE} />
          <input name="date" type="date" aria-label="Datum planiranog dolaska" style={{ ...INPUT_STYLE, minHeight: "47px" }} />
          <textarea name="note" placeholder="Komentar (koliko vas dolazi, pitanja…)" rows={3} style={{ ...INPUT_STYLE, resize: "vertical" }} />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              background: "#D96C2C",
              color: "#F6EBD3",
              border: "2px solid #E0A83A",
              borderRadius: "4px",
              fontFamily: "var(--font-alfa), Georgia, serif",
              fontSize: "13px",
              letterSpacing: ".06em",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            NAJAVLJUJEM DOLAZAK
          </button>
        </form>
      )}
    </div>
  );
}
