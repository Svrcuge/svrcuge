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
  const p = getDictionary(locale).eventsPage;
  return { title: `${p.title} — Svrčuge` };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.eventsPage;
  const events = dict.events.items;

  const FULL_EVENTS = [
    {
      ...events[0],
      bg: "#E0A83A",
      fg: "#452D18",
      tilt: "-2deg",
      desc: "Ispraćamo raspust filmom pod vedrim nebom. Ponesite ćebe, kokice su na selu!",
    },
    {
      ...events[1],
      bg: "#D96C2C",
      fg: "#F6EBD3",
      tilt: "2deg",
      desc: "Ljeto ispraćamo tamo gdje je najljepše. Muzika, roštilj i selo puno ljudi, kao nekad.",
    },
  ];

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
          <p className="mt-4 max-w-xl mx-auto text-cream/75">{p.intro}</p>
        </div>

        {/* Događaji */}
        <section className="py-14" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-2xl space-y-6">
            {FULL_EVENTS.map((ev, i) => (
              <div
                key={i}
                className="border-2 border-ink overflow-hidden"
                style={{
                  borderRadius: "6px",
                  boxShadow: `4px 4px 0 rgba(69,45,24,0.25)`,
                  transform: `rotate(${ev.tilt})`,
                }}
              >
                <div
                  className="px-6 py-5"
                  style={{ background: ev.bg, color: ev.fg }}
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-75 mb-1">{ev.month}</div>
                  <div
                    className="text-3xl font-bold leading-none mb-1"
                    style={{ fontFamily: "var(--font-alfa), Georgia, serif" }}
                  >
                    {ev.day} {ev.title}
                  </div>
                  <div className="text-sm font-semibold opacity-80">{ev.sub}</div>
                </div>
                <div className="bg-sand px-6 py-4 border-t-2 border-ink">
                  <p className="text-ink/80 leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ne propusti */}
        <section className="py-12 border-t-2 border-line">
          <div className="container-content text-center max-w-lg">
            <h2 className="font-display text-2xl font-bold text-ink mb-2">{p.notifyTitle}</h2>
            <p className="text-muted mb-5">{p.notifyText}</p>
            <Link href={`/${locale}#prijava`} className="btn-primary">
              {p.notifyCta}
            </Link>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
