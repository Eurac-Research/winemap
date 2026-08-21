"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  primaryNavigationSections,
  secondaryNavigationGroups,
} from "@/content/primary-navigation";
import { Home, Menu, X } from "lucide-react";

import RespondLogo from "@/components/ui/RespondLogo";

// import EuracLogo from "@/components/ui/EuracLogo";

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
    <header className="fixed left-0 top-0 z-[100] w-full border-b border-[color:var(--border)] bg-[color:var(--background)]">
      <div className="flex h-[var(--top-nav-height)] items-center">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="inline-flex h-full w-14 shrink-0 cursor-pointer items-center justify-center border-r border-[color:var(--border)] app-text-color transition-colors hover:bg-[color:var(--surface-overlay)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[color:var(--accent)]"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation-drawer"
        >
          {menuOpen ? (
            <X className="h-7 w-7" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
        <div className="flex h-full min-w-0 flex-1 items-center justify-between">
          <Link
            href="/"
            className="ml-3 flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap rounded border border-transparent leading-none transition-colors hover:border-[color:var(--border)]"
          >
            <span className="text-sm font-medium tracking-wide app-text-color sm:text-base">
              WINEMAP
            </span>
            <span className="hidden text-xs app-muted min-[360px]:inline sm:text-sm">
              by
            </span>
            <span className="text-sm font-medium tracking-wide app-text-color sm:text-base">
              eurac research
            </span>
            {/* <EuracLogo
              variant="special"
              className="h-2.5 w-auto shrink-0 sm:h-3"
              sizes="(min-width: 640px) 104px, 87px"
            /> */}
          </Link>
          <Link
            href="/"
            className="flex shrink-0 items-center whitespace-nowrap rounded border border-transparent leading-none transition-colors hover:border-[color:var(--border)]"
          >
            <RespondLogo
              variant="landscape"
              color="standard"
              className="h-10 w-auto"
            />
          </Link>
        </div>
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
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Main navigation" className="px-3 py-5 sm:px-5">
              <div className="space-y-1">
                <Link
                  key="home-link"
                  href="/"
                  onClick={closeMenu}
                  className="group flex items-center gap-4 rounded-lg px-4 py-1 font-semibold app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                  <Home
                    className="h-6 w-6 shrink-0"
                    style={{ color: "black" }}
                    aria-hidden="true"
                  />
                  <span>Home</span>
                </Link>
                {primaryNavigationSections.map(
                  ({ id, label, href, Icon, accent }) => (
                    <Link
                      key={id}
                      href={href}
                      onClick={closeMenu}
                      className="group flex items-center gap-4 rounded-lg px-4 py-2 font-semibold app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
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

              <div className="space-y-5">
                {secondaryNavigationGroups.map(({ category, items }) => (
                  <section
                    key={category}
                    aria-labelledby={`navigation-${category}`}
                  >
                    <h3
                      id={`navigation-${category}`}
                      className="px-4 text-xs font-semibold uppercase tracking-[0.16em] app-muted"
                    >
                      {category}
                    </h3>
                    <div className="mt-2">
                      {items.map(({ label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={closeMenu}
                          className="block rounded-lg px-4 py-1 app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
