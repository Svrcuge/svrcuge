"use client";

import { useEffect, useState } from "react";

const INITIAL_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";
const POLL_MS = 5 * 60 * 1000; // 5 minuta

export default function NewVersionBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/build-id", { cache: "no-store" });
        const { id } = await res.json();
        if (id !== INITIAL_ID && id !== "dev" && INITIAL_ID !== "dev") {
          setShow(true);
        }
      } catch {
        // tiho — ne pokazuj grešku korisniku
      }
    };

    const timer = setInterval(check, POLL_MS);
    return () => clearInterval(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "#55704F",
        color: "#F6EBD3",
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        borderBottom: "2px solid #452D18",
      }}
    >
      <span style={{ fontSize: "13.5px", fontWeight: 600 }}>
        Nova verzija sajta je dostupna.
      </span>
      <button
        onClick={() => window.location.reload()}
        style={{
          flexShrink: 0,
          padding: "7px 14px",
          background: "#F6EBD3",
          color: "#452D18",
          border: "2px solid #452D18",
          borderRadius: "4px",
          fontFamily: "var(--font-alfa), Georgia, serif",
          fontSize: "12px",
          letterSpacing: ".04em",
          cursor: "pointer",
        }}
      >
        OSVJEŽI
      </button>
    </div>
  );
}
