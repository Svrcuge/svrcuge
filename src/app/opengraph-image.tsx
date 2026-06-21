import { ImageResponse } from "next/og";

export const alt = "Svrčuge: Od svjetla do života";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dinamička Open Graph slika (placeholder dok ne stigne prava ilustracija).
// Generiše se automatski, bez binarnog asseta u repou.
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #FFF8EC 0%, #FBEFD8 60%, #F2A413 160%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, color: "#E0860A", fontWeight: 800 }}>
          <div style={{ width: 26, height: 26, borderRadius: 999, background: "#F2A413", display: "flex" }} />
          SVRČUGE
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, color: "#3A2A18", marginTop: 24, lineHeight: 1.05 }}>
          Od svjetla do života
        </div>
        <div style={{ fontSize: 30, color: "#7A6A55", marginTop: 24, maxWidth: 900 }}>
          Stubovi za rasvjetu su kupljeni. Sada gradimo razlog da se ljudi vrate.
        </div>
      </div>
    ),
    { ...size }
  );
}
