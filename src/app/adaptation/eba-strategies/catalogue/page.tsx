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
          className="px-1 rounded bg-[color:var(--accent)] text-[color:var(--accent-foreground)]"
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
            <BookOpen className="w-8 h-8 app-text-color" aria-hidden="true" />
            <h1 className="app-page-title font-bold">
              EbA Strategies Catalogue
            </h1>
          </div>
          <p className="app-lead app-muted max-w-2xl mx-auto">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 app-muted w-4 h-4"
              aria-hidden="true"
            />
            <Input
              placeholder="Search strategies, categories, fields of action or summaries ..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10 pr-10 h-12 transition-colors bg-[color:var(--surface-overlay)] border-[color:var(--border)] app-text-color placeholder:text-[color:var(--app-muted-color)] hover:bg-[color:var(--surface-muted)] focus:bg-[color:var(--surface-muted)]"
              aria-label="Search factsheets"
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors app-muted hover:text-[color:var(--app-text-color)]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div className="grid gap-2 app-text-color sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_auto]">
            <Select
              value={categoryFilter}
              onValueChange={(value: string) => setCategoryFilter(value)}
            >
              <SelectTrigger
                className="h-12 w-full bg-[color:var(--surface-overlay)] border-[color:var(--border)] app-text-color hover:bg-[color:var(--surface-muted)]"
                aria-label="Filter by category"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface)] border-[color:var(--border)]">
                <SelectItem value="all" className="app-text-color">
                  All Categories
                </SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="app-text-color"
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
                className="h-12 w-full bg-[color:var(--surface-overlay)] border-[color:var(--border)] app-text-color hover:bg-[color:var(--surface-muted)]"
                aria-label="Filter by field of action"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface)] border-[color:var(--border)]">
                <SelectItem value="all" className="app-text-color">
                  All Fields of Action
                </SelectItem>
                {uniqueFieldsOfAction.map((fieldOfAction) => (
                  <SelectItem
                    key={fieldOfAction}
                    value={fieldOfAction}
                    className="app-text-color"
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
                className="h-12 w-full bg-[color:var(--surface-overlay)] border-[color:var(--border)] app-text-color hover:bg-[color:var(--surface-muted)]"
                aria-label="Filter by spatial scale"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface)] border-[color:var(--border)]">
                <SelectItem value="all" className="app-text-color">
                  All Scales
                </SelectItem>
                {uniqueSpatialScales.map((spatialScale) => (
                  <SelectItem
                    key={spatialScale}
                    value={spatialScale}
                    className="app-text-color"
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
                className="h-12 w-full lg:w-40 bg-[color:var(--surface-overlay)] border-[color:var(--border)] app-text-color hover:bg-[color:var(--surface-muted)]"
                aria-label="Sort by"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[color:var(--surface)] border-[color:var(--border)]">
                <SelectItem value="title" className="app-text-color">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" aria-hidden="true" />
                    Title
                  </div>
                </SelectItem>
                <SelectItem value="category" className="app-text-color">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" aria-hidden="true" />
                    Category
                  </div>
                </SelectItem>
                <SelectItem value="field_of_action" className="app-text-color">
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4" aria-hidden="true" />
                    Field of Action
                  </div>
                </SelectItem>
                <SelectItem value="spatial_scale" className="app-text-color">
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
              className="h-12 px-3 bg-[color:var(--surface-overlay)] border-[color:var(--border)] app-text-color hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--app-text-color)]"
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
          <p className="app-muted">
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
                className="h-full cursor-pointer hover:shadow-lg transition-all duration-200 backdrop-blur-sm bg-[color:var(--surface-overlay)] border-[color:var(--border)] hover:border-[color:var(--border-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--app-accent-text-color)]"
              >
                <CardHeader>
                  <CardTitle className="text-xl mb-2 leading-tight app-text-color">
                    {highlightText(factsheet.title, searchTerm)}
                  </CardTitle>

                  <div className="mb-3 grid gap-3 text-xs sm:grid-cols-2">
                    {[
                      ["Category", factsheet.category],
                      ["Field of action", factsheet.field_of_action],
                      ["Spatial scale", factsheet.spatial_scale],
                    ].map(([label, value]) => (
                      <div key={label} className="py-2">
                        <span className="block font-semibold uppercase tracking-[0.12em] app-accent-text">
                          {label}
                        </span>
                        <span className="mt-1 block font-medium app-text-color">
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
                      className="h-6 max-w-14 px-2 text-xs bg-[color:var(--surface-muted)] border-[color:var(--border-strong)] hover:bg-[color:var(--surface-overlay)] hover:border-[color:var(--border)] app-text-color hover:text-[color:var(--app-text-color)]"
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
                      <h4 className="font-semibold text-sm app-text-color mb-2">
                        Summary
                      </h4>
                      <p className="app-caption">
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
                            className="ml-2 app-accent-text hover:underline inline-flex items-center"
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
              className="w-16 h-16 app-muted mx-auto mb-4"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold app-muted mb-2">
              No strategies found
            </h3>
            <p className="app-muted">
              Try adjusting your search terms or filters
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
