import type { Dictionary, Locale } from "@/lib/i18n";
import PartnerForm from "./PartnerForm";

export default function PartnerSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = dict.partners;
  return (
    <section id="partneri" className="section">
      <div className="container-content grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow mb-4">✦ {dict.nav.partners}</span>
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{p.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{p.text}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.groups.map((g) => (
              <li key={g} className="rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-semibold text-ink/80">
                {g}
              </li>
            ))}
          </ul>
        </div>
        <PartnerForm dict={dict} locale={locale} />
      </div>
    </section>
  );
}
