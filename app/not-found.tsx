"use client";

import { usePathname } from "next/navigation";
import { useId } from "react";
import { ArrowLeft, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pure, deterministic hash (no Math.random/Date.now)
function stableIdFrom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36).toUpperCase().padStart(8, "0").slice(0, 8);
}

export default function NotFound() {
  const pathname = usePathname();
  const rid = useId();
  const requestId = stableIdFrom(`${rid}|${pathname}`);

  return (
    <main className="font-mono relative flex min-h-screen items-center justify-center bg-background px-4 py-16">
      {/* Subtle grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-20 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(120,119,198,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,119,198,0.25)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <section className="w-full max-w-2xl">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          404 • not found
        </p>
        <h1 className="mt-2 text-center text-2xl">endpoint not found</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          the resource you requested doesn’t exist or has moved.
        </p>

        {/* Terminal-style trace (left-aligned) */}
        <div className="mt-6 rounded-md border border-dashed bg-muted/20 p-4 text-left text-xs text-muted-foreground">
          <div className="mb-2 flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>trace</span>
          </div>
          <pre className="overflow-x-auto">
            {`$ curl -I https://your-it-site.dev${pathname}
> GET ${pathname} HTTP/2
< 404 Not Found
< x-request-id: REQ-${requestId}
`}
          </pre>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            go back
          </Button>
        </div>
      </section>
    </main>
  );
}
