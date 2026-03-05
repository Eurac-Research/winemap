"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"

export function ConditionalSidebar() {
  const pathname = usePathname()

  // Don't show navigation on landing page
  // if (pathname === "/") {
  //   return null
  // }

  return <Sidebar />
}