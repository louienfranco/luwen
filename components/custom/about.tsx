import { Separator } from "@/components/ui/separator";
import {
  Cpu,
  MapPin,
  Laptop,
  Code2,
  Rocket,
  Coffee,
  BookOpen,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export default function AboutMinimal() {
  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: MapPin, label: "City", value: "Batangas" },
    { icon: Cpu, label: "AI assistant", value: "GPT5 High" },
    { icon: Laptop, label: "System", value: "Linux/Windows" },
  ];

  const highlights: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: Code2, title: "Frontend", text: "React, Next.js, Tailwind" },
    { icon: Rocket, title: "Experience", text: "Building UIs" },
    { icon: Coffee, title: "Interests", text: "Coffee & design systems" },
    { icon: BookOpen, title: "Learning", text: "Web performance & a11y" },
    { icon: Users, title: "Collaboration", text: "Mentoring & teamwork" },
    { icon: Sparkles, title: "Focus", text: "DX & polish" },
  ];

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-10 md:pt-14 pb-6 md:pb-8"
    >
      <header className="mb-6 md:mb-8 mt-10 sm:mt-10 lg:mt-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">About</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Meet a skilled Front‑end Developer.
        </p>
      </header>

      <div className="rounded-2xl border">
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-6 md:gap-10 px-5 md:px-8 lg:px-10 pt-5 md:pt-6 lg:pt-6 pb-4 md:pb-5 lg:pb-4">
          {/* Content (left on md+) */}
          <div className="md:order-1 md:col-span-7 lg:col-span-8 md:p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Introduction
            </p>

            <h3 className="mt-2 text-xl md:text-xl lg:text-xl font-extrabold leading-tight">
              Front‑end Developer passionate about tech, coffee, and personal
              projects
            </h3>

            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I build dynamic user experiences with React, Next.js, and
                Tailwind CSS. I’m focused on impactful projects and continuous
                growth.
              </p>
              <p>
                Beyond coding, I share knowledge, help others improve their
                skills, and stay current with the latest in web development.
              </p>
            </div>

            {/* Mobile-only Highlights (before separator) */}
            <div className="md:hidden mt-4">
              <div className="rounded-xl border p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Highlights
                </p>
                <ul className="mt-3 grid grid-cols-1 gap-3">
                  {highlights.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="flex items-start gap-3">
                      <Icon className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-sm text-muted-foreground">{text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="my-4 lg:my-5" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 lg:gap-y-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-mono text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights (right on md+) */}
          <div className="hidden md:block md:order-2 md:col-span-5 lg:col-span-4">
            <div className="rounded-xl border p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Highlights
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-3">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
