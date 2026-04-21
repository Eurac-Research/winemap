"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import EuracLogo from "@/app/components/ui/EuracLogo"
import { mainAreas } from "@/app/components/winemap-sections/mainAreas";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full z-[100] border-b bg-[color:var(--background)] border-[color:var(--border-soft)]">
      <div className="px-6 flex h-7 justify-between items-center">

        {/* Brand */}
        <div className="flex items-center py-2 hover:opacity-90 transition-opacity lg:w-1/3">
          <Link href="/" className="flex items-center gap-2 whitespace-nowrap leading-none">
            <span className="font-medium text-md tracking-wide text-[color:var(--text-strong)]">WINEMAP</span>
            <span className="text-sm text-[color:var(--text-muted)]">by</span>
            <EuracLogo className="h-3 text-[color:var(--text-strong)]" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded transition-colors text-[color:var(--text-strong)] hover:bg-[color:var(--surface-overlay)]"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex justify-center py-1 w-full">
          <NavigationMenuList>

              {mainAreas.filter((area) => area.id !== 'about').map((area) => (
                <NavigationMenuItem key = {area.id}>

                  <NavigationMenuTrigger className="bg-transparent text-[color:var(--text-strong)] hover:bg-[color:var(--surface-overlay)] hover:text-[color:var(--text-strong)] data-[state=open]:bg-[color:var(--surface-overlay)] data-[state=open]:text-[color:var(--text-strong)] text-base px-5 py-3 uppercase">
                    {area.titleText}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                    <div className="grid grid-cols-[340px_1fr] gap-0 w-[900px]">
                      {/* Left side - Large clickable main entry */}
                      <NavigationMenuLink
                        href={area.mainHref}
                        className="flex flex-col justify-center p-10 transition-colors border-r group bg-[color:var(--surface-overlay)] hover:bg-[color:var(--surface-panel-muted)] border-[color:var(--border-soft)]"
                      >
                        {area.icon}
                        <h3 className="text-2xl font-semibold mb-3 text-[color:var(--text-strong)]">{area.title}</h3>
                        <p className="text-base leading-relaxed transition-colors text-[color:var(--text-muted)] group-hover:text-[color:var(--text-strong)]">
                          {area.description}
                        </p>
                      </NavigationMenuLink>

                      {/* Right side - List of subsections */}
                      <div className="grid gap-1 p-5">
                        {area.categories.map((cat) => (
                          <NavigationMenuLink
                            key={cat.label}
                            href={cat.href}
                            className="block rounded-md p-4 transition-colors group hover:bg-[color:var(--surface-overlay)]"
                          >
                            <div className="font-semibold mb-1.5 text-base text-[color:var(--text-strong)]">{cat.label}</div>
                            <div className="text-sm leading-relaxed transition-colors text-[color:var(--text-muted)] group-hover:text-[color:var(--text-strong)]">
                              {cat.description}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>

                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:block lg:w-1/3"></div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-[99] top-16 bg-[color:var(--surface-inverse)]/20"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Content */}
          <div className="lg:hidden h-[calc(100vh-64px)] overflow-y-auto fixed left-0 right-0 top-16 z-[100] bg-[color:var(--surface-panel-strong)] border-t border-[color:var(--border-soft)]">
            <div className="px-6 py-4 space-y-4">
              {mainAreas.filter((area) => area.id !== 'about').map((area) => (
                <div key={area.id}>
                  <Link
                    href={area.mainHref}
                    className="block font-semibold text-lg mb-2 transition-colors text-[color:var(--text-strong)] hover:text-[color:var(--accent-strong)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {area.titleText}
                  </Link>
                  <div className="pl-4 space-y-2">
                    {area.categories.map((category) => (
                      <Link
                        key={category.label}
                        href={category.href}
                        className="block text-sm transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category.label.replace(" â†’", "")}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </>
      )}
    </div>
  )
}
