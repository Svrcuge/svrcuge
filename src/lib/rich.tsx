import React from "react";

// Renderuje tekst sa **podebljanim** dijelovima. U JSON-u označi dio sa
// dvostrukim zvjezdicama: "tekst **važno** kraj". Drugi argument je klasa za
// <strong> (npr. svjetlija boja na tamnoj pozadini).
export function rich(text: string, strongClass = "font-extrabold text-ink"): React.ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={strongClass}>
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
