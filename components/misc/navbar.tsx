"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sun,
  Moon,
  Menu,
  Home as HomeIcon,
  Mail,
  FolderGit2,
  Wrench,
  Github,
  CircleUser,
  type LucideIcon,
} from "lucide-react";

/* One source of truth */
type NavLink = { href: string; label: string; icon?: LucideIcon };

/*
  Treat Home as a section at the top using "/#home".
  Add id="home" to your top/hero section on the home page.
*/
const links: NavLink[] = [
  { href: "/#home", label: "Home", icon: HomeIcon },
  { href: "/#about", label: "About", icon: CircleUser },
  { href: "/#projects", label: "Projects", icon: FolderGit2 },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
];

/* Defer hashchange to the next frame to avoid "useInsertionEffect must not schedule updates" */
function scheduleHashChange() {
  if (typeof window === "undefined") return;
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("hashchange"));
    });
  } else {
    setTimeout(() => {
      window.dispatchEvent(new Event("hashchange"));
    }, 0);
  }
}

/* Patch history to emit an event when pushState/replaceState are called.
   This makes Next.js hash navigations notify our useHash store without violating insertion effect constraints. */
let historyPatched = false;
let historyPatchRefs = 0;
let originalPushState: History["pushState"] | null = null;
let originalReplaceState: History["replaceState"] | null = null;

function ensureHistoryPatched() {
  if (typeof window === "undefined") return () => {};

  historyPatchRefs += 1;
  if (!historyPatched) {
    historyPatched = true;
    originalPushState = history.pushState;
    originalReplaceState = history.replaceState;

    history.pushState = function patchedPushState(
      this: History,
      ...args: Parameters<History["pushState"]>
    ): ReturnType<History["pushState"]> {
      const ret = originalPushState!.apply(history, args);
      scheduleHashChange();
      return ret;
    };

    history.replaceState = function patchedReplaceState(
      this: History,
      ...args: Parameters<History["replaceState"]>
    ): ReturnType<History["replaceState"]> {
      const ret = originalReplaceState!.apply(history, args);
      scheduleHashChange();
      return ret;
    };
  }

  return () => {
    historyPatchRefs -= 1;
    if (historyPatchRefs === 0 && historyPatched) {
      if (originalPushState) history.pushState = originalPushState;
      if (originalReplaceState) history.replaceState = originalReplaceState;
      originalPushState = null;
      originalReplaceState = null;
      historyPatched = false;
    }
  };
}

/* SSR-safe media query */
function useMediaQuery(query: string) {
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(query);
      const handler = () => callback();

      if ("addEventListener" in mql) {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
      } else {
        // Legacy Safari
        type LegacyMQL = MediaQueryList & {
          addListener: (
            listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
          ) => void;
          removeListener: (
            listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
          ) => void;
        };
        const legacy = mql as unknown as LegacyMQL;
        legacy.addListener(handler);
        return () => legacy.removeListener(handler);
      }
    },
    getSnapshot,
    () => false // server and first hydration render
  );
}

/* SSR-safe hash store (reacts to push/replaceState via the patch above) */
function useHash() {
  const getSnapshot = () =>
    typeof window !== "undefined" ? window.location.hash : "";

  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const handler = () => callback();

      const unpatch = ensureHistoryPatched();
      window.addEventListener("hashchange", handler);
      window.addEventListener("popstate", handler);

      return () => {
        window.removeEventListener("hashchange", handler);
        window.removeEventListener("popstate", handler);
        unpatch();
      };
    },
    getSnapshot,
    () => ""
  );
}

/* Href parts helper */
function splitBaseAndHash(href: string) {
  if (href.startsWith("#")) return { base: "", hash: href };
  if (href.includes("#")) {
    const [base, h] = href.split("#");
    return { base: base || "/", hash: `#${h}` };
  }
  return { base: href, hash: "" };
}

function samePath(a: string, b: string) {
  const norm = (p: string) => (p || "/").replace(/\/+$/, "") || "/";
  return norm(a) === norm(b);
}

