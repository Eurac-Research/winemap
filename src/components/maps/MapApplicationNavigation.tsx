import Link from "next/link";
import {
  mapApplications,
  type MapApplication,
} from "@/content/map-applications";
import { Layers3, MapPinned, ShieldAlert } from "lucide-react";

const navigationIcons = {
  layers: Layers3,
  "map-pinned": MapPinned,
  "shield-alert": ShieldAlert,
};

type MapApplicationNavigationProps = {
  activeHref: string;
};

function getNavigationItems(activeHref: string) {
  return mapApplications.filter(
    (application) =>
      application.href &&
      application.href !== activeHref &&
      application.navigationIcon,
  ) as (MapApplication & { navigationIcon: keyof typeof navigationIcons })[];
}

export function MapApplicationNavigation({
  activeHref,
}: MapApplicationNavigationProps) {
  const applications = getNavigationItems(activeHref);

  if (applications.length === 0) return null;

  return (
    <nav
      aria-label="Other map applications"
      className="fixed inset-x-0 top-[var(--top-nav-height)] z-30 flex h-14 items-center justify-center gap-1 border-b border-[color:var(--border)] bg-[color:var(--surface)]/95 px-2 shadow-sm backdrop-blur sm:inset-y-[var(--top-nav-height)] sm:left-0 sm:right-auto sm:h-auto sm:w-14 sm:flex-col sm:justify-start sm:border-b-0 sm:border-r sm:px-0 sm:py-3"
    >
      {applications.map((application) => {
        const Icon = navigationIcons[application.navigationIcon];
        const tooltipId = `map-application-tooltip-${application.navigationIcon}`;

        return (
          <Link
            key={application.href}
            href={application.href}
            aria-label={application.title}
            aria-describedby={tooltipId}
            className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl app-text-color transition-colors hover:bg-[color:var(--surface-muted)] focus-visible:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span
              id={tooltipId}
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] z-50 w-max max-w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 rounded-md border border-[color:var(--border)] bg-[color:var(--surface)] px-2 py-1 text-xs font-medium app-text-color opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:left-[calc(100%+0.75rem)] sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2"
            >
              {application.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
