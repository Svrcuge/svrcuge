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
  return { title: `${dict.newsPage.title} — Svrčuge` };
}

const POSTS = [
  {
    date: "Jul 2026",
    title: "Stubovi za rasvjetu postavljeni",
    text: "Svih pet stubova je iskopano i postavljeno uz seosku uličicu. Instalacija žičane mreže počinje naredne sedmice.",
    img: "/illustrations/stubovi.webp",
  },
  {
    date: "Jun 2026",
    title: "Stubovi kupljeni, krenulo!",
    text: "Nakon prikupljenih sredstava od prijatelja Svrčuga, kupljeno je svih pet stubova za uličnu rasvjetu. Hvala svima koji su častili kafu.",
    img: "/illustrations/rasvjeta.webp",
  },
  {
    date: "Maj 2026",
    title: "Povratak iz Pariza",
    text: "Ekspedicija se vratila. 5.137 km, 14 dana, 11 putnika — i priča o selu koja je obišla cijeli region. Hvala svima koji su nas pratili.",
    img: "/illustrations/reno-pariz.webp",
  },
  {
    date: "April 2026",
    title: "Krenuli iz Svrčuga prema Parizu",
    text: "Kolona od pet automobila napustila je Svrčuge u smjeru Pariza. Cilj: donijeti svjetlost i priču o selu cijelom svijetu.",
    img: "/illustrations/reno-put.webp",
  },
  {
    date: "Mart 2026",
    title: "10 miliona pregleda kampanje",
    text: "Priča o selu od petoro mještana dostigla je 10.250.000 pregleda na društvenim mrežama i 190+ objava u medijima.",
    img: "/illustrations/docek.webp",
  },
];

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        {/* Hero text */}
        <div style={{ padding: "26px 18px 4px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: ".28em", fontWeight: 600, color: "#A5551F" }}>DNEVNIK OBNOVE</div>
          <h1 style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontWeight: 400, fontSize: "27px", lineHeight: 1.15, margin: "8px 0 10px" }}>
            ŠTA SE DEŠAVA U SELU
          </h1>
          <p style={{ fontSize: "14.5px", lineHeight: 1.6, margin: "0 18px" }}>
            Svaki korak obnove, javno i sa datumom. Ovdje se vidi da se stvarno radi.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ margin: "22px 18px 8px", position: "relative", paddingLeft: "30px", display: "flex", flexDirection: "column", gap: "18px" }}>
          <span style={{ position: "absolute", left: "5px", top: "10px", bottom: "10px", width: 0, borderLeft: "2px dashed #A5551F" }} />
          {POSTS.map((post, i) => (
            <div key={i} style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "-32px", top: "4px", width: "12px", height: "12px", borderRadius: "50%", background: "#D96C2C", border: "2px solid #452D18", display: "block" }} />
              <div style={{ border: "2px solid #452D18", borderRadius: "6px", background: "#FBF3E0", overflow: "hidden", boxShadow: "3px 3px 0 rgba(69,45,24,.35)" }}>
                {post.img && (
                  <div style={{ width: "100%", height: "170px", borderBottom: "2px solid #452D18", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                <div style={{ padding: "12px 14px 14px" }}>
                  <div style={{ display: "inline-block", background: "#E0A83A", border: "1.5px solid #452D18", borderRadius: "3px", padding: "2px 8px", fontSize: "10.5px", letterSpacing: ".12em", fontWeight: 600 }}>
                    {post.date}
                  </div>
                  <div style={{ fontFamily: "var(--font-alfa), Georgia, serif", fontSize: "16px", lineHeight: 1.3, margin: "8px 0 4px" }}>{post.title}</div>
                  <div style={{ fontSize: "13.5px", lineHeight: 1.55 }}>{post.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: "12px", color: "#7a5b3d", textAlign: "center", margin: "6px 18px 26px" }}>
          Ostavi email na{" "}
          <Link href={`/${locale}#prijava`} style={{ fontWeight: 600, color: "#A5551F" }}>Početnoj</Link>
          {" "}i javljamo ti prvu vijest.
        </div>
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
