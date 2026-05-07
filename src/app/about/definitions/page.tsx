import type { ReactNode } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  Layers,
  ListTree,
} from "lucide-react";

import {
  INDICATOR_CATEGORY_LABELS,
  Indicators,
  type AppId,
  type Indicator,
  type IndicatorCategory,
  type IndicatorReferenceContent,
  type RichTextContent,
  type RichTextSegment,
} from "@/content/indicators";

const CATEGORY_ORDER: IndicatorCategory[] = [
  "climate",
  "topography",
  "ecosystem-services",
  "ecosystem-conditions",
  "vulnerability",
];

const APP_LABELS: Record<AppId, string> = {
  cartography: "Cartography",
  "climate-explorer": "Climate Explorer",
  "environment-browser": "Environment Browser",
};

const APP_HREFS: Partial<Record<AppId, string>> = {
  "environment-browser": "/map-applications/environment-browser",
};

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

export const metadata = {
  title: "Indicator definitions | Winemap",
  description:
    "Definitions, methodology notes, and references for climate, environmental, ecosystem service, topographic, and vulnerability indicators in Winemap.",
};

function extractHref(text: string) {
  const match = text.match(URL_PATTERN);
  return match?.[0]?.replace(/[),.;]+$/, "");
}

function renderLinkedText(text: string) {
  const parts = text.split(URL_PATTERN);

  return parts.map((part, index) => {
    if (part.match(URL_PATTERN)) {
      const href = part.replace(/[),.;]+$/, "");
      const suffix = part.slice(href.length);

      return (
        <span key={`${href}-${index}`}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            {href}
          </a>
          {suffix}
        </span>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function renderSegment(segment: RichTextSegment, index: number) {
  const className = [
    segment.weight === "bold" ? "font-bold" : "",
    segment.weight === "semibold" ? "font-semibold" : "",
    segment.style === "italic" ? "italic" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = segment.href ? (
    <a
      href={segment.href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-4"
    >
      {segment.text}
    </a>
  ) : (
    renderLinkedText(segment.text)
  );

  return (
    <span key={`${segment.text}-${index}`} className={className || undefined}>
      {content}
    </span>
  );
}

function renderRichText(content: RichTextContent) {
  if (typeof content === "string") return renderLinkedText(content);
  if (Array.isArray(content)) return content.map(renderSegment);
  return renderSegment(content, 0);
}

function renderMethodology(methodology: RichTextContent[] | undefined) {
  if (!methodology?.length) return null;

  const nodes: ReactNode[] = [];
  let bulletItems: ReactNode[] = [];

  const flushBullets = () => {
    if (!bulletItems.length) return;

    nodes.push(
      <ul
        key={`methodology-list-${nodes.length}`}
        className="mt-3 list-disc space-y-1 pl-5 text-[color:var(--text-base)]"
      >
        {bulletItems}
      </ul>,
    );
    bulletItems = [];
  };

  methodology.forEach((entry, index) => {
    if (typeof entry === "string") {
      const trimmed = entry.trim();
      if (!trimmed) {
        flushBullets();
        return;
      }

      if (trimmed.startsWith("- ")) {
        bulletItems.push(
          <li key={`methodology-bullet-${index}`}>
            {renderLinkedText(trimmed.slice(2))}
          </li>,
        );
        return;
      }
    }

    flushBullets();
    nodes.push(
      <p
        key={`methodology-${index}`}
        className="mt-1 text-[color:var(--text-base)]"
      >
        {renderRichText(entry)}
      </p>,
    );
  });

  flushBullets();
  return nodes;
}

function getReferenceLabel(reference: IndicatorReferenceContent) {
  return typeof reference === "string" ? reference : reference.label;
}

function getReferenceHref(reference: IndicatorReferenceContent) {
  return typeof reference === "string"
    ? extractHref(reference)
    : reference.href;
}

function renderReference(reference: IndicatorReferenceContent, index: number) {
  const label = getReferenceLabel(reference);
  const href = getReferenceHref(reference);

  return (
    <li key={`${label}-${index}`}>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-baseline gap-1 underline underline-offset-4"
        >
          <span>{label}</span>
          <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        </a>
      ) : (
        renderLinkedText(label)
      )}
    </li>
  );
}

function ExpandableIndicatorSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <details className="group mt-6 rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2 text-base font-semibold text-[color:var(--foreground)]">
          {icon}
          {title}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-[color:var(--muted-foreground)] transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="border-t border-[color:var(--border-soft)] px-4 pb-4 pt-2">
        {children}
      </div>
    </details>
  );
}

function IndicatorArticle({ indicator }: { indicator: Indicator }) {
  const descriptions = indicator.description.filter((paragraph) =>
    paragraph.trim(),
  );
  const references = indicator.references?.filter((reference) =>
    getReferenceLabel(reference).trim(),
  );
  const apps = indicator.apps.filter(
    (app) => indicator.map || app !== "cartography",
  );

  return (
    <article
      id={indicator.id}
      className="scroll-mt-28 rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-strong)]">
            {INDICATOR_CATEGORY_LABELS[indicator.category]}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
            {indicator.name}
          </h2>
          {indicator.subtitle ? (
            <p className="mt-2 max-w-3xl text-[color:var(--muted-foreground)]">
              {indicator.subtitle}
            </p>
          ) : null}
        </div>

        {indicator.map?.unit ? (
          <div className="rounded border border-[color:var(--border-soft)] px-3 py-2 text-sm text-[color:var(--muted-foreground)]">
            Unit: {indicator.map.unit}
          </div>
        ) : null}
      </div>

      {descriptions.length ? (
        <section className="mt-6">
          <h3 className="flex items-center gap-2 text-base font-semibold text-[color:var(--foreground)]">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Definition
          </h3>
          <div className="mt-1 space-y-3">
            {descriptions.map((paragraph) => (
              <p key={paragraph} className="text-[color:var(--text-base)]">
                {renderLinkedText(paragraph)}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {indicator.methodology?.length ? (
        <ExpandableIndicatorSection
          title="Methodology"
          icon={<ListTree className="h-4 w-4" aria-hidden="true" />}
        >
          {renderMethodology(indicator.methodology)}
        </ExpandableIndicatorSection>
      ) : null}

      {references?.length ? (
        <ExpandableIndicatorSection
          title="References"
          icon={<ExternalLink className="h-4 w-4" aria-hidden="true" />}
        >
          <ul className="mt-1 list-disc space-y-2 pl-5 text-[color:var(--text-base)]">
            {references.map(renderReference)}
          </ul>
        </ExpandableIndicatorSection>
      ) : null}

      {apps.length ? (
        <section className="mt-6 border-t border-[color:var(--border-soft)] pt-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
            <Layers className="h-4 w-4" aria-hidden="true" />
            Available in
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {apps.map((app) => {
              const label = APP_LABELS[app];
              const href = APP_HREFS[app];

              return href ? (
                <Link
                  key={app}
                  href={href}
                  className="rounded border border-[color:var(--border-soft)] px-3 py-1 text-sm text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--primary)]"
                >
                  {label}
                </Link>
              ) : (
                <span
                  key={app}
                  className="rounded border border-[color:var(--border-soft)] px-3 py-1 text-sm text-[color:var(--muted-foreground)]"
                >
                  {label}
                </span>
              );
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export default function IndicatorDefinitionsPage() {
  const groupedIndicators = CATEGORY_ORDER.map((category) => ({
    category,
    indicators: Indicators.filter(
      (indicator) => indicator.category === category,
    ),
  })).filter((group) => group.indicators.length > 0);

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <header className="px-2 md:px-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
            About Winemap
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)] md:text-5xl">
            Indicator Definitions
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted-foreground)]">
            A single reference page for the indicator definitions, methods, data
            sources, and references used across the Winemap map applications.
          </p>
        </header>

        <nav
          aria-label="Indicator categories"
          className="mt-6 rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-4"
        >
          <div className="flex flex-wrap gap-2">
            {groupedIndicators.map((group) => (
              <a
                key={group.category}
                href={`#${group.category}`}
                className="rounded border border-[color:var(--border-soft)] px-3 py-2 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--primary)]"
              >
                {INDICATOR_CATEGORY_LABELS[group.category]}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-6 space-y-6">
          {groupedIndicators.map((group) => (
            <section
              key={group.category}
              id={group.category}
              className="scroll-mt-28"
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[color:var(--foreground)] md:text-3xl">
                    {INDICATOR_CATEGORY_LABELS[group.category]}
                  </h2>
                  <p className="mt-2 text-[color:var(--muted-foreground)]">
                    {group.indicators.length} indicator
                    {group.indicators.length === 1 ? "" : "s"}
                  </p>
                </div>
                <a
                  href="#top"
                  className="text-sm font-medium text-[color:var(--accent-strong)] underline underline-offset-4"
                >
                  Back to top
                </a>
              </div>

              <div className="space-y-5">
                {group.indicators.map((indicator) => (
                  <IndicatorArticle key={indicator.id} indicator={indicator} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
