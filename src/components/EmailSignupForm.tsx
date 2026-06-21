"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";

type Variant = "hero" | "first-circle";

export default function EmailSignupForm({
  dict,
  locale,
  variant = "hero",
}: {
  dict: Dictionary;
  locale: Locale;
  variant?: Variant;
}) {
  const router = useRouter();
  const f = dict.form;
  const isCircle = variant === "first-circle";

  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorKey, setErrorKey] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorKey("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      type: isCircle ? "first-circle" : "prelaunch",
      name: fd.get("name") || undefined,
      email: fd.get("email"),
      city: fd.get("city") || undefined,
      country: fd.get("country") || undefined,
      language: fd.get("language") || locale,
      consentCampaign: fd.get("consentCampaign") === "on",
      consentFirstCircle: isCircle ? fd.get("consentFirstCircle") === "on" : true,
      consentShare: fd.get("consentShare") === "on",
      consentGdpr: fd.get("consentGdpr") === "on",
    };

    if (!payload.consentGdpr) {
      setState("error");
      setErrorKey("errorConsent");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setState("error");
        setErrorKey(data.error === "invalid_email" ? "errorEmail" : "error");
        return;
      }
      router.push(`/${locale}/hvala`);
    } catch {
      setState("error");
      setErrorKey("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={isCircle ? "" : "sm:col-span-2"}>
          <label className="label" htmlFor={`name-${variant}`}>
            {f.name} <span className="font-normal text-muted">({f.optional})</span>
          </label>
          <input id={`name-${variant}`} name="name" className="input" placeholder={f.namePlaceholder} autoComplete="name" />
        </div>
        <div className={isCircle ? "" : "sm:col-span-2"}>
          <label className="label" htmlFor={`email-${variant}`}>
            {f.email}
          </label>
          <input
            id={`email-${variant}`}
            name="email"
            type="email"
            required
            className="input"
            placeholder={f.emailPlaceholder}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor={`city-${variant}`}>
            {f.city} <span className="font-normal text-muted">({f.optional})</span>
          </label>
          <input id={`city-${variant}`} name="city" className="input" placeholder={f.cityPlaceholder} />
        </div>
        <div>
          <label className="label" htmlFor={`country-${variant}`}>
            {f.country} <span className="font-normal text-muted">({f.optional})</span>
          </label>
          <input id={`country-${variant}`} name="country" className="input" placeholder={f.countryPlaceholder} />
        </div>
      </div>

      <div>
        <label className="label" htmlFor={`language-${variant}`}>
          {f.language}
        </label>
        <select id={`language-${variant}`} name="language" defaultValue={locale} className="select">
          {LOCALES.map((loc) => (
            <option key={loc} value={loc}>
              {LOCALE_LABELS[loc]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2.5 rounded-2xl bg-sand/60 p-4">
        {isCircle && (
          <>
            <Checkbox name="consentCampaign" defaultChecked label={f.consentCampaign} />
            <Checkbox name="consentFirstCircle" defaultChecked label={f.consentFirstCircle} />
            <Checkbox name="consentShare" label={f.consentShare} />
          </>
        )}
        {!isCircle && <Checkbox name="consentCampaign" defaultChecked label={f.consentCampaign} />}
        <Checkbox name="consentGdpr" label={f.consentGdpr} />
      </div>

      {state === "error" && (
        <p className="rounded-2xl bg-terracotta/10 px-4 py-3 text-sm font-semibold text-terracotta">
          {(f as Record<string, string>)[errorKey] || f.error}
        </p>
      )}

      <button type="submit" disabled={state === "loading"} className="btn-primary w-full">
        {state === "loading" ? f.submitting : isCircle ? f.submitFirstCircle : f.submit}
      </button>

      <p className="text-center text-xs text-muted">{f.privacyNote}</p>
    </form>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/85">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-amber"
      />
      <span>{label}</span>
    </label>
  );
}
