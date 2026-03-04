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
        className="fixed mt-8 top-6 right-6 z-[60] bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-3 hover:bg-white/10 transition-colors"
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
          {/* Winemap */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">The Winemap</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              Find out more about how the Winemap was created, where the data comes from and who is behind it
            </p>
            <Link
              href="/about#general"
              onClick={() => setIsOpen(false)}
              className="inline-block text-[#E91E63] font-semibold hover:underline"
            >
              Learn more about the Winemap →
            </Link>
          </section>

          {/* Projects */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">The Projects</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              Discover the research projects behind the Winemap.
            </p>
            <Link
              href="/about#projects"
              onClick={() => setIsOpen(false)}
              className="inline-block text-[#E91E63] font-semibold hover:underline"
            >
              Learn more about our projects →
            </Link>
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
              Learn more about our publications →
            </Link>
          </section>

          {/* Institute */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E91E63]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#E91E63]" />
              </div>
              <h2 className="text-xl font-bold text-white">The Institute</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-3">
              Meet the scientific Institute behind the Winemap
            </p>
            <Link
              href="/about#institute"
              onClick={() => setIsOpen(false)}
              className="inline-block text-[#E91E63] font-semibold hover:underline"
            >
              Learn more about our Institute →
            </Link>
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
