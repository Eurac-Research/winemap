"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { glossaryTerms, type GlossaryTerm } from "@/content/glossary";

type GlossaryTermPopoverProps = {
  id: GlossaryTerm["id"];
  children?: ReactNode;
  className?: string;
};

function getReferenceTypeLabel(
  type: NonNullable<GlossaryTerm["references"]>[number]["type"],
) {
  if (type === "doi") return "DOI";
  if (type === "website") return "Website";
  return "Reference";
}

export function GlossaryTermPopover({
  id,
  children,
  className,
}: GlossaryTermPopoverProps) {
  const popoverId = useId();
  const [isPinned, setIsPinned] = useState(false);
  const glossaryTerm = glossaryTerms.find((term) => term.id === id);

  if (!glossaryTerm) return <>{children}</>;

  const label = children ?? glossaryTerm.term;
  const references = glossaryTerm.references?.filter((reference) =>
    reference.label.trim(),
  );

  const closeOnEscape = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Escape") setIsPinned(false);
  };

  return (
    <span
      className="group/glossary relative inline-block"
      onKeyDown={closeOnEscape}
      onMouseLeave={() => setIsPinned(false)}
    >
      <button
        type="button"
        aria-describedby={popoverId}
        aria-expanded={isPinned}
        onClick={() => setIsPinned((current) => !current)}
        className={cn(
          "cursor-help border-0 border-b border-dotted border-[color:var(--accent-strong)] bg-transparent p-0 text-inherit decoration-transparent underline-offset-4 transition-colors hover:text-[color:var(--accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-strong)]",
          className,
        )}
      >
        {label}
      </button>

      <span
        id={popoverId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface)] p-4 text-left text-sm leading-relaxed text-[color:var(--text-base)] shadow-[0_18px_45px_rgba(15,23,42,0.18)] group-hover/glossary:block group-focus-within/glossary:block",
          isPinned && "block",
        )}
      >
        <span className="block text-base font-semibold text-[color:var(--text-strong)]">
          {glossaryTerm.term}
        </span>
        <span className="mt-2 block">{glossaryTerm.definition}</span>

        {references?.length ? (
          <span className="mt-3 block border-t border-[color:var(--border-soft)] pt-3">
            {references.map((reference) => {
              const typeLabel = getReferenceTypeLabel(reference.type);

              return (
                <span
                  key={`${reference.label}-${reference.href ?? ""}`}
                  className="mt-2 block first:mt-0"
                >
                  {reference.href ? (
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noreferrer"
                      className="pointer-events-auto inline-flex items-baseline gap-1 font-medium text-[color:var(--accent-strong)] underline underline-offset-4"
                    >
                      <span>{typeLabel}</span>
                      <ExternalLink
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <span className="font-medium text-[color:var(--text-strong)]">
                      {typeLabel}
                    </span>
                  )}
                  <span className="ml-2">{reference.label}</span>
                </span>
              );
            })}
          </span>
        ) : null}
      </span>
    </span>
  );
}
