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
      className={`mt-4 cursor-pointer rounded-xl border bg-black/30 p-5 transition-colors ${
        isOpen ? "border-[#E91E63]/80" : "border-white/15 hover:border-[#E91E63]"
      }`}
      aria-expanded={isOpen}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-lg font-semibold text-white">{title}</h4>
        <span className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/60">
          {isOpen ? "Hide" : "Show"}
        </span>
      </div>

      {isOpen ? <div className="mt-4 text-white/80">{children}</div> : null}
    </div>
  );
}
