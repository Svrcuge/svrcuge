import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n";

// "/" preusmjerava na primarni jezik (crnogorski) → /me
export default function RootRedirect() {
  redirect(`/${DEFAULT_LOCALE}`);
}
