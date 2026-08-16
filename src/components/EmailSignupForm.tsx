"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function EmailSignupForm({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const router = useRouter();
  const f = dict.form;
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  const INPUT_STYLE: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    border: "2px solid #452D18",
    borderRadius: "4px",
    fontSize: "14px",
    background: "#fff",
    color: "#452D18",
    fontFamily: "inherit",
    marginBottom: "8px",
    display: "block",
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const fd = new FormData(e.currentTarget);
    if (fd.get("consentGdpr") !== "on") {
      setState("error");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "prelaunch",
          email: fd.get("email"),
          language: locale,
          consentCampaign: true,
          consentGdpr: true,
        }),
      });
      if (!res.ok) {
        setState("error");
        return;
      }
      router.push(`/${locale}/hvala`);
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        required
        placeholder={f.emailPlaceholder}
        autoComplete="email"
        style={INPUT_STYLE}
      />
      <label style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "12.5px", lineHeight: 1.5, marginBottom: "12px", cursor: "pointer" }}>
        <input type="checkbox" name="consentGdpr" style={{ margin: "3px 0 0", flexShrink: 0 }} required />
        {f.consentGdpr}
      </label>
      {state === "error" && (
        <p style={{ fontSize: "13px", color: "#A5551F", marginBottom: "8px" }}>{f.error}</p>
      )}
      <button
        type="submit"
        disabled={state === "loading"}
        style={{
          width: "100%",
          padding: "13px",
          background: "#452D18",
          color: "#F6EBD3",
          border: "none",
          borderRadius: "4px",
          fontFamily: "var(--font-alfa), Georgia, serif",
          fontSize: "13px",
          letterSpacing: ".06em",
          cursor: "pointer",
        }}
      >
        {state === "loading" ? f.submitting : f.submit}
      </button>
    </form>
  );
}
