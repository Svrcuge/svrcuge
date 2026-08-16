import type { Metadata } from "next";
import { Zilla_Slab, Alfa_Slab_One } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";

const zillaSlab = Zilla_Slab({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-zilla",
  display: "swap",
});

const alfaSlabOne = Alfa_Slab_One({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-alfa",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Svrčuge: Od svjetla do života",
  description:
    "Prva faza razvoja Svrčuga je pokrenuta. Stubovi za rasvjetu su kupljeni, a sada pripremamo crowdfunding kampanju za razvoj sela.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className={`${zillaSlab.variable} ${alfaSlabOne.variable} font-sans bg-cream text-ink`}>
        {children}
      </body>
    </html>
  );
}
