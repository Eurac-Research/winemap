"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { primaryNavigationSections } from "@/content/primary-navigation";
import { Menu, X } from "lucide-react";

import EuracLogo from "@/components/ui/EuracLogo";
import RespondLogo from "@/components/ui/RespondLogo";

const secondaryNavigationSections = [
  { label: "About", href: "/about" },
  { label: "Scientific Literature", href: "/literature" },
  { label: "Glossary", href: "/about/glossary" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full border-b border-[color:var(--border)] bg-[color:var(--background)]">
      <div className="flex h-[var(--top-nav-height)] items-center py-1">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="inline-flex h-full w-16 shrink-0 cursor-pointer items-center justify-center border-r border-[color:var(--border)] app-text-color transition-colors hover:bg-[color:var(--surface-overlay)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[color:var(--accent)] sm:w-20"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation-drawer"
        >
          {menuOpen ? (
            <X className="h-7 w-7" aria-hidden="true" />
          ) : (
            <Menu className="h-7 w-7" aria-hidden="true" />
          )}
        </button>

        <Link
          href="/"
          className="ml-3 flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap rounded border border-transparent px-1 py-1 leading-none transition-colors hover:border-[color:var(--border)] sm:ml-6 sm:gap-2"
        >
          <span className="text-sm font-medium tracking-wide app-text-color sm:text-base">
            WINEMAP
          </span>
          <span className="hidden text-xs app-muted min-[360px]:inline sm:text-sm">
            by
          </span>
          <EuracLogo className="h-2.5 shrink-0 app-text-color sm:h-3" />
        </Link>

        <div
          className="h-7 w-px shrink-0 bg-[color:var(--border)]"
          aria-hidden="true"
        />

        <a
          href="https://www.alpine-space.eu/project/respond/"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-3 flex h-[4.5rem] shrink-0 items-center border border-transparent transition-colors hover:border-[color:var(--border)] sm:mr-6"
          aria-label="Visit the RESPOnD project website"
        >
          <RespondLogo className="h-[4.5rem] w-auto" />
        </a>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-[200]">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[color:var(--surface-inverse)]/20"
            onClick={closeMenu}
            aria-label="Close navigation"
          />

          <div
            ref={drawerRef}
            id="site-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-navigation-title"
            tabIndex={-1}
            className="relative flex h-full w-[min(31rem,100vw)] flex-col overflow-y-auto border-r border-[color:var(--border)] bg-[color:var(--surface)] shadow-[var(--shadow-strong)] outline-none"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--border)] px-5 py-5 sm:px-7">
              <h2
                id="site-navigation-title"
                className="text-lg font-semibold app-text-color"
              >
                Navigation
              </h2>
              <button
                type="button"
                onClick={closeMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] app-text-color transition-colors hover:bg-[color:var(--surface-overlay)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main navigation" className="px-3 py-5 sm:px-5">
              <div className="space-y-1">
                {primaryNavigationSections.map(
                  ({ id, label, href, Icon, accent }) => (
                    <Link
                      key={id}
                      href={href}
                      onClick={closeMenu}
                      className="group flex items-center gap-4 rounded-lg px-4 py-4 font-semibold app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                    >
                      <Icon
                        className="h-6 w-6 shrink-0"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </Link>
                  ),
                )}
              </div>

              <div className="my-5 border-t border-[color:var(--border)]" />

              <div className="space-y-1">
                {secondaryNavigationSections.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
