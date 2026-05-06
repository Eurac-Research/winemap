"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ebaStrategies, type EbaStrategy } from "@/content/eba/catalogue";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  User,
  X,
} from "lucide-react";

import { GlossaryTermPopover } from "@/components/glossary/glossaryTerm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EbaStrategiesPage() {
  const router = useRouter();
  const [factsheets] = useState<EbaStrategy[]>(ebaStrategies);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"year" | "author">("year");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expandedAuthors, setExpandedAuthors] = useState<Set<string>>(
    new Set(),
  );
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(
    new Set(),
  );

  const highlightText = (text: string, term: string) => {
    if (!term.trim()) return text;

    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <mark
          key={`${part}-${index}`}
          className="px-1 rounded bg-[color:var(--accent-strong)] text-[color:var(--text-inverse)]"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    factsheets.forEach((factsheet) => {
      if (factsheet.category) categories.add(factsheet.category);
    });
    return Array.from(categories).sort();
  }, [factsheets]);

  const toggleAuthors = (id: string) => {
    setExpandedAuthors((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredAndSortedFactsheets = useMemo(() => {
    const search = searchTerm.toLowerCase();
    const filtered = factsheets.filter((factsheet) => {
      const matchesSearch =
        factsheet.title.toLowerCase().includes(search) ||
        factsheet.authors.some((author) =>
          author.toLowerCase().includes(search),
        ) ||
        factsheet.year.toString().includes(searchTerm) ||
        factsheet.summary?.toLowerCase().includes(search) ||
        factsheet.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(search),
        );

      const matchesCategory =
        categoryFilter === "all" || factsheet.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    filtered.sort((first, second) => {
      if (sortBy === "year") {
        return sortOrder === "desc"
          ? second.year - first.year
          : first.year - second.year;
      }

      const firstAuthor = first.authors[0]?.toLowerCase() || "";
      const secondAuthor = second.authors[0]?.toLowerCase() || "";
      return sortOrder === "desc"
        ? secondAuthor.localeCompare(firstAuthor)
        : firstAuthor.localeCompare(secondAuthor);
    });

    return filtered;
  }, [factsheets, searchTerm, sortBy, sortOrder, categoryFilter]);

  return (
    <div className="min-h-screen bg-background pt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen
              className="w-8 h-8 text-[color:var(--text-strong)]"
              aria-hidden="true"
            />
            <h1 className="text-4xl font-bold text-[color:var(--text-strong)]">
              EbA Strategies Catalogue
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore our collection of factsheets describing{" "}
            <GlossaryTermPopover id="ecosystem-based-adaptation">
              Ecosystem Based Adaptation (EbA) strategies
            </GlossaryTermPopover>{" "}
            and their implementation
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"
              aria-hidden="true"
            />
            <Input
              placeholder="Search factsheets, authors or year ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10 pr-10 h-12 transition-colors bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] placeholder:text-[color:var(--text-muted)] hover:bg-[color:var(--surface-panel-muted)] focus:bg-[color:var(--surface-panel-muted)]"
              aria-label="Search factsheets"
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[color:var(--text-muted)] hover:text-[color:var(--text-strong)]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="flex gap-2 text-[color:var(--text-strong)]">
            <Select
              value={categoryFilter}
              onValueChange={(value: string) => setCategoryFilter(value)}
            >
              <SelectTrigger
                className="w-48 h-12 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]"
                aria-label="Filter by category"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem
                  value="all"
                  className="text-[color:var(--text-strong)]"
                >
                  All Categories
                </SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-[color:var(--text-strong)]"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value: "year" | "author") => setSortBy(value)}
            >
              <SelectTrigger
                className="w-32 h-12 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--text-strong)] hover:bg-[color:var(--surface-panel-muted)]"
                aria-label="Sort by"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem
                  value="year"
                  className="text-[color:var(--text-strong)]"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Year
                  </div>
                </SelectItem>
                <SelectItem
                  value="author"
                  className="text-[color:var(--text-strong)]"
                >
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
              {sortOrder === "desc" ? (
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAndSortedFactsheets.length} of {factsheets.length}{" "}
            factsheets
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedFactsheets.map((factsheet) => {
            const authorsExpanded = expandedAuthors.has(factsheet.id);
            const abstractExpanded = expandedAbstracts.has(factsheet.id);
            const authorLimit = 10;
            const abstractLimit = 200;
            const strategyHref = `/adaptation/eba-strategies/${factsheet.slug}`;

            return (
              <Card
                key={factsheet.id}
                role="link"
                tabIndex={0}
                onClick={() => router.push(strategyHref)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    router.push(strategyHref);
                  }
                }}
                className="h-full cursor-pointer hover:shadow-lg transition-all duration-200 backdrop-blur-sm bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] hover:border-[color:var(--border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-strong)]"
              >
                <CardHeader>
                  <CardTitle className="text-xl mb-2 leading-tight text-[color:var(--text-strong)]">
                    {highlightText(factsheet.title, searchTerm)}
                  </CardTitle>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-3">
                    <span className="font-medium">
                      {(authorsExpanded
                        ? factsheet.authors
                        : factsheet.authors.slice(0, authorLimit)
                      ).map((author, index, array) => (
                        <span key={author}>
                          {highlightText(author, searchTerm)}
                          {index < array.length - 1 ? ", " : ""}
                        </span>
                      ))}
                      {factsheet.authors.length > authorLimit &&
                      !authorsExpanded ? (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleAuthors(factsheet.id);
                          }}
                          className="ml-1 text-[color:var(--accent-strong)] hover:underline inline-flex items-center"
                          aria-label={`Show ${factsheet.authors.length - authorLimit} more authors`}
                        >
                          ... +{factsheet.authors.length - authorLimit} more
                          <ChevronDown
                            className="w-3 h-3 ml-1"
                            aria-hidden="true"
                          />
                        </button>
                      ) : null}
                      {authorsExpanded &&
                      factsheet.authors.length > authorLimit ? (
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleAuthors(factsheet.id);
                          }}
                          className="ml-1 text-[color:var(--accent-strong)] hover:underline inline-flex items-center"
                          aria-label="Show fewer authors"
                        >
                          <ChevronUp
                            className="w-3 h-3 ml-1"
                            aria-hidden="true"
                          />
                        </button>
                      ) : null}
                    </span>
                    <span aria-hidden="true">&bull;</span>
                    <span>{factsheet.year}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-gray-500">
                        Category:
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded text-[color:var(--text-base)] bg-[color:var(--surface-panel-muted)]">
                        {factsheet.category}
                      </span>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-6 px-2 text-xs bg-[color:var(--surface-panel-muted)] border-[color:var(--border-strong)] hover:bg-[color:var(--surface-overlay)] hover:border-[color:var(--border)] text-[color:var(--text-strong)] hover:text-[color:var(--text-strong)]"
                    >
                      <a
                        href={`/factsheets/${factsheet.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`View Factsheet ${factsheet.title}`}
                      >
                        <ExternalLink
                          className="w-3 h-3 mr-1"
                          aria-hidden="true"
                        />
                        PDF
                      </a>
                    </Button>
                  </div>

                  {factsheet.keywords?.length ? (
                    <div className="flex items-start gap-2 mb-3">
                      <span className="text-xs font-semibold text-gray-500 mt-1.5">
                        Keywords:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {factsheet.keywords.map((keyword) => (
                          <button
                            key={keyword}
                            onClick={(event) => {
                              event.stopPropagation();
                              setSearchTerm(
                                searchTerm === keyword ? "" : keyword,
                              );
                            }}
                            className="text-xs font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-2 bg-[color:var(--accent-soft)] text-[color:var(--accent-strong)] border border-[color:var(--accent-strong)] hover:brightness-105 focus:ring-[color:var(--accent-strong)] focus:ring-offset-1 focus:ring-offset-[color:var(--background)]"
                            aria-label={`Search for ${keyword}`}
                          >
                            {highlightText(keyword, searchTerm)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardHeader>

                {factsheet.summary ? (
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-300 mb-2">
                        Summary
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {highlightText(
                          abstractExpanded ||
                            factsheet.summary.length <= abstractLimit
                            ? factsheet.summary
                            : `${factsheet.summary.slice(0, abstractLimit)}...`,
                          searchTerm,
                        )}
                        {factsheet.summary.length > abstractLimit ? (
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleAbstract(factsheet.id);
                            }}
                            className="ml-2 text-[color:var(--accent-strong)] hover:underline inline-flex items-center"
                            aria-label={
                              abstractExpanded
                                ? "Show less of abstract"
                                : "Show full abstract"
                            }
                          >
                            {abstractExpanded ? (
                              <>
                                Show less{" "}
                                <ChevronUp
                                  className="w-3 h-3 ml-1"
                                  aria-hidden="true"
                                />
                              </>
                            ) : (
                              <>
                                Show more{" "}
                                <ChevronDown
                                  className="w-3 h-3 ml-1"
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </button>
                        ) : null}
                      </p>
                    </div>
                  </CardContent>
                ) : null}
              </Card>
            );
          })}
        </div>

        {filteredAndSortedFactsheets.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen
              className="w-16 h-16 text-gray-600 mx-auto mb-4"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No publications found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
