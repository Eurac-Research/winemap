"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, BookOpen, Users, Info, Network } from "lucide-react"
import WinemapDescription from "@/app/components/WinemapDescription";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed mt-8 top-6 right-6 z-[60] backdrop-blur-md border rounded-lg p-3 transition-colors bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)] hover:bg-[color:var(--surface-overlay)]"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[color:var(--text-strong)]" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6 text-[color:var(--text-strong)]" aria-hidden="true" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[55] backdrop-blur-sm bg-[color:var(--surface-inverse)]/20"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-[58] transform transition-transform duration-300 ease-in-out overflow-y-auto bg-[color:var(--surface-panel-strong)] border-l border-[color:var(--border-soft)] ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!isOpen}
      >
        <div className="p-8 pt-24">
          {/* Winemap */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color:var(--accent-soft)]">
                <Users className="w-5 h-5 text-[color:var(--accent-strong)]" />
              </div>
              <h2 className="text-xl font-bold text-[color:var(--text-strong)]">The Winemap</h2>
            </div>
            <p className="leading-relaxed mb-3 text-[color:var(--text-muted)]">
              Find out more about how the Winemap was created, where the data comes from and who is behind it
            </p>
            <Link
              href="/about#general"
              onClick={() => setIsOpen(false)}
              className="inline-block font-semibold hover:underline text-[color:var(--accent-strong)]"
            >
              Learn more about the Winemap →
            </Link>
          </section>

          {/* Projects */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color:var(--accent-soft)]">
                <Users className="w-5 h-5 text-[color:var(--accent-strong)]" />
              </div>
              <h2 className="text-xl font-bold text-[color:var(--text-strong)]">The Projects</h2>
            </div>
            <p className="leading-relaxed mb-3 text-[color:var(--text-muted)]">
              Discover the research projects behind the Winemap.
            </p>
            <Link
              href="/about#projects"
              onClick={() => setIsOpen(false)}
              className="inline-block font-semibold hover:underline text-[color:var(--accent-strong)]"
            >
              Learn more about our projects →
            </Link>
          </section>

          {/* The Team */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color:var(--accent-soft)]">
                <Users className="w-5 h-5 text-[color:var(--accent-strong)]" />
              </div>
              <h2 className="text-xl font-bold text-[color:var(--text-strong)]">The Team</h2>
            </div>
            <p className="leading-relaxed mb-3 text-[color:var(--text-muted)]">
              Meet the researchers and developers behind the Winemap project.
            </p>
            <Link
              href="/team"
              onClick={() => setIsOpen(false)}
              className="inline-block font-semibold hover:underline text-[color:var(--accent-strong)]"
            >
              Learn more about our team →
            </Link>
          </section>

          {/* Literature */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color:var(--accent-soft)]">
                <BookOpen className="w-5 h-5 text-[color:var(--accent-strong)]" />
              </div>
              <h2 className="text-xl font-bold text-[color:var(--text-strong)]">Literature</h2>
            </div>
            <p className="leading-relaxed mb-3 text-[color:var(--text-muted)]">
              Explore scientific publications and research papers related to wine regions, climate change, and
              adaptation strategies.
            </p>
            <Link
              href="/literature"
              onClick={() => setIsOpen(false)}
              className="inline-block font-semibold hover:underline text-[color:var(--accent-strong)]"
            >
              Learn more about our publications →
            </Link>
          </section>

          {/* Institute */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[color:var(--accent-soft)]">
                <Users className="w-5 h-5 text-[color:var(--accent-strong)]" />
              </div>
              <h2 className="text-xl font-bold text-[color:var(--text-strong)]">The Institute</h2>
            </div>
            <p className="leading-relaxed mb-3 text-[color:var(--text-muted)]">
              Meet the scientific Institute behind the Winemap
            </p>
            <Link
              href="/about#institute"
              onClick={() => setIsOpen(false)}
              className="inline-block font-semibold hover:underline text-[color:var(--accent-strong)]"
            >
              Learn more about our Institute →
            </Link>
          </section>

          {/* Footer Links */}
          <div className="pt-6 border-t border-[color:var(--border-soft)]">
            <Link
              href="/imprint-privacy"
              onClick={() => setIsOpen(false)}
              className="text-sm transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]"
            >
              Imprint / Privacy
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
