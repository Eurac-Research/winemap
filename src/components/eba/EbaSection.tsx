import type { ReactNode } from "react";

type EbaSectionProps = {
  id?: string;
  title: string;
  children: ReactNode;
};

export function EbaSection({ id, title, children }: EbaSectionProps) {
  const sectionId =
    id ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <section
      id={sectionId}
      className="scroll-mt-28 border-t border-[color:var(--border-soft)] py-8 first:border-t-0 first:pt-0"
    >
      <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-8 text-[color:var(--text-base)]">
        {children}
      </div>
    </section>
  );
}
