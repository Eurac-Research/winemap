"use client"

import { usePathname } from "next/navigation"

import Footer from "./Footer"

const MAP_ROUTE_PREFIXES = [
  "/legal",
  "/adaptation",
  "/climate-environment",
  "/cartography",
  "/map-applications",
]

function isMapRoute(pathname: string) {
  return MAP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

export function ConditionalFooter() {
  const pathname = usePathname()

  if (isMapRoute(pathname)) {
    return null
  }

  return <Footer />
}

