"use client";

import React from "react";

type LogoProps = React.SVGProps<SVGSVGElement>;

// Pure SVG logos (no <text>), forwarding props so we can control size/aspect
const VsCodeLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <g fill="none">
      <g fill="currentColor" clip-path="url(#SVGXv8lpc2Y)">
        <path d="M.228 8.37s-.584-.427.117-.995L1.98 5.897s.467-.497.962-.064l15.081 11.542v5.534s-.007.87-1.11.774z" />
        <path d="M4.116 11.937L.228 15.509s-.4.3 0 .837l1.805 1.66s.429.465 1.062-.065l4.121-3.158zm6.824.029l7.13-5.502l-.047-5.505s-.305-1.202-1.32-.576L7.216 9.11z" />
        <path d="M16.912 23.69c.414.428.916.288.916.288l5.556-2.767c.711-.49.611-1.098.611-1.098V3.588c0-.726-.735-.977-.735-.977L18.444.264c-1.052-.657-1.741.119-1.741.119s.886-.645 1.32.576v21.85c0 .15-.032.297-.095.43c-.127.259-.402.5-1.062.4z" />
      </g>
      <defs>
        <clipPath id="SVGXv8lpc2Y">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </g>
  </svg>
);

const ChatGptLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle cx="24" cy="24" r="24" fill="currentColor" />
  </svg>
);

const FigmaLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M0 24L24 0L48 24L24 48L0 24Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

const SupabaseLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M0 48L24 0L48 48H0Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);

const SpotifyLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M0 0H48V48H0V0Z" fill="currentColor" fillOpacity="0.5" />
    <path d="M24 0L48 24L24 48L0 24L24 0Z" fill="currentColor" />
  </svg>
);

const LogoTriangle: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path d="M24 0L48 48H0L24 0Z" fill="currentColor" />
  </svg>
);

type Tool = {
  name: string;
  href: string;
  category: string; // e.g., "Code Editor", "AI Assistant", "UI/UX Design"
  Logo: React.ComponentType<LogoProps>;
};

const defaultTools: Tool[] = [
  { name: "VSCode", category: "Code Editor", Logo: VsCodeLogo, href: "#" },
  { name: "ChatGPT", category: "AI Assistant", Logo: ChatGptLogo, href: "#" },
  {
    name: "Figma",
    category: "UI/UX Design",
    Logo: FigmaLogo,
    href: "#",
  },
  {
    name: "Supabase",
    category: "Database",
    Logo: SupabaseLogo,
    href: "#",
  },
  { name: "Spotify", category: "Music", Logo: SpotifyLogo, href: "#" },
  { name: "WaveCast", category: "Audio/Video", Logo: LogoTriangle, href: "#" },
];

interface ToolCardsProps {
  title?: string;
  caption?: string;
  tools?: Tool[];
  size?: number | string; // logo size
  actionLabel?: string; // defaults to "Open link"
  fit?: "contain" | "cover"; // contain = meet, cover = slice
}

function toCssUnit(value: number | string) {
  return typeof value === "number" ? `${value}px` : value;
}

export function ToolCards({
  title = "Tools / Stack",
  caption = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.",
  tools = defaultTools,
  size = 40,
  actionLabel = "Open link",
  fit = "contain",
}: ToolCardsProps) {
  const sizeVar = toCssUnit(size);
  const preserve = fit === "cover" ? "xMidYMid slice" : "xMidYMid meet";

  return (
    <section
      aria-labelledby="tools-title"
      className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20"
    >
      <header className="mb-10 text-center">
        <h2
          id="tools-title"
          className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
        >
          {title}
        </h2>
        {caption && <p className="mt-2 text-muted-foreground">{caption}</p>}
        <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {tools.map(({ name, href, category, Logo }, i) => (
          <article
            key={i}
            className="rounded-xl border bg-background/50 p-4 md:p-5 transition-shadow hover:shadow-sm"
          >
            <div className="font-mono mb-3 flex items-center justify-between text-sm">
              <span className="inline-flex items-center rounded-full bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground">
                {category}
              </span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                aria-label={`${actionLabel} to ${name}`}
              >
                {actionLabel}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex-none text-foreground aspect-square"
                style={{ width: sizeVar }}
              >
                <Logo
                  className="block w-full h-full"
                  preserveAspectRatio={preserve}
                  focusable="false"
                  aria-hidden="true"
                />
              </div>
              <div className="text-base font-medium text-foreground">
                {name}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
