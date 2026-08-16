import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = getDictionary(locale).kafaPage;
  return { title: `${p.title} — Svrčuge` };
}

export default async function KafaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.kafaPage;

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero */}
        <div
          className="py-16 px-5 text-center"
          style={{ background: "#452D18", borderBottom: "3px double #C0A882" }}
        >
          <div className="eyebrow !text-amber mb-3">✦ {p.eyebrow}</div>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">{p.title}</h1>
          <p className="mt-4 max-w-xl mx-auto text-cream/75 leading-relaxed">
            {p.intro}{" "}
            <Link href={`/${locale}/donatori`} className="text-amber hover:underline font-semibold">
              {p.friendsLink}
            </Link>
            .
          </p>
        </div>

        {/* Iznosi */}
        <section className="py-14 border-t-2 border-line" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-2xl">
            {/* Jednom / Mjesečno */}
            <div className="mb-8 border-2 border-ink bg-sand p-5" style={{ borderRadius: "6px" }}>
              <h2 className="font-display text-xl font-bold text-ink mb-1">{p.monthlyLabel}</h2>
              <p className="text-muted text-sm">{p.monthlyText}</p>
            </div>

            {/* Opcije iznosa */}
            <div className="grid gap-3 sm:grid-cols-2">
              {p.amountOptions.map((opt, i) => (
                <div
                  key={i}
                  className="border-2 border-ink bg-cream p-4 cursor-pointer hover:bg-sand transition"
                  style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
                >
                  <div
                    className="text-3xl font-bold text-amber-deep mb-1"
                    style={{ fontFamily: "var(--font-alfa), Georgia, serif" }}
                  >
                    {opt.amount}
                  </div>
                  <div className="font-bold text-ink">{opt.name}</div>
                  <div className="text-xs text-muted">{opt.desc}</div>
                </div>
              ))}
            </div>

            {/* Javni zid */}
            <div className="mt-6 flex items-start gap-3 text-sm text-ink/80">
              <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 flex-none accent-amber" />
              <span>{p.publicWall}</span>
            </div>
          </div>
        </section>

        {/* Način plaćanja */}
        <section className="py-12 border-t-2 border-line bg-sand">
          <div className="container-content max-w-2xl">
            <h2 className="font-display text-xl font-bold text-ink mb-6">{p.paymentTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Kartica */}
              <div className="border-2 border-ink bg-cream p-5" style={{ borderRadius: "6px" }}>
                <h3 className="font-bold text-ink mb-2">{p.payCard}</h3>
                <p className="text-xs text-muted">Stripe — dostupno uskoro</p>
                <button disabled className="btn-primary mt-3 opacity-50 cursor-not-allowed w-full">
                  {p.payCard}
                </button>
              </div>

              {/* Uplata */}
              <div className="border-2 border-ink bg-cream p-5" style={{ borderRadius: "6px" }}>
                <h3 className="font-bold text-ink mb-3">{p.transferTitle}</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-muted">{p.transferRecipient}</dt>
                    <dd className="font-semibold text-ink">{p.transferRecipientValue}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-muted">{p.transferAccount}</dt>
                    <dd className="font-mono font-semibold text-ink">{p.transferAccountValue}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-widest text-muted">{p.transferPurpose}</dt>
                    <dd className="font-semibold text-ink">{p.transferPurposeValue}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Na šta ide novac */}
        <section className="py-12 border-t-2 border-line" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-xl">
            <h2 className="font-display text-xl font-bold text-ink mb-4">{p.spendingTitle}</h2>
            <ul className="space-y-2">
              {p.spendingItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-ink/80">
                  <span className="text-forest font-bold flex-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="container-content py-6 text-center">
          <Link href={`/${locale}`} className="text-sm font-bold text-amber-deep hover:underline">
            ← {p.back}
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
