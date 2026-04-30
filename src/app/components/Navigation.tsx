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
import EuracLogo from "@/app/components/ui/EuracLogo";
import { mainAreas } from "@/app/components/winemap-sections/mainAreas"
import { mapApplications } from "@/app/components/map-applications/mapApplications"

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
  "bg-transparent px-5 py-3 text-base uppercase text-[color:var(--text-strong)] hover:bg-[color:var(--surface-overlay)] hover:text-[color:var(--text-strong)] data-[state=open]:bg-[color:var(--surface-overlay)] data-[state=open]:text-[color:var(--text-strong)]";

const topLevelLinkClassName =
  "inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-5 py-3 text-base font-medium uppercase text-[color:var(--text-strong)] transition-colors hover:bg-[color:var(--surface-overlay)] hover:text-[color:var(--text-strong)] focus:bg-[color:var(--surface-overlay)] focus:text-[color:var(--text-strong)] focus:outline-none";

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
      <h3 className="mt-6 text-2xl font-semibold text-[color:var(--text-strong)]">
        {entry.title}
      </h3>
      <p className="mt-3 text-base leading-relaxed text-[color:var(--text-muted)]">
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
        <div className="grid w-[900px] grid-cols-[340px_1fr] gap-0">
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
                  <div className="mb-1.5 text-base font-semibold text-[color:var(--text-strong)]">
                    {section.label}
                  </div>
                  <div className="text-sm leading-relaxed text-[color:var(--text-muted)] transition-colors group-hover:text-[color:var(--text-strong)]">
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
      <div className="flex h-12 items-center justify-between px-6">
        <div className="flex items-center py-2 transition-opacity hover:opacity-90 lg:w-1/3">
          <Link
            href="/"
            className="flex items-center gap-2 whitespace-nowrap leading-none"
          >
            <span className="text-md font-medium tracking-wide text-[color:var(--text-strong)]">
              WINEMAP
            </span>
            <span className="text-sm text-[color:var(--text-muted)]">by</span>
            <EuracLogo className="h-3 text-[color:var(--text-strong)]" />
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          className="rounded p-2 text-[color:var(--text-strong)] transition-colors hover:bg-[color:var(--surface-overlay)] lg:hidden"
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
            className="fixed inset-x-0 bottom-0 top-12 z-[99] bg-[color:var(--surface-inverse)]/20 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-x-0 top-12 z-[100] max-h-[calc(100vh-3rem)] overflow-y-auto border-t border-[color:var(--border-soft)] bg-[color:var(--surface-panel-strong)] lg:hidden">
            <div className="space-y-6 px-6 py-5">
              {NavigationMenuEntries.map((entry) => (
                <div key={entry.title}>
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="block text-lg font-semibold text-[color:var(--text-strong)] transition-colors hover:text-[color:var(--accent-strong)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {entry.title}
                    </Link>
                  ) : (
                    <p className="text-lg font-semibold text-[color:var(--text-strong)]">
                      {entry.title}
                    </p>
                  )}
                  <p className="mt-1 text-sm leading-relaxed text-[color:var(--text-muted)]">
                    {entry.description}
                  </p>

                  {entry.sections?.length ? (
                    <div className="mt-3 space-y-2 border-l border-[color:var(--border-soft)] pl-4">
                      {entry.sections.map((section) => (
                        <Link
                          key={section.href}
                          href={section.href}
                          className="block rounded py-1 text-sm text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="font-medium text-[color:var(--text-strong)]">
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
