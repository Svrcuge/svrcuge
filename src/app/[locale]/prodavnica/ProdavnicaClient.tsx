"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const PRODUCTS = [
  {
    id: "majica",
    name: "Majica Svrčuge",
    desc: "Organski pamuk, print ručno nanesena u selu. Unisex kroj, dostupno S–XXL.",
    price: 20,
    img: "/illustrations/community.webp",
  },
  {
    id: "ceger",
    name: "Ceger — Svrčuge",
    desc: "Platnena torba s motivom sela. Idealna za pijacu i svakodnevnu upotrebu.",
    price: 12,
    img: "/illustrations/vision.webp",
  },
  {
    id: "solja",
    name: "Šolja — Seoska kafa",
    desc: "Keramička šolja s motivom Svrčuga. Svaka je ručno ukrašena.",
    price: 10,
    img: "/illustrations/story.webp",
  },
  {
    id: "kapa",
    name: "Kapa Svrčuge",
    desc: "Zimska kapa od vune s vezenim logom sela. Topla i robusna.",
    price: 15,
    img: "/illustrations/build-market.webp",
  },
  {
    id: "razglednice",
    name: "Razglednice — 5 kom",
    desc: "Set od 5 razglednica s fotografijama sela. Savršen poklon za prijatelje.",
    price: 5,
    img: "/putnici/03.webp",
  },
  {
    id: "magnet",
    name: "Magnet za frižider",
    desc: "Živopisni magnet s motivom sela — suvenir koji ostaje.",
    price: 4,
    img: "/putnici/05.webp",
  },
];

