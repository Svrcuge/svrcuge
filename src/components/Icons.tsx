// Jednostavne, tople line-art ikone (placeholderi do pravih ilustracija).
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  width: 28,
  height: 28,
};

export function IconLight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8.9.8 1.6v.5h5.4v-.5c0-.7.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
      <path d="M9.5 19.5h5M10 22h4M12 1v1M3.5 8.5h1M19.5 8.5h1M5.6 3.6l.7.7M18.4 3.6l-.7.7" />
    </svg>
  );
}

export function IconPlayground(props: IconProps) {
  // Tobogan: merdevine lijevo, platforma, kosina i tlo
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18" />
      <path d="M6 21V8M9 21V8" />
      <path d="M6 12h3M6 16h3" />
      <path d="M9 8h2l9 13" />
    </svg>
  );
}

export function IconMarket(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9h16l-1 11H5L4 9ZM4 9 6 4h12l2 5M9 13v3M15 13v3M12 13v3" />
    </svg>
  );
}

export function IconCabin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5" />
    </svg>
  );
}

export function IconEvents(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 8h14v12H5zM5 8 8 3M19 8l-3-5M3 8h18M9 12h6M9 16h4" />
    </svg>
  );
}

export function IconCoffee(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM16 10h2a2.5 2.5 0 0 1 0 5h-2M7 5c0-1 1-1 1-2M11 5c0-1 1-1 1-2" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 5 5L20 6" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

const ICON_MAP = {
  playground: IconPlayground,
  market: IconMarket,
  cabin: IconCabin,
  events: IconEvents,
  light: IconLight,
  coffee: IconCoffee,
};

export type IconName = keyof typeof ICON_MAP;

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = ICON_MAP[name as IconName] ?? IconLight;
  return <Cmp {...props} />;
}
