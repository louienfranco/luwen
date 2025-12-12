"use client";

import React, { memo } from "react";
import { ExternalLink } from "lucide-react";

type LogoProps = React.SVGProps<SVGSVGElement>;

// Pure SVG logos (no <text>), forwarding props so we can control size/aspect
const VsCodeLogo: React.FC<LogoProps> = (props) => {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path
        fill="#0065a9"
        d="m29.01 5.03l-5.766-2.776a1.74 1.74 0 0 0-1.989.338L2.38 19.8a1.166 1.166 0 0 0-.08 1.647q.037.04.077.077l1.541 1.4a1.165 1.165 0 0 0 1.489.066L28.142 5.75A1.158 1.158 0 0 1 30 6.672v-.067a1.75 1.75 0 0 0-.99-1.575"
      />
      <path
        fill="#007acc"
        d="m29.01 26.97l-5.766 2.777a1.745 1.745 0 0 1-1.989-.338L2.38 12.2a1.166 1.166 0 0 1-.08-1.647q.037-.04.077-.077l1.541-1.4A1.165 1.165 0 0 1 5.41 9.01l22.732 17.24A1.158 1.158 0 0 0 30 25.328v.072a1.75 1.75 0 0 1-.99 1.57"
      />
      <path
        fill="#1f9cf0"
        d="M23.244 29.747a1.745 1.745 0 0 1-1.989-.338A1.025 1.025 0 0 0 23 28.684V3.316a1.024 1.024 0 0 0-1.749-.724a1.74 1.74 0 0 1 1.989-.339l5.765 2.772A1.75 1.75 0 0 1 30 6.6v18.8a1.75 1.75 0 0 1-.991 1.576Z"
      />
    </svg>
  );
};

const CopilotLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <g fill="currentColor">
      <path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75m3.5 0a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75" />
      <path
        fillRule="evenodd"
        d="M8.139 1.807c.682-.731 1.738-.9 2.944-.765c1.23.137 2.145.528 2.724 1.26c.566.716.693 1.615.693 2.485c0 .572-.053 1.148-.254 1.656c.066.228.098.429.126.612q.018.113.037.218c.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065q.019-.105.036-.218c.029-.183.06-.384.126-.612c-.201-.508-.254-1.084-.254-1.656c0-.87.128-1.77.693-2.484c.58-.733 1.494-1.124 2.724-1.261c1.206-.134 2.262.034 2.944.765q.074.079.14.165c.043-.057.093-.113.142-.165M8 6.303a3.3 3.3 0 0 1-.544.743c-.65.664-1.563.991-2.71.991c-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.42.323 2.722 1.433 5.002 1.433s4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291c-1.146 0-2.059-.327-2.71-.991A3.2 3.2 0 0 1 8 6.303M6.762 2.83c-.193-.206-.637-.413-1.682-.297c-1.019.113-1.479.404-1.713.7c-.247.312-.369.79-.369 1.554c0 .793.129 1.171.308 1.371c.162.181.519.379 1.442.379c.853 0 1.339-.235 1.638-.54c.315-.322.527-.827.617-1.553c.117-.935-.037-1.395-.241-1.614m4.155-.297c-1.044-.116-1.488.091-1.68.297c-.205.219-.36.68-.243 1.614c.091.726.303 1.231.618 1.553c.3.305.784.54 1.638.54c.922 0 1.28-.198 1.442-.379c.18-.2.308-.578.308-1.371c0-.765-.123-1.242-.37-1.554c-.233-.296-.693-.587-1.713-.7"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

const FigmaLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 128 128" fill="none" aria-hidden="true" {...props}>
    <path
      fill="#0acf83"
      d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129m0 0"
    />
    <path
      fill="#a259ff"
      d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5m0 0"
    />
    <path
      fill="#f24e1e"
      d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5m0 0"
    />
    <path
      fill="#ff7262"
      d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0"
    />
    <path
      fill="#1abcfe"
      d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5S76.6 43 88.5 43S110 52.6 110 64.5m0 0"
    />
  </svg>
);

const SupabaseLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 128 128" fill="none" aria-hidden="true" {...props}>
    <defs>
      <linearGradient
        id="SVGmhqL6bhI"
        x1="53.974"
        x2="94.163"
        y1="54.974"
        y2="71.829"
        gradientTransform="translate(29.387 60.096)scale(1.1436)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#249361" />
        <stop offset="1" stopColor="#3ecf8e" />
      </linearGradient>
      <linearGradient
        id="SVGTykt2BZp"
        x1="36.156"
        x2="54.484"
        y1="30.578"
        y2="65.081"
        gradientTransform="translate(29.387 60.096)scale(1.1436)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      fill="url(#SVGmhqL6bhI)"
      d="M102.24 186.21c-3.267 4.117-9.904 1.862-9.977-3.397l-1.156-76.906h51.715c9.365 0 14.587 10.817 8.763 18.149z"
      transform="translate(-27.722 -60.338)"
    />
    <path
      fill="url(#SVGTykt2BZp)"
      fillOpacity="0.2"
      d="M102.24 186.21c-3.267 4.117-9.904 1.862-9.977-3.397l-1.156-76.906h51.715c9.365 0 14.587 10.817 8.763 18.149z"
      transform="translate(-27.722 -60.338)"
    />
    <path
      fill="#3ecf8e"
      d="M53.484 2.128c3.267-4.117 9.905-1.862 9.977 3.396l.508 76.907H12.902c-9.365 0-14.587-10.817-8.764-18.149z"
    />
  </svg>
);

const VercelLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M23 21.648H1L12 2.352z" />
  </svg>
);

const NotionLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 128 128" fill="none" aria-hidden="true" {...props}>
    <path
      fill="#fff"
      d="m76.25.25l13.059.086c.246.191.445.316.656.41c2.367 1.07 4.933 1.836 7.066 3.258c6.184 4.11 12.223 8.441 18.258 12.77c2.805 2.007 5.57 4.097 8.156 6.37c1.922 1.688 2.785 4.083 2.79 6.637l-.005 80.371c-.003 1.121-.195 2.274-.507 3.352c-1.418 4.914-4.563 8.277-9.512 9.59c-2.61.691-5.367.906-8.074 1.129c-4.223.351-8.461.523-12.692.777l-8.004.5l-12.816.754l-7.879.492l-12.941.75l-6.688.274c-.215.011-.414.312-.617.48c-5.09 0-10.176 0-15.309-.082c-.246-.195-.433-.352-.652-.414c-3.102-.899-5.703-2.613-7.703-5.102c-2.77-3.441-5.402-6.988-8.066-10.511c-3.274-4.329-6.633-8.594-9.727-13.047a15.47 15.47 0 0 1-2.79-8.875a72122 72122 0 0 1 .009-71.211c0-.684.12-1.375.238-2.055C3.742 9.645 9.152 5.746 15.586 5.023c3.34-.375 6.703-.543 10.059-.765l8.87-.512l3.813-.25l11.5-.992l6.375-.5l10.559-.75l8.87-.524c.216-.015.415-.312.618-.48M25.945 114.184c.532.691 1.125 1.347 1.59 2.082c2.254 3.527 5.485 4.808 9.59 4.535l27.809-1.656l31.296-1.891l15.582-1.004c4.618-.371 6.848-2.867 6.938-7.5v-1l.035-75.863c.004-2.285-.785-3.883-2.613-5.16l-22.024-15.52c-3.543-2.578-7.304-3.781-11.66-3.437L57.824 9.594l-25.789 1.902l-16.187 1.262c-3.27.3-5.297 2.3-5.883 5.508a14 14 0 0 0-.207 2.48l-.067 66.242c-.023 4.34 1.305 7.95 3.903 11.27zm0 0"
    />
    <path d="m25.887 114.117l-12.293-15.86c-2.598-3.32-3.926-6.929-3.903-11.269l.067-66.242c0-.828.062-1.668.207-2.48c.586-3.207 2.613-5.207 5.883-5.508l16.187-1.262l25.79-1.902L82.488 7.77c4.356-.344 8.117.859 11.66 3.437c7.262 5.285 14.66 10.383 22.024 15.52c1.828 1.277 2.617 2.875 2.613 5.16l-.035 75.867v1c-.09 4.629-2.32 7.125-6.938 7.496c-5.187.418-10.386.688-15.582 1.004l-31.296 1.89l-27.809 1.657c-4.105.273-7.336-1.008-9.59-4.535c-.465-.735-1.058-1.391-1.648-2.149m6.406-45.992v33.488l.008 6.246c.054 2.801 1.426 4.196 4.226 4.356c.703.039 1.414.015 2.121-.028l23.442-1.382l44.765-2.559c2.79-.156 4.079-1.379 4.34-4.144c.051-.497.035-1 .035-1.5l.004-64.477c0-.375.012-.75-.011-1.125c-.168-2.566-1.27-3.613-3.82-3.477l-23.071 1.329a43791 43791 0 0 0-32.418 1.898l-16.207.973c-2.066.132-3 1.023-3.312 3.043a10.6 10.6 0 0 0-.098 1.617zm57.172-52.727c-1.957-1.062-4.082-1.414-6.27-1.293c-3.363.184-6.726.461-10.09.704l-47.949 3.484c-1.449.105-2.906.21-4.336.469c-.48.086-1.086.57-1.234 1.008c-.11.308.375.93.73 1.27c.657.628 1.414 1.155 2.13 1.722c1.699 1.34 3.507 2.562 5.066 4.043c2.957 2.808 6.398 3.457 10.34 3.172l31.035-1.946l33.41-2.004c.305-.015.61-.109 1.281-.234c-.613-.637-.969-1.125-1.433-1.469a234 234 0 0 0-4.957-3.562a698 698 0 0 0-7.723-5.364m0 0" />
    <path
      fill="#fff"
      d="m32.293 68l.004-25.617c0-.54.016-1.086.098-1.617c.312-2.02 1.246-2.91 3.312-3.043l16.207-.973l32.418-1.898l23.07-1.329c2.551-.136 3.653.914 3.82 3.477c.024.375.012.75.012 1.125l-.004 64.477l-.035 1.5c-.261 2.765-1.55 3.988-4.34 4.144l-44.765 2.559l-23.442 1.382l-2.12.028c-2.801-.16-4.173-1.555-4.227-4.352l-.008-6.25zm45.766.066L65.191 48.461c-.449-.684-.89-.91-1.718-.82l-5.485.37l-10.09.739c-2.48.227-3.98 2.559-3.293 4.977l5.344.457v43.293l-3.64 1.027c-1.614.476-2.305 1.836-1.762 3.574l12.308-.707l4.848-.398c2.09-.344 3.215-1.625 3.496-3.715l-6.73-1.535V63.16l.5.7l15.468 24.152a361 361 0 0 0 7.004 10.46c1.707 2.45 4.223 3.2 7.051 2.59c1.77-.378 3.469-1.097 5.203-1.656c.903-.293 1.211-.832 1.207-1.844l-.03-44.5c0-2.601 0-2.601 2.573-3.12c2.602-.524 3.254-1.563 2.66-4.344l-15.55.945c-1.692.121-2.973 1.535-3.23 3.18c-.126.793.038 1.23.987 1.285l4.708.52v30.179a7435 7435 0 0 0-8.961-13.637zM89.55 15.441a1123 1123 0 0 1 7.636 5.32a234 234 0 0 1 4.958 3.563c.464.344.82.832 1.433 1.469l-1.281.234l-33.41 2.004l-31.035 1.946c-3.942.285-7.383-.364-10.34-3.172c-1.559-1.48-3.367-2.703-5.067-4.043c-.715-.567-1.472-1.094-2.129-1.723c-.355-.34-.84-.96-.73-1.27c.148-.437.758-.921 1.234-1.007c1.43-.258 2.887-.364 4.336-.469l47.95-3.484l10.09-.704c2.187-.12 4.312.23 6.355 1.336m0 0"
    />
    <path d="m78.113 68.14l8.907 13.567v-30.18l-4.707-.52c-.95-.054-1.114-.491-.989-1.284c.258-1.645 1.54-3.059 3.23-3.18l15.551-.945c.594 2.78-.058 3.82-2.66 4.343c-2.574.516-2.574.516-2.574 3.121l.031 44.5c.004 1.012-.304 1.551-1.207 1.844l-5.203 1.656c-2.828.606-5.344-.14-7.05-2.59a367 367 0 0 1-7.004-10.46l-15.47-24.153c-.109-.172-.234-.332-.5-.699v32.563l6.731 1.535c-.281 2.09-1.406 3.37-3.496 3.715c-1.594.261-3.23.3-4.848.398l-12.308.707c-.543-1.738.148-3.098 1.762-3.574l3.64-1.027V54.184l-5.344-.457c-.687-2.418.813-4.75 3.293-4.977c3.356-.313 6.727-.504 10.09-.738c1.828-.125 3.664-.172 5.485-.371c.828-.09 1.27.136 1.718.82zm0 0" />
  </svg>
);

