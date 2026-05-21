import Link from "next/link";
import { mainAreas } from "@/content/main-areas";
import {
  ArrowRight,
  Layers,
  Leaf,
  Map as MapIcon,
  ShieldAlert,
  ThermometerSun,
} from "lucide-react";

import ImageComparisonSlider from "@/components/ImageComparisonSlider";

const landscapeValues = [
  {
    title: "Ecosystem services",
    description:
      "Vineyard landscapes support grape production, biodiversity, soil functions, water regulation, and natural pest control.",
    icon: Leaf,
  },
  {
    title: "Terroir and identity",
    description:
      "Climate, soil, landscape, and human knowledge shape the distinctive character and cultural identity of wines.",
    icon: Layers,
  },
  {
    title: "Climate-related risks",
    description:
      "Changing temperature and precipitation patterns affect vine growth, grape composition, and the suitability of wine-growing areas.",
    icon: ShieldAlert,
  },
];

const discoverMoreLinks =
  mainAreas
    .find((area) => area.id === "climate-environment")
    ?.categories.filter((category) =>
      [
        "/map-applications/environment-browser",
        "/map-applications/vulnerability-explorer",
      ].includes(category.href),
    ) ?? [];

const discoverMoreIcons = {
  "/map-applications/environment-browser": MapIcon,
  "/map-applications/vulnerability-explorer": ShieldAlert,
};

export default function ClimateEnvironmentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article>
        <section className="border-b border-[color:var(--border-soft)] px-6 py-24 mt-12">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/15 text-[color:var(--accent-strong)]">
                  <ThermometerSun className="h-4 w-4" />
                </span>
                <span>Winemap Environment</span>
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
                Understanding the foundations of vineyard landscapes
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-base)]">
                Vineyard landscapes across Europe are dynamic socio-ecological
                systems shaped by the interaction between agricultural
                practices, environmental conditions, and cultural heritage.
              </p>
            </div>

            <div className="border border-[color:var(--border-soft)] bg-white px-5 py-4 shadow-[0_24px_60px_rgba(21,20,18,0.12)]">
              <ImageComparisonSlider
                beforeImage="/images/indicators/huglin_1981_2010.png"
                afterImage="/images/indicators/huglin_2071_2100.png"
                beforeLabel="1981-2010"
                afterLabel="2071-2100"
                alt="Huglin Index Comparison"
                aspectRatio="auto"
                labelPosition="bottom"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[color:var(--border-soft)] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[8rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Vineyard landscapes
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7 text-[color:var(--text-base)]">
                For centuries, vineyard landscapes across Europe have evolved
                into complex systems that are deeply embedded in local
                economies, environments, and cultural traditions. Far from being
                mere production areas, these landscapes represent dynamic
                socio-ecological systems shaped by long-standing interactions
                between human activities and natural processes.
              </p>

              <p className="leading-7">
                Vineyard landscapes provide a wide range of ecosystem services,
                the benefits that nature offers to society. While their economic
                importance is primarily linked to grape and wine production,
                their value extends far beyond this. The mosaic of land uses
                surrounding vineyards, including forests, croplands, and
                riparian areas, supports biodiversity and ensures the proper
                functioning of ecosystems. At the same time, these landscapes
                embody strong cultural and historical identities, offering
                intangible benefits that shape local traditions, attract
                tourism, and reinforce the connection between communities and
                their environment.
              </p>

              <p className="leading-7">
                This interplay between environmental conditions, agricultural
                practices, and cultural heritage is at the heart of the concept
                of terroir. Terroir reflects how the unique combination of
                climate, soil, landscape, and human knowledge defines the
                distinctive character of wines. In this sense, the quality and
                identity of wine are not only rooted in the land, but also in
                the cultural practices and traditions that have developed over
                generations.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[8rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Pressures and change
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                However, the ecological balance that underpins these systems is
                increasingly under pressure. Vineyard landscapes are highly
                sensitive to both environmental and human-induced changes, which
                can disrupt the provision of key ecosystem services.
              </p>

              <p className="leading-7">
                One of the most pressing challenges is climate change. Shifts in
                temperature and precipitation patterns are already affecting
                vine growth cycles, grape composition, and the suitability of
                traditional wine-growing areas. These changes may alter not only
                productivity, but also the identity and quality of wines,
                potentially redefining the geographical areas where certain
                varieties can thrive. As climatic conditions continue to evolve,
                winegrowers are being forced to reconsider established practices
                and explore new approaches, including changes in cultivation
                techniques, grape varieties, or even the relocation of
                vineyards.
              </p>

              <p className="leading-7">
                At the same time, vineyard landscapes are undergoing significant
                transformations driven by agricultural intensification. In
                response to increasing market competition and changing consumer
                demands, many vineyards have shifted towards more intensive and
                specialized production systems. This often involves simplifying
                landscape structures, reducing diversity, and focusing on
                maximizing grape yields. While these approaches can enhance
                short-term productivity, they frequently come at the cost of
                environmental sustainability.
              </p>

              <p className="leading-7">
                The expansion of monocultures and the increased use of
                fertilizers and pesticides have contributed to biodiversity loss
                and the degradation of essential ecosystem functions. Services
                such as soil fertility, water regulation, and natural pest
                control are increasingly compromised, making vineyard systems
                more vulnerable to external disturbances. In parallel,
                traditional, smaller-scale vineyards are often abandoned due to
                lower economic competitiveness, leading to further landscape
                homogenization or conversion to other land uses.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[color:var(--border-soft)] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[8rem_minmax(0,1fr)]">
            <aside className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              WINEMAP Environment
            </aside>

            <div className="grid max-w-4xl gap-5 text-[color:var(--muted-foreground)]">
              <p className="leading-7">
                Together, these pressures highlight the urgent need to better
                understand and manage vineyard landscapes as multifunctional
                vineyard systems. Assessing their ecological conditions, mapping
                ecosystem services, and identifying areas of vulnerability are
                essential steps toward more sustainable and resilient
                viticulture.
              </p>

              <p className="leading-7">
                In this context, the WINEMAP Environment provides spatially
                explicit, accessible information on environmental conditions,
                ecosystem services, and climate-related risks, supporting
                winegrowers, researchers, and policymakers in making informed
                decisions. Ultimately, this knowledge base helps guide the
                transition toward more sustainable vineyard management practices
                that can preserve both the ecological integrity and cultural
                heritage of European wine landscapes.
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

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {discoverMoreLinks.map((category) => {
                const Icon =
                  discoverMoreIcons[
                    category.href as keyof typeof discoverMoreIcons
                  ] ?? MapIcon;
                const label = category.label.replace(/\s*[-–—]*>\s*$/, "");

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
                    <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                      {label}
                    </h3>
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
