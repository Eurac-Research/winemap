import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/20 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Explore Maps */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4 text-[#E91E63]">
              Explore Maps
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#climate-environment" className="text-white/70 hover:text-white transition-colors text-sm">
                  Climate & Environment
                </Link>
              </li>
              <li>
                <Link href="/#adaptation" className="text-white/70 hover:text-white transition-colors text-sm">
                  Adaptation Strategies
                </Link>
              </li>
              <li>
                <Link href="/#governance" className="text-white/70 hover:text-white transition-colors text-sm">
                  Legal & Governance
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
                <Link href="/about#general" className="text-white/70 hover:text-white transition-colors text-sm">
                  About Winemap
                </Link>
              </li>
              <li>
                <Link href="/about#projects" className="text-white/70 hover:text-white transition-colors text-sm">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/about#institute" className="text-white/70 hover:text-white transition-colors text-sm">
                  The Institute
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/70 hover:text-white transition-colors text-sm">
                  The Team
                </Link>
              </li>
              <li>
                <Link href="/literature" className="text-white/70 hover:text-white transition-colors text-sm">
                  Scientific Literature
                </Link>
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