const GoogleLogo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 256 256" fill="none" aria-hidden="true" {...props}>
    <path
      fill="#fff"
      d="M128.003 199.216c39.335 0 71.221-31.888 71.221-71.223S167.338 56.77 128.003 56.77S56.78 88.658 56.78 127.993s31.887 71.223 71.222 71.223"
    />
    <path
      fill="#229342"
      d="M35.89 92.997Q27.92 79.192 17.154 64.02a127.98 127.98 0 0 0 110.857 191.981q17.671-24.785 23.996-35.74q12.148-21.042 31.423-60.251v-.015a63.993 63.993 0 0 1-110.857.017Q46.395 111.19 35.89 92.998"
    />
    <path
      fill="#fbc116"
      d="M128.008 255.996A127.97 127.97 0 0 0 256 127.997A128 128 0 0 0 238.837 64q-36.372-3.585-53.686-3.585q-19.632 0-57.152 3.585l-.014.01a63.99 63.99 0 0 1 55.444 31.987a63.99 63.99 0 0 1-.001 64.01z"
    />
    <path
      fill="#1a73e8"
      d="M128.003 178.677c27.984 0 50.669-22.685 50.669-50.67s-22.685-50.67-50.67-50.67c-27.983 0-50.669 22.686-50.669 50.67s22.686 50.67 50.67 50.67"
    />
    <path
      fill="#e33b2e"
      d="M128.003 64.004H238.84a127.973 127.973 0 0 0-221.685.015l55.419 95.99l.015.008a63.993 63.993 0 0 1 55.415-96.014z"
    />
  </svg>
);

const v0Logo: React.FC<LogoProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M14.066 6.028v2.22h5.729q.075-.001.148.005l-5.853 5.752a2 2 0 0 1-.024-.309V8.247h-2.353v5.45c0 2.322 1.935 4.222 4.258 4.222h5.675v-2.22h-5.675q-.03 0-.059-.003l5.729-5.629q.006.082.006.166v5.465H24v-5.465a4.204 4.204 0 0 0-4.205-4.205zM0 8.245l8.28 9.266c.839.94 2.396.346 2.396-.914V8.245H8.19v5.44l-4.86-5.44Z"
    />
  </svg>
);

type Tool = {
  id?: string;
  name: string;
  href: string;
  category: string; // e.g., "Code Editor", "AI Assistant", "UI/UX Design"
  // Provide your own SVG component here (optional)
  Logo?: React.ComponentType<LogoProps>;
};