export default function ProdavnicaClient({ locale }: { locale: Locale }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ordered, setOrdered] = useState(false);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = PRODUCTS.reduce(
    (sum, p) => sum + (cart[p.id] ?? 0) * p.price,
    0
  );
  const hasItems = cartCount > 0;

  function addToCart(id: string) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  function removeOne(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id]--;
      return next;
    });
  }

  function handleOrder() {
    setOrdered(true);
    setCart({});
  }

  return (
    <main style={{ paddingBottom: hasItems ? "80px" : "0" }}>
      {/* Hero */}
      <div style={{ padding: "28px 18px 0", textAlign: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo-black.png"
          alt="Svrčuge"
          style={{ height: "72px", display: "block", margin: "0 auto 12px" }}
        />
        <h1
          style={{
            fontFamily: "var(--font-alfa), Georgia, serif",
            fontSize: "26px",
            letterSpacing: "0.06em",
            margin: "0 0 4px",
          }}
        >
          SEOSKA PRODAVNICA
        </h1>
        <div
          style={{
            fontSize: "10.5px",
            letterSpacing: ".24em",
            fontWeight: 600,
            color: "#A5551F",
            textTransform: "uppercase",
          }}
        >
          Svrčuge · Boka Kotorska
        </div>
      </div>

      {/* Intro */}
      <div className="dnarrow" style={{ padding: "16px 18px 24px" }}>
        <p
          style={{
            fontSize: "14.5px",
            lineHeight: 1.65,
            margin: 0,
            textAlign: "center",
          }}
        >
          Svaki predmet rađen je uz posvetu selu. Kupovinom direktno podržavaš
          obnovu Svrčuga — od rasvjete do zajednice.
        </p>
      </div>

      {/* Order confirmation */}
      {ordered && (
        <div
          style={{
            margin: "0 18px 24px",
            background: "#55704F",
            color: "#F6EBD3",
            border: "2px solid #3d5338",
            borderRadius: "6px",
            padding: "18px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-alfa), Georgia, serif",
              fontSize: "18px",
              marginBottom: "6px",
            }}
          >
            Hvala ti!
          </div>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6 }}>
            Porudžbina primljena. Javićemo se na zdravo@svrcuge.me u roku 24h.
          </p>
        </div>
      )}

      {/* Products grid — 2 cols mobile, 3 cols desktop via .grid2 */}
      <div
        className="grid2"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          padding: "0 18px 24px",
        }}
      >
        {PRODUCTS.map((p) => {
          const qty = cart[p.id] ?? 0;
          return (
            <div
              key={p.id}
              style={{
                border: "2px solid #452D18",
                borderRadius: "6px",
                overflow: "hidden",
                background: "#FBF3E0",
                boxShadow: "2px 2px 0 rgba(69,45,24,.25)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  position: "relative",
                  background: "#EFDFC0",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {qty > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      background: "#D96C2C",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                      border: "2px solid #fff",
                    }}
                  >
                    {qty}
                  </div>
                )}
              </div>

              {/* Info */}
              <div
                style={{
                  padding: "10px 10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-alfa), Georgia, serif",
                    fontSize: "13px",
                    lineHeight: 1.25,
                    marginBottom: "4px",
                  }}
                >
                  {p.name}
                </div>
                <p
                  style={{
                    fontSize: "11.5px",
                    lineHeight: 1.5,
                    margin: "0 0 10px",
                    color: "#6B4E2A",
                    flex: 1,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-alfa), Georgia, serif",
                      fontSize: "15px",
                    }}
                  >
                    €{p.price}
                  </span>
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => addToCart(p.id)}
                      style={{
                        background: "#452D18",
                        color: "#F6EBD3",
                        border: "none",
                        borderRadius: "4px",
                        padding: "6px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: ".05em",
                        cursor: "pointer",
                        fontFamily: "var(--font-zilla), Georgia, serif",
                      }}
                    >
                      U korpu
                    </button>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => removeOne(p.id)}
                        style={{
                          background: "#F6EBD3",
                          color: "#452D18",
                          border: "2px solid #452D18",
                          borderRadius: "4px",
                          width: "26px",
                          height: "26px",
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                        }}
                      >
                        −
                      </button>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "13px",
                          minWidth: "16px",
                          textAlign: "center",
                        }}
                      >
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(p.id)}
                        style={{
                          background: "#452D18",
                          color: "#F6EBD3",
                          border: "2px solid #452D18",
                          borderRadius: "4px",
                          width: "26px",
                          height: "26px",
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Support note */}
      <div
        className="dnarrow"
        style={{
          margin: "0 18px 32px",
          border: "2px solid #452D18",
          borderRadius: "6px",
          padding: "16px",
          background: "#FBF3E0",
          boxShadow: "2px 2px 0 rgba(69,45,24,.25)",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            letterSpacing: ".2em",
            fontWeight: 700,
            color: "#A5551F",
            marginBottom: "6px",
          }}
        >
          SVAKA KUPOVINA JE PODRŠKA
        </div>
        <p style={{ fontSize: "13.5px", lineHeight: 1.6, margin: 0 }}>
          Prihodi od prodavnice idu direktno u fond za obnovu sela. Isporuka
          poštom u roku 5–7 radnih dana. Za više informacija:{" "}
          <a
            href="mailto:zdravo@svrcuge.me"
            style={{ color: "#A5551F", fontWeight: 600 }}
          >
            zdravo@svrcuge.me
          </a>
        </p>
        <div
          style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px dashed #D8C9A8",
          }}
        >
          <Link
            href={`/${locale}/donatori`}
            style={{ fontSize: "13px", color: "#A5551F", fontWeight: 600 }}
          >
            Vidi listu donatora i podržavatelja →
          </Link>
        </div>
      </div>

      {/* Fixed cart bar */}
      {hasItems && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 90,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1060px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "12px 18px",
              background: "#452D18",
              color: "#F6EBD3",
              borderTop: "2px solid #E0A83A",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: ".12em",
                  color: "#C9B694",
                }}
              >
                {cartCount} {cartCount === 1 ? "artikal" : "artikla"} u korpi
              </div>
              <div
                style={{
                  fontFamily: "var(--font-alfa), Georgia, serif",
                  fontSize: "18px",
                }}
              >
                €{cartTotal}
              </div>
            </div>
            <button
              type="button"
              onClick={handleOrder}
              style={{
                background: "#E0A83A",
                color: "#452D18",
                border: "2px solid #E0A83A",
                borderRadius: "4px",
                padding: "10px 20px",
                fontFamily: "var(--font-alfa), Georgia, serif",
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: ".04em",
                whiteSpace: "nowrap",
              }}
            >
              NARUČI
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
