import type { EbaFact } from "@/content/eba/strategy-details";

type EbaFactListProps = {
  facts: EbaFact[];
};

export function EbaFactList({ facts }: EbaFactListProps) {
  if (!facts.length) return null;

  return (
    <dl className="divide-y divide-[color:var(--border-soft)]">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid gap-1 py-3 first:pt-0 last:pb-0"
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-muted)]">
            {fact.label}
          </dt>
          <dd className="mt-2 text-sm leading-6 text-[color:var(--text-strong)]">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
