"use client";

import { ReactNode, useState } from "react";

type CollapsiblePanelProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsiblePanel({
  title,
  children,
  defaultOpen = false,
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => setIsOpen(prev => !prev);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleToggle();
        }
      }}
      className={`mt-4 cursor-pointer rounded-xl border p-5 transition-colors bg-[color:var(--surface-overlay)] ${
        isOpen
          ? "border-[color:var(--accent-strong)]"
          : "border-[color:var(--border-soft)] hover:border-[color:var(--accent-strong)]"
      }`}
      aria-expanded={isOpen}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-semibold text-[color:var(--text-strong)]">{title}</h4>
        <span className="rounded-md border px-2 py-0.5 text-xs border-[color:var(--border-soft)] text-[color:var(--text-muted)]">
          {isOpen ? "Hide" : "Show"}
        </span>
      </div>

      {isOpen ? <div className="mt-4 text-[color:var(--text-base)]">{children}</div> : null}
    </div>
  );
}
