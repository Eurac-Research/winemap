"use client"

import { useState, useMemo } from "react"
import {
  Search,
  BookOpen,
  ExternalLink,
  Download,
  Calendar,
  User,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import ebaData from "@/app/data/eba_catalogue.json"

interface Catalogue {
  id: string
  title: string
  authors: string[]
  year: number
  category: string
  summary?: string
  keywords?: string[]
  filename: string
}

export default function LiteraturePage() {
  const [factsheets] = useState<Catalogue[]>(ebaData)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"year" | "author">("year")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [expandedAuthors, setExpandedAuthors] = useState<Set<string>>(new Set())
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set())

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="px-1 rounded bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)]">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>()
    factsheets.forEach((pub) => {
      if (pub.category) categories.add(pub.category)
    })
    return Array.from(categories).sort()
  }, [factsheets])

  const toggleAuthors = (id: string) => {
    setExpandedAuthors((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const downloadCitation = (citation: string, filename: string) => {
    const blob = new Blob([citation], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredAndSortedFactsheets = useMemo(() => {
    const filtered = factsheets.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.year.toString().includes(searchTerm) ||
        (pub.summary && pub.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (pub.keywords && pub.keywords.some(kw => kw.toLowerCase().includes(searchTerm.toLowerCase())))

      const matchesCategory = categoryFilter === "all" || pub.category === categoryFilter

      return matchesSearch && matchesCategory
    })

    filtered.sort((a, b) => {
      if (sortBy === "year") {
        return sortOrder === "desc" ? b.year - a.year : a.year - b.year
      } else {
        const aAuthor = a.authors[0]?.toLowerCase() || ""
        const bAuthor = b.authors[0]?.toLowerCase() || ""
        if (sortOrder === "desc") {
          return bAuthor.localeCompare(aAuthor)
        } else {
          return aAuthor.localeCompare(bAuthor)
        }
      }
    })

    return filtered
  }, [factsheets, searchTerm, sortBy, sortOrder, categoryFilter])

  return (
    <div className="min-h-screen bg-background pt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[color:var(--text-strong)]" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-[color:var(--text-strong)]">EbA Strategies Catalogue</h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our collection of factsheets describing Ecosystem Based Adaptation (EbA) strategies and their implementation
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
            <Input
              placeholder="Search factsheets, authors or year ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 h-12 transition-colors bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] placeholder:text-[color:var(--text-muted)] hover:bg-[color:var(--surface-panel-muted)] focus:bg-[color:var(--surface-panel-muted)]"
              aria-label="Search factsheets"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="flex gap-2 text-[color:var(--text-strong)]">
            <Select value={categoryFilter} onValueChange={(value: string) => setCategoryFilter(value)}>
              <SelectTrigger className="w-48 h-12 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]" aria-label="Filter by category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem value="all" className="text-[color:var(--text-strong)]">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category} className="text-[color:var(--text-strong)]">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: "year" | "author") => setSortBy(value)}>
              <SelectTrigger className="w-32 h-12 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]" aria-label="Sort by">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem value="year" className="text-[color:var(--text-strong)]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Year
                  </div>
                </SelectItem>
                <SelectItem value="author" className="text-[color:var(--text-strong)]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" aria-hidden="true" />
                    Author
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="h-12 px-3 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)] hover:text-[color:var(--text-strong)]"
              aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
            >
              {sortOrder === "desc" ? "↓" : "↑"}
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAndSortedFactsheets.length} of {factsheets.length} factsheets
          </p>
        </div>

        {/* Publications List */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedFactsheets.map((factsheet) => {
            const authorsExpanded = expandedAuthors.has(factsheet.id)
            const abstractExpanded = expandedAbstracts.has(factsheet.id)
            const AUTHOR_LIMIT = 10
            const ABSTRACT_LIMIT = 200

            return (
              <Card
                key={factsheet.id}
                className="h-full hover:shadow-lg transition-all duration-200 backdrop-blur-sm bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] hover:border-[color:var(--border-strong)]"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 leading-tight text-[color:var(--text-strong)]">
                        {highlightText(factsheet.title, searchTerm)}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-3">
                        <span className="font-medium">
                          {(authorsExpanded ? factsheet.authors : factsheet.authors.slice(0, AUTHOR_LIMIT)).map(
                            (author, index, array) => (
                              <span key={index}>
                                {highlightText(author, searchTerm)}
                                {index < array.length - 1 ? ", " : ""}
                              </span>
                            ),
                          )}
                          {factsheet.authors.length > AUTHOR_LIMIT && !authorsExpanded && (
                            <button
                              onClick={() => toggleAuthors(factsheet.id)}
                              className="ml-1 text-[color:var(--accent-strong)] hover:underline inline-flex items-center"
                              aria-label={`Show ${factsheet.authors.length - AUTHOR_LIMIT} more authors`}
                            >
                              ... +{factsheet.authors.length - AUTHOR_LIMIT} more
                              <ChevronDown className="w-3 h-3 ml-1" aria-hidden="true" />
                            </button>
                          )}
                          {authorsExpanded && factsheet.authors.length > AUTHOR_LIMIT && (
                            <button
                              onClick={() => toggleAuthors(factsheet.id)}
                              className="ml-1 text-[color:var(--accent-strong)] hover:underline inline-flex items-center"
                              aria-label="Show fewer authors"
                            >
                              <ChevronUp className="w-3 h-3 ml-1" aria-hidden="true" />
                            </button>
                          )}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>{factsheet.year}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-500">Category:</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded text-[color:var(--text-base)] bg-[color:var(--surface-panel-muted)]">
                            {factsheet.category}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild className="h-6 px-2 text-xs bg-[color:var(--surface-panel-muted)] border-[color:var(--border-strong)] hover:bg-[color:var(--surface-overlay)] hover:border-[color:var(--border)] text-[color:var(--text-strong)] hover:text-[color:var(--text-strong)]">
                          <a
                            href={`/factsheets/${factsheet.filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View Factsheet ${factsheet.title}`}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" aria-hidden="true" />
                            PDF
                          </a>
                        </Button>
                      </div>
                      {factsheet.keywords && factsheet.keywords.length > 0 && (
                        <div className="flex items-start gap-2 mb-3">
                          <span className="text-xs font-semibold text-gray-500 mt-1.5">Keywords:</span>
                          <div className="flex flex-wrap gap-2">
                            {factsheet.keywords.map((keyword, index) => (
                              <button
                                key={index}
                                onClick={() => setSearchTerm(searchTerm === keyword ? "" : keyword)}
                                className="text-xs font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-2 bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)] border border-[color:var(--accent-strong)] hover:brightness-105 focus:ring-[color:var(--accent-strong)] focus:ring-offset-1 focus:ring-offset-[color:var(--background)]"
                                aria-label={`Search for ${keyword}`}
                              >
                                {highlightText(keyword, searchTerm)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {factsheet.summary && (
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-300 mb-2">Summary</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {highlightText(
                          abstractExpanded || factsheet.summary.length <= ABSTRACT_LIMIT
                            ? factsheet.summary
                            : factsheet.summary.slice(0, ABSTRACT_LIMIT) + "...",
                          searchTerm,
                        )}
                        {factsheet.summary.length > ABSTRACT_LIMIT && (
                          <button
                            onClick={() => toggleAbstract(factsheet.id)}
                            className="ml-2 text-[color:var(--accent-strong)] hover:underline inline-flex items-center"
                            aria-label={abstractExpanded ? "Show less of abstract" : "Show full abstract"}
                          >
                            {abstractExpanded ? (
                              <>
                                Show less <ChevronUp className="w-3 h-3 ml-1" aria-hidden="true" />
                              </>
                            ) : (
                              <>
                                Show more <ChevronDown className="w-3 h-3 ml-1" aria-hidden="true" />
                              </>
                            )}
                          </button>
                        )}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {filteredAndSortedFactsheets.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No publications found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
