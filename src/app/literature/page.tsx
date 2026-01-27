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
import { Badge } from "@/app/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import literatureData from "@/app/data/winemap_literature.json"

interface Publication {
  id: string
  title: string
  authors: string[]
  year: number
  journal: string
  volume?: string
  doi: string
  abstract?: string
  keywords?: string[]
  type: string
  category: string
}

export default function LiteraturePage() {
  const [publications] = useState<Publication[]>(literatureData)
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
        <mark key={index} className="bg-[#E91E63]/90 text-white px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>()
    publications.forEach((pub) => {
      if (pub.category) categories.add(pub.category)
    })
    return Array.from(categories).sort()
  }, [publications])

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

  const generateBibTeX = (pub: Publication) => {
    const authors = pub.authors.join(" and ")
    return `@article{${pub.doi.replace(/[/.]/g, "_")},
  title={${pub.title}},
  author={${authors}},
  journal={${pub.journal}},
  volume={${pub.volume || ""}},
  year={${pub.year}},
  doi={${pub.doi}}
}`
  }

  const generateAPA = (pub: Publication) => {
    const authors =
      pub.authors.length > 1
        ? pub.authors.slice(0, -1).join(", ") + ", & " + pub.authors[pub.authors.length - 1]
        : pub.authors[0]

    return `${authors} (${pub.year}). ${pub.title}. ${pub.journal}${pub.volume ? `, ${pub.volume}` : ""}. https://doi.org/${pub.doi}`
  }

  const generateRIS = (pub: Publication) => {
    let ris = "TY  - JOUR\n"

    pub.authors.forEach((author) => {
      ris += `AU  - ${author}\n`
    })

    ris += `TI  - ${pub.title}\n`
    ris += `JO  - ${pub.journal}\n`
    ris += `PY  - ${pub.year}\n`

    if (pub.volume) {
      ris += `VL  - ${pub.volume}\n`
    }

    ris += `DO  - ${pub.doi}\n`

    if (pub.abstract) {
      ris += `AB  - ${pub.abstract}\n`
    }

    ris += "ER  - \n"

    return ris
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

  const filteredAndSortedPublications = useMemo(() => {
    const filtered = publications.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.year.toString().includes(searchTerm) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
  }, [publications, searchTerm, sortBy, sortOrder, categoryFilter])

  return (
    <div className="min-h-screen bg-black pt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-white" aria-hidden="true" />
            <h1 className="text-4xl font-bold text-white">Scientific Publications</h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our collection of peer-reviewed research papers and academic publications
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" aria-hidden="true" />
            <Input
              placeholder="Search publications, authors, journals or year ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 hover:bg-white/10 focus:bg-white/10 transition-colors"
              aria-label="Search publications"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="flex gap-2 text-white">
            <Select value={categoryFilter} onValueChange={(value: string) => setCategoryFilter(value)}>
              <SelectTrigger className="w-48 h-12 bg-white/5 border-white/20 text-white hover:bg-white/10" aria-label="Filter by category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                <SelectItem value="all" className="text-white">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category} className="text-white">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: "year" | "author") => setSortBy(value)}>
              <SelectTrigger className="w-32 h-12 bg-white/5 border-white/20 text-white hover:bg-white/10" aria-label="Sort by">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-white/20">
                <SelectItem value="year" className="text-white">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Year
                  </div>
                </SelectItem>
                <SelectItem value="author" className="text-white">
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
              className="h-12 px-3 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
              aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
            >
              {sortOrder === "desc" ? "↓" : "↑"}
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAndSortedPublications.length} of {publications.length} publications
          </p>
        </div>

        {/* Publications List */}
        <div className="space-y-6">
          {filteredAndSortedPublications.map((publication) => {
            const authorsExpanded = expandedAuthors.has(publication.id)
            const abstractExpanded = expandedAbstracts.has(publication.id)
            const AUTHOR_LIMIT = 10
            const ABSTRACT_LIMIT = 200

            return (
              <Card
                key={publication.id}
                className="hover:shadow-lg hover:border-white/30 transition-all duration-200 bg-white/5 border-white/10 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 leading-tight text-white">
                        {highlightText(publication.title, searchTerm)}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-3">
                        <span className="font-medium">
                          {(authorsExpanded ? publication.authors : publication.authors.slice(0, AUTHOR_LIMIT)).map(
                            (author, index, array) => (
                              <span key={index}>
                                {highlightText(author, searchTerm)}
                                {index < array.length - 1 ? ", " : ""}
                              </span>
                            ),
                          )}
                          {publication.authors.length > AUTHOR_LIMIT && !authorsExpanded && (
                            <button
                              onClick={() => toggleAuthors(publication.id)}
                              className="ml-1 text-[#E91E63] hover:text-[#E8958F] hover:underline inline-flex items-center"
                              aria-label={`Show ${publication.authors.length - AUTHOR_LIMIT} more authors`}
                            >
                              ... +{publication.authors.length - AUTHOR_LIMIT} more
                              <ChevronDown className="w-3 h-3 ml-1" aria-hidden="true" />
                            </button>
                          )}
                          {authorsExpanded && publication.authors.length > AUTHOR_LIMIT && (
                            <button
                              onClick={() => toggleAuthors(publication.id)}
                              className="ml-1 text-[#E91E63] hover:text-[#E8958F] hover:underline inline-flex items-center"
                              aria-label="Show fewer authors"
                            >
                              <ChevronUp className="w-3 h-3 ml-1" aria-hidden="true" />
                            </button>
                          )}
                        </span>
                        <span aria-hidden="true">•</span>
                        <span>{publication.year}</span>
                        <span aria-hidden="true">•</span>
                        <span className="italic">{highlightText(publication.journal, searchTerm)}</span>
                        {publication.volume && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span>Vol. {publication.volume}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-gray-500">Category:</span>
                          <span className="text-xs font-medium text-gray-300 px-2 py-0.5 bg-white/5 rounded">
                            {publication.category}
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild className="h-6 px-2 text-xs bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/40 text-white hover:text-white">
                          <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View DOI for ${publication.title}`}
                          >
                            <ExternalLink className="w-3 h-3 mr-1" aria-hidden="true" />
                            DOI
                          </a>
                        </Button>
                      </div>
                      {publication.keywords && publication.keywords.length > 0 && (
                        <div className="flex items-start gap-2 mb-3">
                          <span className="text-xs font-semibold text-gray-500 mt-1.5">Keywords:</span>
                          <div className="flex flex-wrap gap-2">
                            {publication.keywords.map((keyword, index) => (
                              <button
                                key={index}
                                onClick={() => setSearchTerm(searchTerm === keyword ? "" : keyword)}
                                className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#E91E63]/10 text-[#E91E63] border border-[#E91E63]/40 hover:bg-[#E91E63]/20 hover:border-[#E91E63]/60 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:ring-offset-1 focus:ring-offset-black"
                                aria-label={`Search for ${keyword}`}
                              >
                                {highlightText(keyword, searchTerm)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/40 text-white hover:text-white" aria-label="Citation options">
                          <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                          Cite
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-black border-white/30 text-white">
                        <DropdownMenuItem
                          onClick={() =>
                            downloadCitation(generateRIS(publication), `${publication.doi.replace(/[/.]/g, "_")}.ris`)
                          }
                        >
                          Download RIS
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            downloadCitation(
                              generateBibTeX(publication),
                              `${publication.doi.replace(/[/.]/g, "_")}.bib`,
                            )
                          }
                        >
                          Download BibTeX
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            downloadCitation(generateAPA(publication), `${publication.doi.replace(/[/.]/g, "_")}.txt`)
                          }
                        >
                          Download APA
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(generateAPA(publication))}>
                          Copy APA Citation
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                {publication.abstract && (
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-300 mb-2">Abstract</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {highlightText(
                          abstractExpanded || publication.abstract.length <= ABSTRACT_LIMIT
                            ? publication.abstract
                            : publication.abstract.slice(0, ABSTRACT_LIMIT) + "...",
                          searchTerm,
                        )}
                        {publication.abstract.length > ABSTRACT_LIMIT && (
                          <button
                            onClick={() => toggleAbstract(publication.id)}
                            className="ml-2 text-[#E91E63] hover:underline inline-flex items-center"
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

        {filteredAndSortedPublications.length === 0 && (
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
