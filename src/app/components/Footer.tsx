import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { mainAreas } from "@/content/main-areas";
import { mapApplications } from "@/content/map-applications";

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t pt-2 text-[color:var(--text-strong)] bg-[color:var(--background)] border-[color:var(--border-soft)]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 max-w-8xl mx-auto">
          {/* Column 1: Explore Maps */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              Explore
            </h3>
            <ul className="space-y-1">
              {mainAreas.filter((area) => area.showOnLanding).map((area) => (
                <li key={area.id}>
                  <Link href={area.mainHref} className="text-sm transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]">
                    {area.titleText}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Applications */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              Map Applications
            </h3>
            <ul className="space-y-1">
              {mapApplications.map((app) => (
                <li key={app.title}>
                  <Link href={app.href} className="text-sm transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]">
                  {app.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              About
            </h3>
            <ul className="space-y-1">
              {mainAreas
                .find((area) => area.id === "about")
                ?.categories.map((cat) => (
                  <li key={cat.label}>
                    <Link href={cat.href} className="text-sm transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]">
                      {cat.label.replace(" →", "")}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--accent-strong)]">
              Legal
            </h3>
            <ul className="space-y-1">
              <li>
                <Link href="/imprint-privacy" className="text-sm transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]">
                  Imprint / Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t text-center border-[color:var(--border-soft)]">
        <p className="text-sm py-3 text-[color:var(--text-muted)]">
          © {currentYear} Eurac Research •{" "}
          <Link href="/imprint-privacy" className="transition-colors hover:text-[color:var(--text-strong)]">
            Imprint / Privacy
          </Link>
        </p>
      </div>
    </footer>
  )
}
