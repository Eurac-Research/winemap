"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ebaStrategies, type EbaStrategy } from "@/content/eba/catalogue";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Droplet,
  ExternalLink,
  Layers,
  Map,
  Search,
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
  const [sortBy, setSortBy] = useState<
    "title" | "category" | "field_of_action" | "spatial_scale"
  >("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [scaleFilter, setScaleFilter] = useState<string>("all");
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

  const uniqueCategories = useMemo(
    () =>
      Array.from(new Set(factsheets.map((factsheet) => factsheet.category)))
        .filter(Boolean)
        .sort(),
    [factsheets],
  );

  const uniqueFieldsOfAction = useMemo(
    () =>
      Array.from(
        new Set(factsheets.map((factsheet) => factsheet.field_of_action)),
      )
        .filter(Boolean)
        .sort(),
    [factsheets],
  );

  const uniqueSpatialScales = useMemo(
    () =>
      Array.from(
        new Set(factsheets.map((factsheet) => factsheet.spatial_scale)),
      )
        .filter(Boolean)
        .sort(),
    [factsheets],
  );

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
        factsheet.category.toLowerCase().includes(search) ||
        factsheet.field_of_action.toLowerCase().includes(search) ||
        factsheet.spatial_scale.toLowerCase().includes(search) ||
        factsheet.summary?.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "all" || factsheet.category === categoryFilter;
      const matchesField =
        fieldFilter === "all" || factsheet.field_of_action === fieldFilter;
      const matchesScale =
        scaleFilter === "all" || factsheet.spatial_scale === scaleFilter;

      return matchesSearch && matchesCategory && matchesField && matchesScale;
    });

    filtered.sort((first, second) => {
      const firstValue = first[sortBy].toLowerCase();
      const secondValue = second[sortBy].toLowerCase();
      return sortOrder === "desc"
        ? secondValue.localeCompare(firstValue)
        : firstValue.localeCompare(secondValue);
    });

    return filtered;
  }, [
    factsheets,
    searchTerm,
    sortBy,
    sortOrder,
    categoryFilter,
    fieldFilter,
    scaleFilter,
  ]);

  return (
    <div className="min-h-screen bg-background pt-24 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen
              className="w-8 h-8 text-[color:var(--foreground)]"
              aria-hidden="true"
            />
            <h1 className="text-4xl font-bold text-[color:var(--foreground)]">
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

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"
              aria-hidden="true"
            />
            <Input
              placeholder="Search strategies, categories, fields of action or summaries ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10 pr-10 h-12 transition-colors bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] hover:bg-[color:var(--surface-panel-muted)] focus:bg-[color:var(--surface-panel-muted)]"
              aria-label="Search factsheets"
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="grid gap-2 text-[color:var(--foreground)] sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
            <Select
              value={categoryFilter}
              onValueChange={(value: string) => setCategoryFilter(value)}
            >
              <SelectTrigger
                className="h-12 w-full bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-panel-muted)]"
                aria-label="Filter by category"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem
                  value="all"
                  className="text-[color:var(--foreground)]"
                >
                  All Categories
                </SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-[color:var(--foreground)]"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={fieldFilter}
              onValueChange={(value: string) => setFieldFilter(value)}
            >
              <SelectTrigger
                className="h-12 w-full bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-panel-muted)]"
                aria-label="Filter by field of action"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem
                  value="all"
                  className="text-[color:var(--foreground)]"
                >
                  All Fields of Action
                </SelectItem>
                {uniqueFieldsOfAction.map((fieldOfAction) => (
                  <SelectItem
                    key={fieldOfAction}
                    value={fieldOfAction}
                    className="text-[color:var(--foreground)]"
                  >
                    {fieldOfAction}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={scaleFilter}
              onValueChange={(value: string) => setScaleFilter(value)}
            >
              <SelectTrigger
                className="h-12 w-full bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-panel-muted)]"
                aria-label="Filter by spatial scale"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem
                  value="all"
                  className="text-[color:var(--foreground)]"
                >
                  All Scales
                </SelectItem>
                {uniqueSpatialScales.map((spatialScale) => (
                  <SelectItem
                    key={spatialScale}
                    value={spatialScale}
                    className="text-[color:var(--foreground)]"
                  >
                    {spatialScale}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(
                value:
                  | "title"
                  | "category"
                  | "field_of_action"
                  | "spatial_scale",
              ) => setSortBy(value)}
            >
              <SelectTrigger
                className="h-12 w-full lg:w-40 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-panel-muted)]"
                aria-label="Sort by"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface-panel-strong)] border-[color:var(--border-soft)]">
                <SelectItem
                  value="title"
                  className="text-[color:var(--foreground)]"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                    Title
                  </div>
                </SelectItem>
                <SelectItem
                  value="category"
                  className="text-[color:var(--foreground)]"
                >
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" aria-hidden="true" />
                    Category
                  </div>
                </SelectItem>
                <SelectItem
                  value="field_of_action"
                  className="text-[color:var(--foreground)]"
                >
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4" aria-hidden="true" />
                    Field of Action
                  </div>
                </SelectItem>
                <SelectItem
                  value="spatial_scale"
                  className="text-[color:var(--foreground)]"
                >
                  <div className="flex items-center gap-2">
                    <Map className="w-4 h-4" aria-hidden="true" />
                    Scale
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="h-12 px-3 bg-[color:var(--surface-overlay)] border-[color:var(--border-soft)] text-[color:var(--foreground)] hover:bg-[color:var(--surface-panel-muted)] hover:text-[color:var(--foreground)]"
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
            const abstractExpanded = expandedAbstracts.has(factsheet.id);
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
                  <CardTitle className="text-xl mb-2 leading-tight text-[color:var(--foreground)]">
                    {highlightText(factsheet.title, searchTerm)}
                  </CardTitle>

                  <div className="mb-3 grid gap-3 text-xs sm:grid-cols-2">
                    {[
                      ["Category", factsheet.category],
                      ["Field of action", factsheet.field_of_action],
                      ["Spatial scale", factsheet.spatial_scale],
                    ].map(([label, value]) => (
                      <div key={label} className="py-2">
                        <span className="block font-semibold uppercase tracking-[0.12em] text-[color:var(--accent-strong)]">
                          {label}
                        </span>
                        <span className="mt-1 block font-medium text-[color:var(--text-base)]">
                          {highlightText(value, searchTerm)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {factsheet.filename ? (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="h-6 max-w-14 px-2 text-xs bg-[color:var(--surface-panel-muted)] border-[color:var(--border-strong)] hover:bg-[color:var(--surface-overlay)] hover:border-[color:var(--border)] text-[color:var(--foreground)] hover:text-[color:var(--foreground)]"
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
              No strategies found
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
