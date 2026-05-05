import type { ReactNode } from "react";

export type EbaFact = {
  label: string;
  value: ReactNode;
};

export type EbaSectionContent = {
  id: string;
  title: string;
  children: ReactNode;
};

export type EbaVideoContent = {
  id: string;
  title: string;
  youtubeId: string;
  caption?: string;
};

export type EbaStrategyDetailContent = {
  slug: string;
  facts?: EbaFact[];
  sections?: EbaSectionContent[];
  videos?: EbaVideoContent[];
  aside?: ReactNode;
};

export const ebaStrategyDetails: EbaStrategyDetailContent[] = [];

export const getEbaStrategyDetailBySlug = (slug: string) =>
  ebaStrategyDetails.find((strategy) => strategy.slug === slug);
