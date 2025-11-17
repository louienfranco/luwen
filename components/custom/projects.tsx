"use client";

import React, {
  forwardRef,
  memo,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "motion/react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
};

const projects: Project[] = [
  {
    id: "p1",
    title: "Project One",
    description:
      "A sleek, responsive web app focused on performance and delightful UX. Built with Next.js and Tailwind.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
  },
  {
    id: "p2",
    title: "Project Two",
    description:
      "Data-heavy dashboard with real-time updates and smooth interactions. Designed for clarity and speed.",
    tags: ["React", "Charts", "Realtime"],
  },
  {
    id: "p3",
    title: "Project Three",
    description:
      "Multi-platform design system with accessible, reusable UI patterns to accelerate product development.",
    tags: ["Design System", "Accessibility", "Theming"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
};

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Keep a ref in sync so rAF handler can compare without re-binding listeners
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Pick the panel whose center is closest to the viewport center
  useEffect(() => {
    let rAF = 0;

    const update = () => {
      const vhCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const d = Math.abs(center - vhCenter);
        if (d < bestDistance) {
          bestDistance = d;
          bestIndex = i;
        }
      });

      if (bestIndex !== activeRef.current) {
        activeRef.current = bestIndex;
        setActive(bestIndex);
      }
    };

    const schedule = () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Initial run
    schedule();

    return () => {
      if (rAF) cancelAnimationFrame(rAF);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const current = useMemo(() => projects[active] ?? projects[0], [active]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-12 md:py-20 scroll-mt-24"
    >
      {/* Mobile-only header */}
      <header className="mb-6 md:mb-8 md:hidden">
        <h2
          id="projects-heading"
          className="text-2xl md:text-4xl font-bold tracking-tight"
        >
          Projects
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          On desktop: left stays centered, right scrolls. The active project is
          the card closest to the viewport center. On mobile: each card shows
          its own details.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {/* Left: sticky content (desktop only) */}
        <div className="hidden md:col-span-5 md:block">
          <div className="md:sticky md:top-24 lg:top-28 xl:top-32">
            <div className="md:h-[calc(100vh-20rem)] flex items-center">
              <div className="w-full">
                {/* Desktop-only header above the title + desc */}
                <div className="hidden md:block mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                    Projects
                  </h2>
                  <p className="mt-2 text-muted-foreground max-w-2xl">
                    On desktop: left stays centered, right scrolls. The active
                    project is the card closest to the viewport center. On
                    mobile: each card shows its own details.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    variants={fadeUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.4 }}
                    aria-live="polite"
                  >
                    <h3 className="text-xl md:text-2xl font-extrabold">
                      {current.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      {current.description}
                    </p>

                    {current.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2" role="list">
                        {current.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-1 rounded-md border bg-muted/30"
                            role="listitem"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right: scrolling column */}
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6 md:gap-12">
            {projects.map((p, i) => (
              <ObservedPanel
                key={p.id}
                index={i}
                project={p}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const MemoProjectsSection = memo(ProjectsSection);

/**
 * A single scrolling panel. We keep the reveal animations,
 * and forward the wrapper ref so the parent can measure it.
 */
const ObservedPanel = memo(
  forwardRef<HTMLDivElement, { index: number; project: Project }>(
    function ObservedPanel({ index, project }, ref) {
      return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="flex items-start md:items-center py-1 md:py-0 min-h-0 md:min-h-[75vh]"
        >
          <div className="w-full">
            <ProjectMediaPlaceholder index={index} />

            {/* Mobile meta (visible on small screens) */}
            <div className="md:hidden mt-3">
              <h3 className="text-base font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description}
              </p>
              {project.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-md border bg-muted/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      );
    }
  )
);

/**
 * Visual placeholder card for project media (image/video).
 */
const ProjectMediaPlaceholder = memo(function ProjectMediaPlaceholder({
  index,
}: {
  index: number;
}) {
  const patternId = useId();

  return (
    <motion.div
      className="relative w-full aspect-16/10 md:aspect-4/3 rounded-2xl border overflow-hidden bg-muted/30"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-secondary/20" />

      {/* Grid pattern */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border bg-background/70 px-4 py-2 text-sm font-medium backdrop-blur">
          Placeholder • #{index + 1}
        </div>
      </div>
    </motion.div>
  );
});
