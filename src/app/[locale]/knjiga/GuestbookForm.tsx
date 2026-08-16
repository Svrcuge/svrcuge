"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

type Entry = { name: string; from: string; text: string; when: string };

const SAMPLE: Entry[] = [
  { name: "Milena", from: "Toronto", text: "Selo mog đeda. Plakala sam kad sam vidjela snimak iz Pariza. Doći ćemo ljetos!", when: "avgust 2026." },
  { name: "Stefan", from: "Beograd", text: "Bravo ljudi! Kafa je uplaćena, čekam da je popijem u konobi.", when: "jul 2026." },
  { name: "Jean-Marc", from: "Pariz", text: "Vive Svrčuge! On vous attend à Paris.", when: "jun 2026." },
  { name: "Ana", from: "Herceg Novi", text: "Ovakve priče drže Boku živom. Svaka čast Jovici i posadi.", when: "jun 2026." },
];

const TILTS = ["-0.6deg", "0.6deg", "-0.3deg", "0.3deg"];

export default function GuestbookForm({ dict }: { dict: Dictionary }) {
  const p = dict.guestbookPage;
  const [entries, setEntries] = useState<Entry[]>(SAMPLE);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("");

  function handleSend() {
    if (!msg.trim()) return;
    const who = [name.trim() || "Gost", from.trim()].filter(Boolean).join(", ");
    setEntries((prev) => [{ name: who, from: "", text: msg.trim(), when: "danas" }, ...prev]);
    setSent(true);
  }

  return (
    <>
      <div style={{ margin: "20px 18px 22px", border: "2px dashed #A5551F", borderRadius: "6px", padding: "18px", background: "#FBF3E0" }}>
        {!sent ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={p.namePlaceholder}
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "2px solid #452D18", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#452D18", fontFamily: "inherit", marginBottom: "8px", display: "block" }}
            />
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Odakle si"
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "2px solid #452D18", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#452D18", fontFamily: "inherit", marginBottom: "8px", display: "block" }}
            />
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={p.textPlaceholder}
              rows={4}
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", border: "2px solid #452D18", borderRadius: "4px", fontSize: "14px", background: "#fff", color: "#452D18", fontFamily: "inherit", marginBottom: "8px", resize: "vertical", display: "block" }}
            />
            <button
              onClick={handleSend}
              style={{ width: "100%", padding: "13px", background: "#452D18", color: "#F6EBD3", border: "none", borderRadius: "4px", fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "13px", letterSpacing: ".06em", cursor: "pointer" }}
            >
              {p.submitLabel}
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "10px", border: "2px solid #55704F", borderRadius: "4px", background: "#fff" }}>
            <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "15px", color: "#55704F" }}>HVALA NA PORUCI!</div>
            <div style={{ fontSize: "13px", color: "#7a5b3d", marginTop: "4px" }}>Tvoja poruka je upisana ispod.</div>
          </div>
        )}
      </div>

      <div style={{ margin: "0 18px 26px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {entries.map((e, i) => (
          <div
            key={i}
            style={{
              border: "2px solid #452D18", borderRadius: "6px", background: "#FBF3E0",
              padding: "14px", boxShadow: "3px 3px 0 rgba(69,45,24,.35)",
              transform: TILTS[i % TILTS.length],
            }}
          >
            <p style={{ fontSize: "14px", lineHeight: 1.6, margin: "0 0 8px", fontStyle: "italic" }}>„{e.text}"</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#A5551F", fontWeight: 600 }}>
              <span>{e.name}{e.from ? `, ${e.from}` : ""}</span>
              <span>{e.when}</span>
            </div>
          </div>
        ))}
        <div style={{ fontSize: "12px", color: "#7a5b3d", textAlign: "center" }}>Prve poruke su primjer, nestaju čim stignu prave.</div>
      </div>
    </>
  );
}
