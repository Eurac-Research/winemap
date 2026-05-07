"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Library,
  Map,
  Menu,
  Network,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import EuracLogo from "@/components/ui/EuracLogo";
import RespondLogo from "@/components/ui/RespondLogo";
import { mainAreas } from "@/content/main-areas"
import { mapApplications } from "@/content/map-applications"

type NavigationSubsection = {
  label: string;
  href: string;
  description: string;
};

type NavigationEntry = {
  title: string;
  href?: string;
  description: string;
  icon: LucideIcon;
  sections?: NavigationSubsection[];
};

const TopicsSections = mainAreas.filter((area) => area.id !== 'about');
const AboutSections = mainAreas.find((area) => area.id === 'about')?.categories ?? [];

const NavigationMenuEntries: NavigationEntry[] = [
  {
    title: "Topics",
    href: "/",
    description:
      "Explore the main thematic areas of Winemap: climate, adaptation, and governance for European wine regions.",
    icon: Network,
    sections: TopicsSections.map((topic_section) => {
      return {
        label: topic_section.titleText,
        href: topic_section.mainHref,
        description: topic_section.description
      }
    })
  },
  {
    title: "Maps",
    description:
      "Open the interactive map applications and spatial tools available in Winemap.",
    icon: Map,
    sections: mapApplications.map((map_app) => {
      return {
        label: map_app.title,
        href: map_app.href,
        description: map_app.description
      }
    })
  },
  {
    title: "Courses",
    href: "/legal/courses",
    description:
      "Access learning material on viticulture, climate change, governance, and ecosystem-based adaptation.",
    icon: GraduationCap,
  },
  // {
  //   title: "Literature",
  //   href: "/literature",
  //   description:
  //     "Explore scientific publications and references behind the Winemap platform.",
  //   icon: Library,
  // },
  {
    title: "About",
    href: "/about",
    description:
      "Learn about Winemap, the scientific team, core definitions, and the research foundation behind the platform.",
    icon: BookOpen,
    sections: AboutSections,
  },
];

const triggerClassName =
  "bg-transparent px-5 py-3 text-base uppercase text-[color:var(--foreground)] hover:bg-[color:var(--surface-overlay)] hover:text-[color:var(--foreground)] data-[state=open]:bg-[color:var(--surface-overlay)] data-[state=open]:text-[color:var(--foreground)]";

const topLevelLinkClassName =
  "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-5 py-3 text-base font-medium uppercase text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface-overlay)] hover:text-[color:var(--foreground)] focus:bg-[color:var(--surface-overlay)] focus:text-[color:var(--foreground)] focus:outline-none";

function DesktopNavigationEntry({ entry }: { entry: NavigationEntry }) {
  const Icon = entry.icon;

  if (!entry.sections?.length) {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href={entry.href ?? "/"} className={topLevelLinkClassName}>
            {entry.title}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  const overviewContent = (
    <>
      <Icon
        className="h-12 w-12 text-[color:var(--accent-strong)]"
        aria-hidden="true"
      />
      <h3 className="mt-6 text-2xl font-semibold text-[color:var(--foreground)]">
        {entry.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[color:var(--muted-foreground)]">
        {entry.description}
      </p>
    </>
  );

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={triggerClassName}>
        {entry.title}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="border-[color:var(--border-soft)] bg-[color:var(--surface-panel-strong)]">
        <div className="grid w-[min(900px,calc(100vw-2rem))] grid-cols-[minmax(260px,340px)_1fr] gap-0">
          <div className="flex flex-col justify-center border-r border-[color:var(--border-soft)] bg-[color:var(--surface-overlay)] p-10">
            {overviewContent}
          </div>

          <div className="grid gap-1">
            {entry.sections.map((section) => (
              <NavigationMenuLink key={section.href} asChild>
                <Link
                  href={section.href}
                  className="group block border-b border-[color:var(--border-soft)] p-3 transition-colors hover:bg-[color:var(--surface-overlay)]"
                >
                  <div className="mb-1.5 text-base font-semibold text-[color:var(--foreground)]">
                    {section.label}
                  </div>
                  <div className="text-sm leading-relaxed text-[color:var(--muted-foreground)] transition-colors group-hover:text-[color:var(--foreground)]">
                    {section.description}
                  </div>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed left-0 top-0 z-[100] w-full border-b border-[color:var(--border-soft)] bg-[color:var(--background)]">
      <div className="flex h-[var(--top-nav-height)] items-center justify-between gap-3 px-3 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 py-1 lg:w-1/3 lg:flex-none">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-1.5 whitespace-nowrap rounded border border-transparent px-1 py-1 leading-none transition-colors hover:border-[color:var(--secondary)] sm:gap-2"
          >
            <span className="text-sm font-medium tracking-wide text-[color:var(--foreground)] sm:text-base">
              WINEMAP
            </span>
            <span className="hidden text-xs text-[color:var(--muted-foreground)] min-[360px]:inline sm:text-sm">
              by
            </span>
            <EuracLogo className="h-2.5 shrink-0 text-[color:var(--foreground)] sm:h-3" />
          </Link>

          <div
            className="h-7 w-px shrink-0 bg-[color:var(--border-soft)]"
            aria-hidden="true"
          />

          <a
            href="https://www.alpine-space.eu/project/respond/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-18 shrink-0 items-center border border-transparent transition-colors hover:border-[color:var(--secondary)]"
            aria-label="Visit the RESPOnD project website"
          >
            <RespondLogo className="h-18 w-auto" />
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          className="shrink-0 rounded p-2 text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface-overlay)] lg:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        <NavigationMenu className="hidden w-full justify-center py-1 lg:flex">
          <NavigationMenuList>
            {NavigationMenuEntries.map((entry) => (
              <DesktopNavigationEntry key={entry.title} entry={entry} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:block lg:w-1/3" />
      </div>

      {mobileMenuOpen ? (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[var(--top-nav-height)] z-[99] bg-[color:var(--surface-inverse)]/20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-x-0 top-[var(--top-nav-height)] z-[100] max-h-[calc(100vh-var(--top-nav-height))] overflow-y-auto border-t border-[color:var(--border-soft)] bg-[color:var(--surface-panel-strong)] lg:hidden">
            <div className="space-y-6 px-6 py-5">
              {NavigationMenuEntries.map((entry) => (
                <div key={entry.title}>
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="block text-lg font-semibold text-[color:var(--foreground)] transition-colors hover:text-[color:var(--accent-strong)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {entry.title}
                    </Link>
                  ) : (
                    <p className="text-lg font-semibold text-[color:var(--foreground)]">
                      {entry.title}
                    </p>
                  )}
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                    {entry.description}
                  </p>

                  {entry.sections?.length ? (
                    <div className="mt-3 space-y-2 border-l border-[color:var(--border-soft)] pl-4">
                      {entry.sections.map((section) => (
                        <Link
                          key={section.href}
                          href={section.href}
                          className="block rounded py-1 text-sm text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="font-medium text-[color:var(--foreground)]">
                            {section.label}
                          </span>
                          <span className="mt-0.5 block leading-relaxed">
                            {section.description}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
