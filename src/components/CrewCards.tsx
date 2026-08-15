import type { Dictionary } from "@/lib/i18n";

const CREW: { num: string; name: string }[] = [
  { num: "01", name: "Jovica Tušup" },
  { num: "02", name: "Jovana Tušup" },
  { num: "03", name: "Miloš Miljanović" },
  { num: "04", name: "Mirko Miković" },
  { num: "05", name: "Marko Miković" },
  { num: "06", name: "Borko Setenčić" },
  { num: "07", name: "Goran Jančić" },
  { num: "08", name: "Lazar Beko" },
  { num: "09", name: "Veselin Damjanić" },
  { num: "10", name: "Jana Radan" },
  { num: "11", name: "Danilo Babović" },
];

function SportCard({
  num,
  name,
  featured = false,
}: {
  num: string;
  name: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl shadow-card ring-1 ring-amber/20 transition-transform duration-300 hover:-translate-y-1 hover:ring-amber/50 ${
        featured ? "aspect-[3/4]" : "aspect-[3/4]"
      }`}
    >
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/putnici/${num}.webp`}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />

      {/* Top-right number badge */}
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber text-xs font-black text-ink shadow-md">
        {num}
      </div>

      {/* Name at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {featured && (
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber">
            ✦ Kapetan ekspedicije
          </div>
        )}
        <div
          className={`font-display font-bold leading-tight text-cream drop-shadow ${
            featured ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"
          }`}
        >
          {name}
        </div>
        {!featured && (
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber/80">
            Pariz 2026
          </div>
        )}
        {featured && (
          <div className="mt-1 text-sm font-semibold uppercase tracking-wide text-amber/80">
            Pariz · April 2026
          </div>
        )}
      </div>
    </div>
  );
}

export default function CrewCards({ dict }: { dict: Dictionary }) {
  const c = dict.storyPage.crew;
  const [jovica, ...rest] = CREW;

  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="container-content">
        {/* Section header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-amber">
            ✦ {c.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-cream sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">{c.subtitle}</p>
        </div>

        {/* Jovica — featured at top, centered */}
        <div className="mx-auto mb-8 max-w-xs sm:max-w-sm">
          <SportCard num={jovica.num} name={jovica.name} featured />
        </div>

        {/* Decorative divider */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber/20" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber/50">
            i još 10 sudionika
          </span>
          <div className="h-px flex-1 bg-amber/20" />
        </div>

        {/* Grid of 10 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {rest.map((m) => (
            <SportCard key={m.num} num={m.num} name={m.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
