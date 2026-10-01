import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ebaStrategies, getEbaStrategyBySlug } from "@/content/eba/catalogue";
import { getEbaStrategyDetailBySlug } from "@/content/eba/strategy-details";

import { createPageMetadata } from "@/lib/seo";
import { EbaStrategyPage } from "@/components/eba/EbaStrategyPage";

type StrategyRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return ebaStrategies.map((strategy) => ({ slug: strategy.slug }));
}

export async function generateMetadata({
  params,
}: StrategyRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const strategy = getEbaStrategyBySlug(slug);

  if (!strategy) {
    return {
      title: "EbA Strategy",
    };
  }

  return createPageMetadata({
    title: `${strategy.title} | EbA Strategies`,
    description:
      strategy.summary ??
      "Explore ecosystem-based adaptation strategies for resilient vineyard landscapes.",
    path: `/adaptation/eba-strategies/${strategy.slug}`,
  });
}

export default async function StrategyRoute({ params }: StrategyRouteProps) {
  const { slug } = await params;
  const strategy = getEbaStrategyBySlug(slug);

  if (!strategy) notFound();

  const content = getEbaStrategyDetailBySlug(strategy.slug);

  return <EbaStrategyPage strategy={strategy} content={content} />;
}
