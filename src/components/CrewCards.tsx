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
      className="group relative overflow-hidden aspect-[3/4] transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        border: "2px solid #C0A882",
        borderRadius: "4px",
        boxShadow: "3px 3px 0 rgba(246,235,211,0.15)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/putnici/${num}.webp`}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />

      {/* Number badge */}
      <div
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center bg-amber text-xs font-black text-ink border border-ink/30"
        style={{ borderRadius: "50%" }}
      >
        {num}
      </div>

      {/* Name at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        {featured && (
          <div className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.16em] text-amber">
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
        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-amber/80">
          Pariz 2026
        </div>
      </div>
    </div>
  );
}

export default function CrewCards({ dict }: { dict: Dictionary }) {
  const c = dict.storyPage.crew;
  const [jovica, ...rest] = CREW;

  return (
    <section className="py-16 sm:py-20" style={{ background: "#452D18", borderTop: "3px double #C0A882" }}>
      <div className="container-content">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-amber mb-2">
            ✦ {c.eyebrow}
          </div>
          <h2
            className="font-display text-3xl text-cream sm:text-4xl"
          >
            {c.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-cream/70 text-sm">{c.subtitle}</p>
        </div>

        {/* Jovica featured */}
        <div className="mx-auto mb-8 max-w-xs sm:max-w-sm">
          <SportCard num={jovica.num} name={jovica.name} featured />
        </div>

        {/* Divider */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-amber/20" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber/50">
            i još 10 sudionika
          </span>
          <div className="h-px flex-1 bg-amber/20" />
        </div>

        {/* Grid 10 */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {rest.map((m) => (
            <SportCard key={m.num} num={m.num} name={m.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
