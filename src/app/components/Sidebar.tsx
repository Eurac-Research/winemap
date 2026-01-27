"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BookOpen, Users, Info, Network } from "lucide-react"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-[60] bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/10 transition-colors"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6 text-white" aria-hidden="true" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[55] backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-black border-l border-white/20 z-[58] transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!isOpen}
      >
        <div className="p-8 pt-24">
          {/* About the Project */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <Info className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">About the Project</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              The Winemap provides a comprehensive overview of all wine regions that fall under the Protected
              Designation of Origin (PDO) label. It is an essential resource for understanding wine heritage, climate
              adaptation, and governance frameworks.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              The map is developed by the{" "}
              <a
                href="https://www.eurac.edu/en/institutes-centers/institute-for-alpine-environment"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E91E63] hover:underline"
              >
                Institute for Alpine Environment
              </a>{" "}
              at Eurac Research in Bolzano, Italy. Our interdisciplinary research team specializes in climate
              adaptation, environmental science, and sustainable agriculture.
            </p>

            <div className="space-y-2 mt-4">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white hover:bg-white/5 p-2 rounded transition-colors"
              >
                → About the project
              </Link>
              <Link
                href="/about-pdo"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white hover:bg-white/5 p-2 rounded transition-colors"
              >
                → What&apos;s a PDO?
              </Link>
              <Link
                href="/about-data"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white hover:bg-white/5 p-2 rounded transition-colors"
              >
                → About the data
              </Link>
              <Link
                href="/vulnerability"
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-white hover:bg-white/5 p-2 rounded transition-colors"
              >
                → Vulnerability Index
              </Link>
            </div>
          </section>

          {/* The Team */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">The Team</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              Meet the researchers and developers behind the Winemap project.
            </p>
            <Link
              href="/team"
              onClick={() => setIsOpen(false)}
              className="inline-block text-[#E91E63] font-semibold hover:underline"
            >
              Learn more about our team →
            </Link>
          </section>

          {/* Literature */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">Literature</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              Explore scientific publications and research papers related to wine regions, climate change, and
              adaptation strategies.
            </p>
            <Link
              href="/literature"
              onClick={() => setIsOpen(false)}
              className="inline-block text-[#E91E63] font-semibold hover:underline"
            >
              Browse publications →
            </Link>
          </section>

          {/* RESPOnD Project */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <Network className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">RESPOnD Project</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              This work is part of the RESPOnD project (Resilient Ecosystem Services in Declining Mountain Regions),
              which aims to develop strategies for sustainable mountain development in the Alpine Space.
            </p>
            <a
              href="https://www.alpine-space.eu/project/respond/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#E91E63] font-semibold hover:underline"
            >
              Visit RESPOnD project page →
            </a>
          </section>

          {/* Footer Links */}
          <div className="pt-6 border-t border-white/10">
            <Link
              href="/imprint-privacy"
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Imprint / Privacy
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
