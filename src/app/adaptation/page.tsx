import Image from "next/image";
import Link from "next/link";
import { mainAreas } from "@/content/main-areas";
import {
  ArrowRight,
  BookOpenText,
  Film,
  Leaf,
  Map as MapIcon,
} from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";

const discoverMoreLinks =
  mainAreas.find((area) => area.id === "adaptation")?.categories ?? [];

const discoverMoreIcons = {
  "/adaptation/eba-strategies": Leaf,
  "/adaptation/pilot-experiences": Film,
  "/adaptation": MapIcon,
};

export default function AdaptationPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <section className="mt-12 border-b border-[color:var(--border-soft)] px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/15 text-[color:var(--accent-strong)]">
                  <Leaf className="h-4 w-4" />
                </span>
                <span>Winemap Adaptation</span>
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
                Working with nature in vineyard landscapes
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-base)]">
                Across Europe, winegrowers are already witnessing the tangible
                effects of climate change. WINEMAP Adaptation explores how
                vineyard management can become more resilient, multifunctional,
                and sustainable.
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
              Climate pressure
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7 text-[color:var(--text-base)]">
                Across Europe, especially in the Alpine regions, winegrowers are
                already witnessing the tangible effects of climate change.
                Rising temperatures, shifting precipitation patterns, and more
                frequent extreme events are reshaping the conditions under which
                grapes are grown.
              </p>

              <p className="leading-7">
                While these changes pose significant challenges, they also open
                new opportunities to rethink how vineyards are managed and how
                they can become more resilient and sustainable in the future.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              From concepts to practice
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                Over the past decade, several approaches have emerged to guide
                the transition towards more resilient agricultural systems.
                Among these,{" "}
                <GlossaryTermPopover id="ecosystem-based-adaptation">
                  Ecosystem-based Adaptation
                </GlossaryTermPopover>{" "}
                (EbA) promotes the use of biodiversity and{" "}
                <GlossaryTermPopover id="ecosystem-functions">
                  ecosystem functions
                </GlossaryTermPopover>{" "}
                to help agricultural systems adapt to climate change. EbA builds
                on the broader concept of{" "}
                <GlossaryTermPopover id="nature-based-solutions">
                  Nature-based Solutions (NbS)
                  </GlossaryTermPopover>,
                approaches that harness natural processes to address
                environmental and societal challenges, while placing a stronger
                emphasis on climate adaptation.
              </p>

              <p className="leading-7">
                In vineyard systems, this means managing ecosystems in ways that
                strengthen their capacity to buffer climate impacts while
                maintaining productivity and environmental health. Importantly,
                EbA is not implemented through fixed solutions, but through
                adaptive management, an iterative process in which practices are
                continuously adjusted based on observation, learning, and
                feedback from the system.
              </p>

              <p className="leading-7">
                This approach encourages winegrowers to view vineyard landscapes
                as dynamic systems, where management evolves over time in
                response to changing environmental conditions. In this context,
                the concept of vinecology further supports the integration of
                ecological and agronomic principles, promoting vineyard systems
                that simultaneously sustain production, biodiversity, and
                long-term ecosystem functioning.
              </p>

              <p className="leading-7">
                Together, these approaches highlight a fundamental principle:
                diversity and ecological complexity are key to{" "}
                <GlossaryTermPopover id="resilience">
                  resilience
                </GlossaryTermPopover>
                . By enhancing biodiversity at field, farm, and landscape
                scales, vineyards can better withstand climate variability,
                reduce external inputs, and maintain multiple ecosystem
                functions. EbA therefore represents not just a set of practices,
                but a systemic shift in how vineyards are managed, moving from
                simplified, input-dependent systems towards more diverse,
                self-regulating, and resilient agroecosystems.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--border-soft)] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Multifunctional vineyards
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                Translating Ecosystem-based Adaptation into practice means
                managing vineyards as multifunctional systems, capable of
                delivering multiple benefits simultaneously. Beyond grape
                production, vineyard landscapes can provide a wide range of{" "}
                <GlossaryTermPopover id="ecosystem-services">
                  ecosystem services
                </GlossaryTermPopover>
                , including biodiversity conservation, soil protection, water
                regulation, and climate mitigation.
              </p>

              <p className="leading-7">
                The concept of ecosystem multifunctionality reflects a shift
                from focusing on single outputs towards recognising vineyards as
                complex systems where ecological, economic, and social functions
                interact. Multifunctionality also helps reconcile the
                long-standing debate between agricultural production and nature
                conservation.
              </p>

              <p className="leading-7">
                Rather than separating these objectives, vineyard systems can be
                designed to integrate them, creating win-win solutions where
                productivity, environmental sustainability, and cultural values
                coexist. In this way, multifunctional vineyards not only adapt
                better to changing environmental conditions but also contribute
                to preserving the identity and long-term viability of vineyard
                landscapes.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--border-soft)] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[10rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Bridging knowledge and action
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                Based on these principles, WINEMAP Adaptation aims to empower
                winegrowers, advisors, and policymakers to move towards more
                resilient, multifunctional vineyard systems, where production,
                environmental sustainability, and{" "}
                <GlossaryTermPopover id="cultural-heritage">
                  cultural heritage
                </GlossaryTermPopover>{" "}
                can coexist and thrive under changing climatic conditions.
              </p>

              <p className="leading-7">
                To this end, it provides a structured overview of
                Ecosystem-based Adaptation strategies tailored to viticulture,
                translating concepts into concrete and actionable practices. At
                the same time, adaptation is inherently context-specific.
                Strategies that are effective in one region may not be suitable
                in another, as local environmental conditions, grape varieties,
                and socio-economic factors strongly influence both feasibility
                and outcomes.
              </p>

              <p className="leading-7">
                Recognising this complexity, WINEMAP Adaptation offers users
                accessible, science-based information that links practices to
                their ecological conditions, functions, and benefits.
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
