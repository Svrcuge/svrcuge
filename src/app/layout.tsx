import type { Metadata } from "next";
import { Nunito, Baloo_2 } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";

const nunito = Nunito({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const baloo = Baloo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
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
      <body className={`${nunito.variable} ${baloo.variable} font-sans bg-paper`}>
        {children}
      </body>
    </html>
  );
}