const defaultTools: Tool[] = [
  {
    id: "vscode",
    name: "VSCode",
    category: "Code Editor",
    Logo: VsCodeLogo,
    href: "https://code.visualstudio.com/",
  },
  {
    id: "copilot",
    name: "Copilot",
    category: "AI Assistant",
    Logo: CopilotLogo,
    href: "https://openai.com/",
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX Design",
    Logo: FigmaLogo,
    href: "https://www.figma.com/",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    Logo: SupabaseLogo,
    href: "https://supabase.com/",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Deployment",
    Logo: VercelLogo,
    href: "https://vercel.com/",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Productivity",
    Logo: NotionLogo,
    href: "https://www.notion.com/",
  },
  {
    id: "chrome",
    name: "Chrome",
    category: "Browser",
    Logo: GoogleLogo,
    href: "https://www.google.com/",
  },
  {
    id: "v0",
    name: "v0",
    category: "AI Tool",
    Logo: v0Logo,
    href: "https://www.google.com/",
  },
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
  caption = "The collection of software, and tools I rely on every day empowers me to create, experiment, and bring new ideas to life.",
  tools = defaultTools,
  size = 40,
  actionLabel = "Open link",
  fit = "contain",
}: ToolCardsProps) {
  const sizeVar = toCssUnit(size);
  const preserve = fit === "cover" ? "xMidYMid slice" : "xMidYMid meet";

  // Keep 3 columns on lg, but center the final row only on lg.
  const DESKTOP_COLS = 3;
  const total = tools.length;
  const remainder = total % DESKTOP_COLS;
  const fullCount = remainder === 0 ? total : total - remainder;

  return (
    <section
      id="stack"
      aria-labelledby="tools-title"
      className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20"
    >
      <header className="mb-10 text-center max-w-xl mx-auto">
        <h2
          id="tools-title"
          className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
        >
          {title}
        </h2>
        {caption && <p className="mt-2 text-muted-foreground">{caption}</p>}
        <div className="mx-auto mt-3 h-px w-20 bg-linear-to-r from-transparent via-foreground/30 to-transparent" />
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Full rows rendered normally */}
        {tools
          .slice(0, fullCount)
          .map(({ id, name, href, category, Logo }, i) => (
            <article
              key={id ?? `${name}-${category}-${i}`}
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
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex-none text-foreground aspect-square"
                  style={{ width: sizeVar }}
                >
                  {Logo ? (
                    <Logo
                      className="block w-full h-full"
                      preserveAspectRatio={preserve}
                      focusable="false"
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className="block w-full h-full rounded-md border border-dashed border-muted-foreground/20 bg-muted/30"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="text-base font-medium text-foreground">
                  {name}
                </div>
              </div>
            </article>
          ))}

        {/* Partial last row: stack full-width on mobile, center on lg */}
        {remainder > 0 ? (
          <div className="col-span-full flex flex-wrap gap-4 md:gap-6 justify-start lg:justify-center">
            {tools
              .slice(fullCount)
              .map(({ id, name, href, category, Logo }, j) => (
                <article
                  key={id ?? `${name}-last-${j}`}
                  className="w-full sm:w-1/2 lg:w-1/3 min-w-0 rounded-xl border bg-background/50 p-4 md:p-5 transition-shadow hover:shadow-sm"
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
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="flex-none text-foreground aspect-square"
                      style={{ width: sizeVar }}
                    >
                      {Logo ? (
                        <Logo
                          className="block w-full h-full"
                          preserveAspectRatio={preserve}
                          focusable="false"
                          aria-hidden="true"
                        />
                      ) : (
                        <div
                          className="block w-full h-full rounded-md border border-dashed border-muted-foreground/20 bg-muted/30"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="text-base font-medium text-foreground">
                      {name}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const MemoToolCards = memo(ToolCards);
