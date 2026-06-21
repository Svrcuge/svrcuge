// Globalna konfiguracija sajta. Mijenja se preko .env.local.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.svrcuge.me";

// Kada crowdfunding kampanja krene, popuni NEXT_PUBLIC_CAMPAIGN_URL u .env.local.
// Dok je prazno, sajt je u "pre-launch" režimu (skuplja e-mailove).
export const CAMPAIGN_URL = process.env.NEXT_PUBLIC_CAMPAIGN_URL || "";
export const CAMPAIGN_LIVE = CAMPAIGN_URL.length > 0;

// Društvene mreže i kontakt (@svrcuge.me na svim mrežama).
export const SOCIAL = {
  facebook: "https://facebook.com/svrcuge.me",
  instagram: "https://instagram.com/svrcuge.me",
  tiktok: "https://tiktok.com/@svrcuge.me",
  email: "info@svrcuge.me",
};
