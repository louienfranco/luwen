"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { animate } from "motion";

const STOPS =
  "hsl(0 85% 60%), hsl(40 95% 55%), hsl(140 55% 45%), hsl(210 90% 60%), hsl(265 85% 62%), hsl(0 85% 60%)";

type ButtonWithGlowProps = React.ComponentProps<typeof Button> & {
  glowThickness?: number; // vertical thickness in px (default 16)
  glowSqueeze?: number; // vertical squish (1 = normal, 0.5 = flatter)
  glowBlur?: number; // blur radius in px (default 14)
  glowWidth?: number | string; // width (px or %, default "75%")
  glowOffset?: number; // how far below the button (px, default 4)
  glowOpacity?: number; // 0..1 (default 0.7)
};

export function ButtonWithGlow({
  children,
  className,
  glowThickness = 16,
  glowSqueeze = 1,
  glowBlur = 14,
  glowWidth = "75%",
  glowOffset = 4,
  glowOpacity = 1,
  ...props
}: ButtonWithGlowProps) {
  // animate gradient sweep
  const x = useMotionValue(0);
  const pos = useMotionTemplate`${x}% 50%`;

  useEffect(() => {
    const controls = animate(x, [0, 200], {
      duration: 3.2,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [x]);

  const gradient = `linear-gradient(90deg, ${STOPS})`;

  return (
    <Button
      {...props}
      className={["relative overflow-visible", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative z-10">{children}</span>

      {/* Wrapper to center the glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          bottom: -glowOffset,
          transform: "translateX(-50%)",
          width: typeof glowWidth === "number" ? `${glowWidth}px` : glowWidth,
        }}
      >
        {/* Blurred oval glow with adjustable thickness and squeezyness */}
        <motion.span
          style={{
            background: gradient,
            backgroundSize: "300% 100%",
            backgroundPosition: pos,
            height: glowThickness,
            width: "100%",
            borderRadius: 9999,
            filter: `blur(${glowBlur}px)`,
            opacity: glowOpacity,
            scaleY: glowSqueeze,
            display: "block",
          }}
        />
      </span>
    </Button>
  );
}
