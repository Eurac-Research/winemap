import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Explore Maps */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#E91E63]">
              Explore Maps
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/climate-environment" className="text-white/70 hover:text-white transition-colors text-sm">
                  Climate & Environment
                </Link>
              </li>
              <li>
                <Link href="/climate-environment/climate" className="text-white/60 hover:text-white transition-colors text-sm pl-4">
                  → Indicators
                </Link>
              </li>
              <li>
                <Link href="/adaptation" className="text-white/70 hover:text-white transition-colors text-sm">
                  Adaptation Strategies
                </Link>
              </li>
              <li>
                <Link href="/adaptation/pilot-experiences" className="text-white/60 hover:text-white transition-colors text-sm pl-4">
                  → Pilot Experiences
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-white/70 hover:text-white transition-colors text-sm">
                  Legal & Governance
                </Link>
              </li>
              <li>
                <Link href="/legal/eu-policy" className="text-white/60 hover:text-white transition-colors text-sm pl-4">
                  → Geographic Indications
                </Link>
              </li>
              <li>
                <Link href="/cartography" className="text-white/70 hover:text-white transition-colors text-sm">
                  Cartography
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#E91E63]">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm">
                  About Winemap
                </Link>
              </li>
              <li>
                <Link href="/about#data" className="text-white/70 hover:text-white transition-colors text-sm">
                  About the Data
                </Link>
              </li>
              <li>
                <Link href="/about#pdo" className="text-white/70 hover:text-white transition-colors text-sm">
                  About PDO Wine Regions
                </Link>
              </li>
              <li>
                <Link href="/about#vulnerability" className="text-white/70 hover:text-white transition-colors text-sm">
                  Vulnerability Assessment
                </Link>
              </li>
              <li>
                <Link href="/literature" className="text-white/70 hover:text-white transition-colors text-sm">
                  Scientific Literature
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Project */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#E91E63]">
              Project
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/team" className="text-white/70 hover:text-white transition-colors text-sm">
                  Research Team
                </Link>
              </li>
              <li>
                <a
                  href="https://www.eurac.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Eurac Research
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  Institute for Alpine Environment
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.alpine-space.eu/project/respond/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  RESPOnD Project
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#E91E63]">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/imprint-privacy" className="text-white/70 hover:text-white transition-colors text-sm">
                  Imprint / Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Eurac Research •{" "}
            <Link href="/imprint-privacy" className="hover:text-white transition-colors">
              Imprint / Privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
