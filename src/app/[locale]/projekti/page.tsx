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
  const dict = getDictionary(locale);
  return { title: `${dict.nav.projects} — Svrčuge` };
}

const STATUS_STYLES: Record<string, string> = {
  done: "bg-forest text-cream",
  "in-progress": "bg-amber text-ink",
  soon: "bg-amber/40 text-ink",
  planned: "bg-paper-light text-muted",
};
const STATUS_DISPLAY: Record<string, string> = {
  done: "Završeno",
  "in-progress": "U TOKU",
  soon: "USKORO",
  planned: "Planirano",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.projects;

  return (
    <div className="site site-1060">
      <Header dict={dict} locale={locale} />
      <main>
        <div
          className="py-16 px-5 text-center"
          style={{ background: "#452D18", borderBottom: "3px double #C0A882" }}
        >
          <div className="eyebrow !text-amber mb-3">✦ {p.eyebrow}</div>
          <h1 className="font-display text-4xl font-bold text-cream sm:text-5xl">{p.intro}</h1>
        </div>

        <section className="py-14" style={{ background: "#FBF3E0" }}>
          <div className="container-content max-w-xl">
            <ul className="space-y-4">
              {p.items.map((item) => (
                <li
                  key={item.num}
                  className="flex items-center gap-4 border-2 border-ink bg-sand px-5 py-4"
                  style={{ borderRadius: "6px", boxShadow: "3px 3px 0 rgba(69,45,24,0.20)" }}
                >
                  <span
                    className="flex-none flex h-10 w-10 items-center justify-center border-2 border-ink text-base font-black"
                    style={{ borderRadius: "50%", background: "#F6EBD3", fontFamily: "var(--font-alfa), Georgia, serif" }}
                  >
                    {item.num}
                  </span>
                  <span className="flex-1 font-semibold text-ink text-lg">{item.title}</span>
                  {STATUS_DISPLAY[item.status] && (
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 ${STATUS_STYLES[item.status]}`}
                      style={{ borderRadius: "3px" }}
                    >
                      {STATUS_DISPLAY[item.status]}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 border-2 border-ink bg-cream p-5 text-sm text-ink/75" style={{ borderRadius: "6px" }}>
              Svaki trošak je javan. Fotografije kupovine i izvještaji o radovima objavljuju se na stranici{" "}
              <Link href={`/${locale}/novosti`} className="font-bold text-amber-deep hover:underline">
                Novosti
              </Link>
              .
            </div>
          </div>
        </section>

        <div className="container-content py-6 text-center">
          <Link href={`/${locale}`} className="text-sm font-bold text-amber-deep hover:underline">
            ← Nazad na početnu
          </Link>
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
