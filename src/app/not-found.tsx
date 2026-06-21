import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <div className="text-6xl">✦</div>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">404</h1>
        <p className="mt-2 text-muted">Stranica nije pronađena.</p>
        <Link href={`/${DEFAULT_LOCALE}`} className="btn-primary mt-6">
          Nazad na Svrčuge
        </Link>
      </div>
    </main>
  );
}
