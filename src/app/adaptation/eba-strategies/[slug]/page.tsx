import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EbaStrategyPage } from "@/components/eba/EbaStrategyPage";
import {
  ebaStrategies,
  getEbaStrategyBySlug,
} from "@/content/eba/catalogue";
import { getEbaStrategyDetailBySlug } from "@/content/eba/strategy-details";

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
      title: "EbA Strategy | Winemap",
    };
  }

  return {
    title: `${strategy.title} | EbA Strategies | Winemap`,
    description: strategy.summary,
  };
}

export default async function StrategyRoute({ params }: StrategyRouteProps) {
  const { slug } = await params;
  const strategy = getEbaStrategyBySlug(slug);

  if (!strategy) notFound();

  const content = getEbaStrategyDetailBySlug(strategy.slug);

  return <EbaStrategyPage strategy={strategy} content={content} />;
}
