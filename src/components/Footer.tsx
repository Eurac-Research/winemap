import Link from "next/link";
import {
  primaryNavigationSections,
  secondaryNavigationSections,
} from "@/content/primary-navigation";
import { ExternalLink } from "lucide-react";

import EuracLogo from "@/components/ui/EuracLogo";
import RespondLogo from "@/components/ui/RespondLogo";

const footerLinkClassName =
  "inline-flex rounded-sm text-sm leading-6 text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

const aboutNavigation = secondaryNavigationSections.filter(({ href }) =>
  ["/about", "/about/team"].includes(href),
);

const resourceNavigation = secondaryNavigationSections.filter(({ href }) =>
  ["/literature", "/about/glossary"].includes(href),
);

const legalNavigation = secondaryNavigationSections.filter(
  ({ href }) => href === "/imprint-privacy",
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/15 bg-[rgb(24_28_36)] text-white"
      aria-labelledby="footer-title"
    >
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-sm lg:col-span-4 border-r border-white/15">
            <Link
              href="/"
              className="inline-flex rounded-sm text-xl font-semibold tracking-wide transition-colors hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              WINEMAP
            </Link>
            <h2 id="footer-title" className="mt-4 text-base font-medium">
              Knowledge for resilient European wine landscapes
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              WINEMAP brings together environmental evidence, adaptation
              approaches, governance knowledge, and interactive maps for
              climate-smart viticulture.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid gap-9 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8"
          >
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Explore
              </h2>
              <ul className="mt-4 space-y-1">
                <li>
                  <Link href="/" className={footerLinkClassName}>
                    Home
                  </Link>
                </li>
                {primaryNavigationSections.map(({ id, label, href }) => (
                  <li key={id}>
                    <Link href={href} className={footerLinkClassName}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                About
              </h2>
              <ul className="mt-4 space-y-1">
                {aboutNavigation.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClassName}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Resources
              </h2>
              <ul className="mt-4 space-y-1">
                {resourceNavigation.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClassName}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                Legal
              </h2>
              <ul className="mt-4 space-y-1">
                {legalNavigation.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClassName}>
                      {label} / Privacy Policy
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </nav>
        </div>

        <section
          aria-labelledby="footer-partners-title"
          className="mt-14 border-y border-white/15 py-8 sm:mt-16 sm:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="max-w-2xl">
              <h2
                id="footer-partners-title"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-white"
              >
                Partners and funding
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                WINEMAP was developed at Eurac Research within the RESPOnD
                project, co-financed by the European Regional Development Fund
                through the Interreg Alpine Space Programme 2021–2027.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-12">
              <a
                href="https://www.alpine-space.eu/project/respond/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the RESPOnD project website (opens in a new tab)"
                className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <RespondLogo
                  className="h-20 w-auto"
                  color="#ffffff"
                  aria-hidden="true"
                />
              </a>
              <a
                href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Eurac Research's Institute for Alpine Environment (opens in a new tab)"
                className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <EuracLogo className="h-13 w-auto" alt="" sizes="156px" />
              </a>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3 pt-6 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Eurac Research</p>
          <a
            href="https://www.eurac.edu/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Eurac Research
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
