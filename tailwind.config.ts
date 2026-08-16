import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nova paleta — Claude Design (papir, braon, narandžasta)
        cream: "#F6EBD3",         // papir — pozadina stranice
        sand: "#FBF3E0",          // svjetliji papir — karte
        "paper-light": "#EFDFC0", // još svjetliji — sekcije
        ink: "#452D18",           // tamno braon — primarni tekst
        muted: "#7A5B3D",         // srednji braon — sekundarni tekst
        amber: "#E0A83A",         // senf/žuta — bedževi, statusne oznake
        "amber-deep": "#D96C2C",  // narandžasta — primarni akcent, hover, CTA
        accent: "#A5551F",        // akcenat tamni — linkovi, labele
        terracotta: "#C9603F",    // terrakota
        forest: "#55704F",        // zelena — završeno/uspješno
        "forest-deep": "#3E6645",
        sky: "#6FB3D2",
        line: "#C0A882",          // topla granica
      },
      fontFamily: {
        sans: ["var(--font-zilla)", "Georgia", "serif"],
        display: ["var(--font-alfa)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      boxShadow: {
        // Offset shadow — vintage/print stil
        card: "3px 3px 0 rgba(69, 45, 24, 0.35)",
        soft: "5px 5px 0 rgba(69, 45, 24, 0.20)",
        glow: "0 0 0 3px rgba(224, 168, 58, 0.40)",
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
