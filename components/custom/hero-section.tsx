"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ButtonWithGlow } from "@/components/misc/rgb-button";

// Simple fade-up helper
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function AnimatedWords({
  text,
  delayStart = 0,
  step = 0.05,
  className,
  wordClassName,
}: {
  text: string;
  delayStart?: number;
  step?: number;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span
      className={cn("inline-block", className)}
      role="text"
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className={cn("inline-block mr-[0.35ch]", wordClassName)}
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.35, delay: delayStart + i * step }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  // Stagger timings (tweak as needed)
  const g1Base = 0; // group 1 start
  const g1Step = 0.18; // spacing between badge, avatar, h1, p, cta
  const g2Base = 0.9; // group 2 start
  const iconsBase = g2Base + 0.2;
  const iconStep = 0.08;

  // Fade the scroll hint after ~20px of scroll, but spring it so it fades smoothly
  const { scrollY } = useScroll();
  const scrollHintOpacityRaw = useTransform(scrollY, [0, 20], [1, 0]);
  const scrollHintOpacity = useSpring(scrollHintOpacityRaw, {
    stiffness: 110,
    damping: 22,
    mass: 0.35,
  });

  return (
    <section
      className="w-full min-h-screen flex flex-col items-center mt-24 md:mt-32"
      aria-labelledby="hero-heading"
    >
      <div className="container px-4 md:px-6 space-y-10 md:space-y-16 max-w-5xl mx-auto">
        {/* Group 1: badge → avatar → heading → paragraph → CTA */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Badge (above avatar, not overlayed) */}
          <motion.div
            className="inline-block"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: g1Base + 0 * g1Step }}
          >
            <Link
              href="https://github.com/louienfranco"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                badgeVariants({ variant: "outline" }),
                "group rounded-full pl-[5px] py-0.5 pr-2 flex items-center"
              )}
              aria-label="Visit GitHub profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="mr-1.5"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
              </svg>
              louienfranco
            </Link>
          </motion.div>

          {/* Avatar: ring at full size, inner image placeholder inset with a gap (no glow overlays) */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: g1Base + 1 * g1Step }}
          >
            {/* Outer ring with gap via padding */}
            <motion.div
              className="relative h-24 w-24 md:h-28 md:w-28 rounded-full border border-foreground/15 p-2 bg-transparent"
              whileHover={{ scale: 1.03, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              aria-label="Profile image frame"
            >
              {/* Inner image placeholder (fully circular) */}
              <div className="relative h-full w-full rounded-full overflow-hidden bg-muted/40 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-foreground/70"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6s-5 2.686-5 6s2.239 6 5 6m0 2c-4.418 0-8 3.582-8 8h2a6 6 0 0 1 12 0h2c0-4.418-3.582-8-8-8" />
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Heading — gradient applied to each animated word with a safe fallback */}
          <motion.h1
            id="hero-heading"
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl",
              "text-foreground"
            )}
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: g1Base + 2 * g1Step }}
          >
            <AnimatedWords
              text="Louien Franco"
              delayStart={g1Base + 2 * g1Step + 0.05}
              wordClassName={cn(
                "supports-[background-clip:text]:bg-clip-text",
                "supports-[background-clip:text]:text-transparent",
                "supports-[background-clip:text]:[-webkit-text-fill-color:transparent]",
                "supports-[background-clip:text]:bg-gradient-to-br",
                "supports-[background-clip:text]:from-foreground",
                "supports-[background-clip:text]:via-foreground/90",
                "supports-[background-clip:text]:to-foreground/70"
              )}
            />
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            className="text-foreground/80 text-base md:text-lg max-w-2xl"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: g1Base + 3 * g1Step }}
          >
            <AnimatedWords
              text="I craft modern, responsive interfaces that blend design and functionality to deliver seamless user experiences."
              delayStart={g1Base + 3 * g1Step + 0.05}
              step={0.04}
            />
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: g1Base + 4 * g1Step }}
          >
            <Link href="/about">
              <motion.div
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <ButtonWithGlow
                  className="px-7 shadow-none drop-shadow-none"
                  // Subtle, minimal glow using your props API
                  glowThickness={8}
                  glowSqueeze={0.88}
                  glowBlur={10}
                  glowWidth="60%"
                  glowOffset={6}
                  glowOpacity={0.58}
                >
                  Know More!
                </ButtonWithGlow>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Group 2: tagline → icons */}
        <div className="space-y-4 text-center">
          <motion.p
            className="text-sm text-foreground/80"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: g2Base }}
          >
            Powering the next generation of digital products
          </motion.p>

          {/* Icons row with stagger */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-4">
            {[
              <svg
                key="s"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-5 w-5 mr-2"
              >
                <rect width="256" height="256" fill="none" />
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>,
              <svg
                key="v"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 2L2 19.5H22L12 2Z" fill="currentColor" />
              </svg>,
              <svg
                key="r"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 256 228"
              >
                <path
                  fill="#00d8ff"
                  d="M210.483 73.824a172 172 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171 171 0 0 0-6.375 5.848a156 156 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a171 171 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a146 146 0 0 0 6.921 2.165a168 168 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a146 146 0 0 0 5.342-4.923a168 168 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145 145 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844m-6.365 70.984q-2.102.694-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14m-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a157 157 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345q.785 3.162 1.386 6.193"
                />
              </svg>,
              <svg
                key="su"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 256 263"
              >
                <defs>
                  <linearGradient
                    id="logosSupabaseIcon0"
                    x1="20.862%"
                    x2="63.426%"
                    y1="20.687%"
                    y2="44.071%"
                  >
                    <stop offset="0%" stopColor="#249361" />
                    <stop offset="100%" stopColor="#3ecf8e" />
                  </linearGradient>
                  <linearGradient
                    id="logosSupabaseIcon1"
                    x1="1.991%"
                    x2="21.403%"
                    y1="-13.158%"
                    y2="34.708%"
                  >
                    <stop offset="0%" />
                    <stop offset="100%" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#logosSupabaseIcon0)"
                  d="M149.602 258.579c-6.718 8.46-20.338 3.824-20.5-6.977l-2.367-157.984h106.229c19.24 0 29.971 22.223 18.007 37.292z"
                />
                <path
                  fill="url(#logosSupabaseIcon1)"
                  fillOpacity="0.2"
                  d="M149.602 258.579c-6.718 8.46-20.338 3.824-20.5-6.977l-2.367-157.984h106.229c19.24 0 29.971 22.223 18.007 37.292z"
                />
                <path
                  fill="#3ecf8e"
                  d="M106.399 4.37c6.717-8.461 20.338-3.826 20.5 6.976l1.037 157.984H23.037c-19.241 0-29.973-22.223-18.008-37.292z"
                />
              </svg>,
              <svg
                key="tw"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 256 154"
              >
                <defs>
                  <linearGradient
                    id="logosTailwindcssIcon0"
                    x1="-2.778%"
                    x2="100%"
                    y1="32%"
                    y2="67.556%"
                  >
                    <stop offset="0%" stopColor="#2298bd" />
                    <stop offset="100%" stopColor="#0ed7b5" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#logosTailwindcssIcon0)"
                  d="M128 0Q76.8 0 64 51.2Q83.2 25.6 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0M64 76.8q-51.2 0-64 51.2q19.2-25.6 44.8-19.2c-9.737-2.434-16.697-9.499-24.401-17.318C81.751 138.857 96.275 153.6 128 153.6q51.2 0 64-51.2q-19.2 25.6-44.8 19.2c-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8"
                />
              </svg>,
              <svg
                key="nx"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 256 256"
              >
                <defs>
                  <linearGradient
                    id="logosNextjsIcon0"
                    x1="55.633%"
                    x2="83.228%"
                    y1="56.385%"
                    y2="96.08%"
                  >
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="logosNextjsIcon1"
                    x1="50%"
                    x2="49.953%"
                    y1="0%"
                    y2="73.438%"
                  >
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <circle id="logosNextjsIcon2" cx="128" cy="128" r="128" />
                </defs>
                <mask id="logosNextjsIcon3" fill="#fff">
                  <use href="#logosNextjsIcon2" />
                </mask>
                <g mask="url(#logosNextjsIcon3)">
                  <circle cx="128" cy="128" r="128" />
                  <path
                    fill="url(#logosNextjsIcon0)"
                    d="M212.634 224.028L98.335 76.8H76.8v102.357h17.228V98.68L199.11 234.446a128 128 0 0 0 13.524-10.418"
                  />
                  <path
                    fill="url(#logosNextjsIcon1)"
                    d="M163.556 76.8h17.067v102.4h-17.067z"
                  />
                </g>
              </svg>,
            ].map((icon, i) => (
              <motion.div
                key={i}
                className="flex items-center"
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: iconsBase + i * iconStep }}
                whileHover={{ y: -1.5, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Simple scroll hint (now with intro stagger and smooth fade on scroll) */}
      <motion.a
        href="#about" /* change to your next section id */
        aria-label="Scroll to next section"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-foreground/70 hover:text-foreground"
        style={{ opacity: scrollHintOpacity }}
      >
        {/* 1) Frame enters first */}
        <motion.div
          className="h-10 w-6 rounded-full border border-foreground/30 flex items-start justify-center p-2"
          initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45, delay: g2Base + 0.28 }}
        >
          {/* 2) Dot pops in next, still keeps the bounce */}
          <motion.div
            className="h-1 w-1 rounded-full bg-foreground/70 animate-bounce"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: g2Base + 0.38,
            }}
          />
        </motion.div>

        {/* 3) Letters of "Scroll" appear one by one */}
        <span className="mt-1 text-xs uppercase tracking-wider flex">
          {"Scroll".split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3, delay: g2Base + 0.5 + i * 0.05 }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      </motion.a>
    </section>
  );
}
