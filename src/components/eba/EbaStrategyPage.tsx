import Image from "next/image";
import Link from "next/link";
import {getEbaStrategiesByCategory, type EbaStrategy } from "@/content/eba/catalogue";
import {
  getEbaEcosystemServiceById,
  type EbaServiceIcon,
} from "@/content/eba/ecosystem-services";
import {
  getEbaPotentialChallengeById,
  type EbaChallengeIcon,
} from "@/content/eba/potential-challenges";
import type {
  EbaStrategyChallenge,
  EbaStrategyDetailContent,
} from "@/content/eba/strategy-details";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bug,
  CircleDollarSign,
  Droplets,
  ExternalLink,
  Flower2,
  Grape,
  Hammer,
  Landmark,
  Leaf,
  Mountain,
  ShieldCheck,
  Sprout,
  ThermometerSun,
  Trees,
  Waves,
  BookOpenText,
  type LucideIcon,
} from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import { Button } from "@/components/ui/button";
import { EbaSection } from "./EbaSection";
import { EbaVideoEmbed } from "./EbaVideoEmbed";

type EbaStrategyPageProps = {
  strategy: EbaStrategy;
  content?: EbaStrategyDetailContent;
};

const serviceIconMap: Record<EbaServiceIcon, LucideIcon> = {
  biodiversity: Flower2,
  economy: CircleDollarSign,
  habitat: Trees,
  heritage: Landmark,
  landscape: Mountain,
  "pest-control": Bug,
  production: Grape,
  recreation: Sprout,
  soil: Sprout,
  slope: Mountain,
  temperature: ThermometerSun,
  water: Droplets,
};

const challengeIconMap: Record<EbaChallengeIcon, LucideIcon> = {
  cost: CircleDollarSign,
  degradation: AlertTriangle,
  resources: Waves,
  technical: Hammer,
  viability: ShieldCheck,
  water: Droplets,
};

