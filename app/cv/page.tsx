// app/cv/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/custom/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "CV / Résumé — Under Development",
  description: "This page is currently under development.",
  robots: { index: false, follow: true },
};

export default function CvPage() {
  return (
    <>
      {/* Top-left back button (no navbar) */}
      <div className="fixed left-4 top-4 z-40">
        <Button
          asChild
          size="icon"
          variant="outline"
          className="rounded-full bg-background/70 backdrop-blur"
        >
          <Link href="/" aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <section
          aria-labelledby="cv-status-title"
          className="mx-auto max-w-2xl rounded-2xl border bg-background/60 p-6 md:p-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground">
              Status
            </span>
            <span className="text-xs text-muted-foreground">
              Under development
            </span>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/60">
              <Wrench className="h-5 w-5 text-foreground" aria-hidden="true" />
            </div>
            <h1
              id="cv-status-title"
              className="text-2xl font-semibold tracking-tight md:text-3xl"
            >
              CV / Résumé page is under development
            </h1>
          </div>

          <p className="text-muted-foreground">
            I’m preparing a polished, up-to-date CV page. In the meantime, feel
            free to reach out or check back soon.
          </p>

          <div className="mt-6 h-1 w-full overflow-hidden rounded bg-muted">
            <div className="h-full w-1/2 animate-pulse bg-primary" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/contact">
                <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                Contact me
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
