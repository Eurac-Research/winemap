"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import type {
  MapApplicationHelpBlock,
  MapApplicationHelpText,
} from "@/content/map-applications";
import { Popover } from "antd";
import { ExternalLink, HelpCircle } from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import styles from "@/styles/Home.module.css";

type MapApplicationHelpProps = {
  help?: MapApplicationHelpBlock[];
};

type MapApplicationHelpButtonProps = {
  ariaLabel: string;
  children?: ReactNode;
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function renderHelpText(segment: MapApplicationHelpText, index: number) {
  if (typeof segment === "string") {
    return <span key={index}>{segment}</span>;
  }

  if ("glossaryId" in segment) {
    return (
      <GlossaryTermPopover
        key={`${segment.glossaryId}-${index}`}
        id={segment.glossaryId}
        className="font-semibold app-accent-text"
      >
        {segment.text}
      </GlossaryTermPopover>
    );
  }

  const className =
    "inline-flex items-baseline gap-1 font-semibold app-accent-text underline underline-offset-4";

  if (isExternalHref(segment.href)) {
    return (
      <a
        key={`${segment.href}-${index}`}
        href={segment.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        <span>{segment.text}</span>
        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      key={`${segment.href}-${index}`}
      href={segment.href}
      className={className}
    >
      {segment.text}
    </Link>
  );
}

export function MapApplicationHelp({ help }: MapApplicationHelpProps) {
  if (!help?.length) return null;

  return (
    <div className="space-y-3">
      {help.map((block, index) => {
        if (block.type === "links") {
          return (
            <div
              key={`${block.title}-${index}`}
              className="border-t border-[color:var(--border)] pt-3 mt-3"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] app-muted">
                {block.title}
              </p>
              <ul className="space-y-2">
                {block.items.map((item) => {
                  const external = isExternalHref(item.href);
                  const className =
                    "inline-flex items-baseline gap-1 font-semibold app-accent-text underline underline-offset-4";

                  return (
                    <li key={item.href}>
                      {external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                        >
                          <span>{item.label}</span>
                          <ExternalLink
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <Link href={item.href} className={className}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        return (
          <p key={index} className="m-0">
            {block.content.map(renderHelpText)}
          </p>
        );
      })}
    </div>
  );
}

export function MapApplicationHelpButton({
  ariaLabel,
  children,
}: MapApplicationHelpButtonProps) {
  if (!children) return null;

  return (
    <Popover
      trigger="click"
      content={<div className={styles.filterHelpContent}>{children}</div>}
      classNames={{ root: styles.filterHelpPopup }}
      styles={{
        container: {
          maxWidth: 380,
          padding: 0,
          border: "1px solid var(--border)",
          borderRadius: 14,
          background: "var(--surface)",
          boxShadow: "var(--shadow-soft), inset 0 1px 0 var(--border)",
          backdropFilter: "blur(14px)",
        },
      }}
    >
      <button
        type="button"
        className={styles.filterHelpButton}
        aria-label={ariaLabel}
      >
        <HelpCircle className="h-4 w-4" />
      </button>
    </Popover>
  );
}
