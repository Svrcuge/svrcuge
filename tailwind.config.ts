import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Topla, ilustrativna paleta — "od svjetla do života"
        cream: "#FFF8EC", // pozadina
        sand: "#FBEFD8", // alt sekcije
        ink: "#3A2A18", // glavni tekst (topla tamno-smeđa)
        muted: "#7A6A55", // sekundarni tekst
        amber: "#F2A413", // svjetlo / primarni akcent
        "amber-deep": "#E0860A",
        terracotta: "#C9603F", // toplina, krov brvnare
        forest: "#4C8B5B", // priroda / selo
        "forest-deep": "#3C6F49",
        sky: "#6FB3D2", // nebo / vedrina
        line: "#EADBC2",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-baloo)", "var(--font-nunito)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 12px 40px -16px rgba(58, 42, 24, 0.18)",
        card: "0 10px 30px -12px rgba(58, 42, 24, 0.15)",
        glow: "0 18px 50px -18px rgba(242, 164, 19, 0.45)",
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