/* Floating “Dynamic Island” header that expands on mobile */
export default function SiteHeader() {
  const pathname = usePathname();
  const hash = useHash();
  const { resolvedTheme, setTheme } = useTheme();

  // Ref to the island wrapper (used for click-away)
  const islandRef = useRef<HTMLDivElement>(null);

  // Hydration-safe: do not read window at initial render
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update(); // align immediately after mount
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isMobileOpen = !isMdUp && mobileOpen;

  // Measure collapsible content height for smooth max-height animation
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const rafId = requestAnimationFrame(() => {
      setContentH(el.scrollHeight);
    });

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => setContentH(el.scrollHeight))
        : null;

    ro?.observe(el);

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, []);

  // Active logic supporting routes + hashes
  const isActive = (href: string) => {
    const parts = splitBaseAndHash(href);
    if (!parts.hash) return samePath(pathname, parts.base);
    if (parts.base === "") return hash === parts.hash;
    return samePath(pathname, parts.base) && hash === parts.hash;
  };

  // Scroll spy: automatically update hash while scrolling (current route only)
  const inPageAnchors = useMemo(() => {
    return links
      .map((l) => splitBaseAndHash(l.href))
      .filter((p) => p.hash && (p.base === "" || samePath(p.base, pathname)))
      .map((p) => p.hash.slice(1));
  }, [pathname]);

  // Suppress scroll-spy briefly after a manual nav click
  const lastManualNavRef = useRef(0);
  const markManualNav = () => {
    lastManualNavRef.current = performance.now();
  };
  const SPY_SUPPRESS_MS = 600;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!inPageAnchors.length) return;

    const setHashSafe = (id: string) => {
      const next = `#${id}`;
      if (window.location.hash === next) return;
      const base = window.location.pathname + window.location.search;
      history.replaceState(null, "", base + next);
      // Defer notifying the store to the next frame
      scheduleHashChange();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore scroll-spy updates right after a manual nav
        if (performance.now() - lastManualNavRef.current < SPY_SUPPRESS_MS) {
          return;
        }

        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const best = visible[0];
        if (best.target.id) setHashSafe(best.target.id);
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    inPageAnchors.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [inPageAnchors]);

  // Click-away + Escape to close on mobile
  useEffect(() => {
    if (!isMobileOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = islandRef.current;
      if (el && e.target instanceof Node && !el.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileOpen]);

  return (
    <header className="font-mono pointer-events-none fixed inset-x-0 top-3 z-50 sm:top-4 md:top-6">
      <div className="mx-auto w-full max-w-3xl px-3 sm:px-4 pointer-events-auto">
        {/* Backdrop that closes the menu when tapping outside (mobile only) */}
        {isMobileOpen && (
          <button
            aria-label="Close menu backdrop"
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
            tabIndex={-1}
            style={{ background: "transparent" }} // or 'rgba(0,0,0,0.3)' to dim
          />
        )}

        <div
          ref={islandRef}
          className={[
            "relative z-50 overflow-hidden border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60",
            "transition-[box-shadow,border-radius] duration-300",
            scrolled ? "shadow-lg" : "shadow-sm",
            isMobileOpen ? "rounded-2xl" : "rounded-[18px]",
            "w-full",
          ].join(" ")}
        >
          {/* Top bar row */}
          <div className="flex h-12 items-center gap-2 px-2 pl-3 pr-2">
            {/* Mobile toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-expanded={isMobileOpen}
                aria-controls="island-mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="font-semibold tracking-tight"
              aria-label="Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="currentColor"
                    d="M73.232,28.96c-5.631,0-10.194,4.567-10.194,10.197 c0,8.74-4.368,13.108-13.11,13.108c-8.737,0-13.111-4.369-13.111-13.108c0-5.63-4.563-10.197-10.194-10.197 s-10.194,4.567-10.194,10.197c0,5.631,4.563,10.198,10.194,10.198c8.742,0,13.111,4.369,13.111,13.111 c0,5.631,4.563,10.194,10.195,10.194c5.63,0,10.2-4.563,10.2-10.194c0-8.742,4.368-13.111,13.104-13.111 c5.637,0,10.2-4.567,10.2-10.198C83.433,33.527,78.869,28.96,73.232,28.96z"
                  />
                </g>
              </svg>
            </Link>

            {/* Desktop nav */}
            <nav className="mx-2 hidden md:flex flex-1 items-center justify-center gap-3">
              {links.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={markManualNav}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative rounded-lg px-3 py-1.5 text-sm",
                      "transition-colors duration-200",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    ].join(" ")}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg bg-muted"
                        transition={{
                          type: "spring",
                          duration: 0.5,
                          bounce: 0.25,
                        }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Theme toggle */}
            <div className="ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-background text-foreground border border-border shadow-sm hover:bg-muted/60"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>

          {/* Collapsible island content (mobile) */}
          <div
            id="island-mobile-nav"
            className="md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
            style={{
              maxHeight: isMobileOpen ? contentH : 0,
              opacity: isMobileOpen ? 1 : 0,
            }}
            aria-hidden={!isMobileOpen}
          >
            <div ref={contentRef}>
              <Separator />
              <nav className="px-2 py-2">
                {links.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => {
                        markManualNav();
                        setMobileOpen(false); // close on navigation
                      }}
                      className={[
                        "flex items-center gap-3 rounded-md px-3 py-2 my-2 text-sm transition-colors",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      ].join(" ")}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {label}
                    </Link>
                  );
                })}
              </nav>

              <Separator className="my-2" />

              <div className="px-4 pb-3">
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* End collapsible */}
        </div>
      </div>
    </header>
  );
}
