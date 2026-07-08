import { glossaryTerms, type GlossaryTerm } from "@/content/glossary";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Glossary | WINEMAP",
  description:
    "Scientific and technical terms used across the WINEMAP application.",
};

function getGroupLetter(term: string) {
  const letter = term.trim().charAt(0).toUpperCase();
  return /^[A-Z]$/.test(letter) ? letter : "#";
}

function getReferenceTypeLabel(
  type: NonNullable<GlossaryTerm["references"]>[number]["type"],
) {
  if (type === "doi") return "DOI";
  if (type === "website") return "Website";
  return "Reference";
}

function getGroupedTerms() {
  const sortedTerms = [...glossaryTerms].sort((firstTerm, secondTerm) =>
    firstTerm.term.localeCompare(secondTerm.term, "en", {
      sensitivity: "base",
    }),
  );

  return sortedTerms.reduce<Record<string, GlossaryTerm[]>>((groups, term) => {
    const letter = getGroupLetter(term.term);
    groups[letter] = [...(groups[letter] ?? []), term];
    return groups;
  }, {});
}

function GlossaryEntry({ term }: { term: GlossaryTerm }) {
  const references = term.references?.filter((reference) =>
    reference.label.trim(),
  );

  return (
    <article
      id={term.id}
      className="scroll-mt-28 border-t border-[color:var(--border)] py-5 first:border-t-0"
    >
      <h3 className="text-xl font-semibold app-text-color">{term.term}</h3>

      {term.aliases?.length ? (
        <p className="mt-1 app-caption">Also: {term.aliases.join(", ")}</p>
      ) : null}

      <p className="mt-3 max-w-3xl leading-7 app-text-color">
        {term.definition}
      </p>

      {references?.length ? (
        <ul className="mt-3 space-y-2 app-caption">
          {references.map((reference) => {
            const typeLabel = getReferenceTypeLabel(reference.type);

            return (
              <li key={`${reference.label}-${reference.href ?? ""}`}>
                {reference.href ? (
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-baseline gap-1 app-accent-text underline underline-offset-4"
                  >
                    <span>{typeLabel}</span>
                    <ExternalLink
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <span className="font-medium app-text-color">
                    {typeLabel}
                  </span>
                )}
                <span className="ml-2">{reference.label}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </article>
  );
}

export default function GlossaryPage() {
  const groupedTerms = getGroupedTerms();
  const groups = Object.entries(groupedTerms);

  return (
    <main id="top" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-32">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] app-accent-text">
            About WINEMAP
          </p>
          <h1 className="mt-3 app-page-title">Glossary</h1>
          <p className="mt-4 max-w-3xl app-lead app-muted">
            Scientific and technical terms used across the WINEMAP application.
          </p>
        </header>

        <nav
          aria-label="Glossary letter groups"
          className="mt-8 flex flex-wrap gap-2 border-y border-[color:var(--border)] py-4"
        >
          {groups.map(([letter]) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="flex h-9 w-9 items-center justify-center rounded border border-[color:var(--border)] text-sm font-semibold app-text-color transition-colors hover:bg-[color:var(--accent)]"
            >
              {letter}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {groups.map(([letter, terms]) => (
            <section key={letter} id={letter} className="scroll-mt-28">
              <div className="mb-2 flex items-end justify-between gap-4 border-b border-[color:var(--border)] pb-3">
                <h2 className="text-4xl font-semibold app-accent-text">
                  {letter}
                </h2>
                <a
                  href="#top"
                  className="text-sm font-medium app-accent-text underline underline-offset-4"
                >
                  Back to top
                </a>
              </div>

              <div>
                {terms.map((term) => (
                  <GlossaryEntry key={term.id} term={term} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
