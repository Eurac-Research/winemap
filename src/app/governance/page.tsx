import Image from "next/image";
import Link from "next/link";
import { mainAreas } from "@/content/main-areas";
import {
  ArrowRight,
  BookOpenText,
  Users,
  Scale,
  GraduationCap,
} from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";

const discoverMoreLinks =
  mainAreas.find((area) => area.id === "governance")?.categories ?? [];

const discoverMoreIcons = {
  "/governance/eu-policy": Scale,
  "/governance/participatory-approaches": Users,
  "/governance/courses": GraduationCap,
};

export default function GovernancePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <section className="mt-12 border-b border-[color:var(--border-soft)] px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/15 text-[color:var(--accent-strong)]">
                  <Scale className="h-4 w-4" />
                </span>
                <span>Winemap Governance</span>
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
                Text 1
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-base)]">
                Text 2
              </p>
            </div>

            <figure className="overflow-hidden border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] shadow-[0_24px_60px_rgba(21,20,18,0.12)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/vineyard_sun.jpg"
                  alt="Sunlit vineyard landscape"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-[color:var(--border-soft)] px-5 py-4 text-sm leading-6 text-[color:var(--muted-foreground)]">
                Adaptation in viticulture starts from the vineyard landscape:
                soil, biodiversity, water, management, and local knowledge.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-y border-[color:var(--border-soft)] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Part 1
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7 text-[color:var(--text-base)]">
                Text in part 1
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Part 2
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                Text in part 2
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--border-soft)] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Part 3
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                Text in part 3
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--border-soft)] bg-[color:var(--surface-panel-muted)] px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
                Discover more
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {discoverMoreLinks.map((category) => {
                const Icon =
                  discoverMoreIcons[
                    category.href as keyof typeof discoverMoreIcons
                  ] ?? BookOpenText;
                const label = category.label.replace(/\s*->\s*$/, "");

                return (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="group border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-6 transition-colors hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--surface-panel-strong)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Icon className="h-6 w-6 text-[color:var(--accent-strong)]" />
                      <ArrowRight className="h-5 w-5 text-[color:var(--accent-strong)] transition-transform group-hover:translate-x-1" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                      {label}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
                      {category.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