function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[color:var(--accent-strong)]/25 bg-[color:var(--primary)]/20 text-[color:var(--accent-strong)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-semibold leading-tight text-[color:var(--foreground)] md:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

function EcosystemServicesGrid({
  serviceEntries,
}: {
  serviceEntries: NonNullable<EbaStrategyDetailContent["ecosystemServices"]>;
}) {
  const services = serviceEntries.flatMap((entry) => {
    const service = getEbaEcosystemServiceById(entry.id);
    return service ? [{ service, note: entry.note }] : [];
  });

  if (!services.length) return null;

  return (
    <section id="ecosystem-services">
      <div className="mx-auto max-w-6xl border-y border-[color:var(--border-soft)] px-6 py-12">
        <SectionHeading
          eyebrow="Benefits"
          title="Ecosystem services provided"
          icon={Leaf}
        />

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ service, note }) => {
            const Icon = serviceIconMap[service.icon];

            return (
              <article
                key={service.id}
                className="group/service min-h-28 border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-4 transition-colors hover:border-[color:var(--accent-strong)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <h3 className="pt-1 text-base font-semibold leading-6 text-[color:var(--foreground)]">
                      {service.glossaryId ? (
                        <GlossaryTermPopover
                          id={service.glossaryId}
                          className="border-b-0 text-left hover:text-[color:var(--accent-strong)]"
                        >
                          {service.label}
                        </GlossaryTermPopover>
                      ) : (
                        service.label
                      )}
                    </h3>

                    {note ? (
                      <div className="text-sm leading-7 text-[color:var(--text-base)]">
                        {note}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChallengeList({ challenges }: { challenges: EbaStrategyChallenge[] }) {
  const resolvedChallenges = challenges.flatMap((strategyChallenge) => {
    const challenge = getEbaPotentialChallengeById(strategyChallenge.id);
    return challenge ? [{ ...strategyChallenge, challenge }] : [];
  });

  if (!resolvedChallenges.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <SectionHeading
        eyebrow="Implementation"
        title="Potential challenges"
        icon={AlertTriangle}
      />

      <div className="mt-7 grid gap-4 md:grid-cols-2">
        {resolvedChallenges.map(({ id, details, challenge }) => {
          const Icon = challengeIconMap[challenge.icon];

          return (
            <article
              key={id}
              className="border-l-4 border-[color:var(--accent-strong)] bg-[color:var(--surface-overlay)] px-5 py-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--surface-panel-muted)] text-[color:var(--accent-strong)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[color:var(--foreground)]">
                    {challenge.label}
                  </h3>
                  {details ? (
                    <div className="mt-2 text-sm leading-7 text-[color:var(--text-base)]">
                      {details}
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function EbaStrategyPage({ strategy, content }: EbaStrategyPageProps) {
  const hasCustomSections = Boolean(content?.sections?.length);
  const hasAbout = Boolean(content?.about);
  const hasEcosystemServices = Boolean(content?.ecosystemServices?.length);
  const hasChallenges = Boolean(content?.challenges?.length);
  const pdfHref = `/factsheets/${strategy.filename}`;
  const hasHeaderImage = Boolean(content?.imagePath);
  const headerImageAlt =
    content?.imageAlt ??
    `${strategy.title} ecosystem-based adaptation strategy`;
  const strategyMetadata = [
    { label: "Category", value: strategy.category },
    { label: "Field of action", value: strategy.field_of_action },
    { label: "Spatial scale", value: strategy.spatial_scale },
  ];
  const similarStrategies = getEbaStrategiesByCategory(strategy.category).filter((eba) => eba.slug != strategy.slug)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-[color:var(--border-soft)] bg-[color:var(--primary)]/10 pt-28">
        {hasHeaderImage && content?.imagePath ? (
          <div
            className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
            style={{ clipPath: "polygon(13% 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <Image
              src={content.imagePath}
              alt={headerImageAlt}
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[color:var(--surface-inverse)]/10" />
          </div>
        ) : null}

        <div className="relative mx-auto max-w-6xl px-6 pb-12">
          <Link
            href="/adaptation/eba-strategies"
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent-strong)] underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to EbA strategies
          </Link>

          <header
            className={
              hasHeaderImage
                ? "mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] lg:items-stretch"
                : "mt-8 max-w-3xl"
            }
          >
            <div className={hasHeaderImage ? "pb-2 lg:pr-8" : undefined}>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                <Leaf className="h-4 w-4" aria-hidden="true" />
                EbA Strategy Factsheet
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-[color:var(--foreground)] md:text-5xl">
                {strategy.title}
              </h1>
              {strategy.summary ? (
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted-foreground)]">
                  {strategy.summary}
                </p>
              ) : null}
              <dl className="mt-7 grid gap-3 sm:grid-cols-3">
                {strategyMetadata.map((item) => (
                  <div
                    key={item.label}
                    className="border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] px-4 py-3"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--accent-strong)]">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium leading-6 text-[color:var(--foreground)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  asChild
                  className="border-[color:var(--border-soft)] bg-[color:var(--surface-panel-strong)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-overlay)]"
                >
                  <a href={pdfHref} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                    Open PDF factsheet
                  </a>
                </Button>
              </div>
            </div>

            {hasHeaderImage && content?.imagePath ? (
              <div className="relative min-h-64 overflow-hidden border border-[color:var(--border-soft)] lg:hidden">
                <Image
                  src={content.imagePath}
                  alt={headerImageAlt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </header>
        </div>
      </section>

      {hasAbout || hasCustomSections ? (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <article className="lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div>
              <SectionHeading
                eyebrow="Overview"
                title="About this strategy"
                icon={Sprout}
              />
            </div>

            <div className="min-w-0 space-y-8">
              {hasAbout ? (
                <div className="mt-8 text-base leading-8 text-[color:var(--text-base)] [&>p+p]:mt-4">
                  {content?.about}
                </div>
              ) : null}

              {hasCustomSections ? (
                <div>
                  {content?.sections?.map((section) => (
                    <EbaSection
                      key={section.id}
                      id={section.id}
                      title={section.title}
                    >
                      {section.children}
                    </EbaSection>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        </section>
      ) : null}

      {hasEcosystemServices && content?.ecosystemServices ? (
        <EcosystemServicesGrid serviceEntries={content.ecosystemServices} />
      ) : null}

      {hasChallenges && content?.challenges ? (
        <ChallengeList challenges={content.challenges} />
      ) : null}

      {content?.videos?.length ? (
        <section className="mx-auto max-w-6xl px-6 pb-16">
          <EbaSection id="videos" title="Videos">
            <div className="grid gap-5">
              {content.videos.map((video) => (
                <EbaVideoEmbed
                  key={video.id}
                  title={video.title}
                  youtubeId={video.youtubeId}
                  caption={video.caption}
                />
              ))}
            </div>
          </EbaSection>
        </section>
      ) : null}

      {!hasAbout &&
      !hasCustomSections &&
      !hasEcosystemServices &&
      !hasChallenges &&
      !content?.videos?.length ? (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-6">
            <p className="text-sm leading-6 text-[color:var(--muted-foreground)]">
              Detailed factsheet content for this strategy is not available yet.
            </p>
          </div>
        </section>
      ) : null}

      <section className="border-t border-[color:var(--border-soft)] bg-[color:var(--surface-panel-muted)] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
              Discover similar EbA strategies
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {similarStrategies.map((strategy) => {
              const hasSummary = Boolean(strategy.summary?.length)

              return (
                <Link
                  key={strategy.slug}
                  href={`/adaptation/eba-strategies/${strategy.slug}`}
                  className="group border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-6 transition-colors hover:border-[color:var(--accent-strong)] hover:bg-[color:var(--surface-panel-strong)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <BookOpenText className="h-6 w-6 text-[color:var(--accent-strong)]" />
                    <ArrowRight className="h-5 w-5 text-[color:var(--accent-strong)] transition-transform group-hover:translate-x-1" />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">
                    {strategy.title}
                  </h2>
                  {hasSummary ? (
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
                    {strategy.summary}
                  </p> ) : null }
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
