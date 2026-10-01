import type { ComponentType } from "react";

export type TopicMetadata = {
  slug: string;
  title: string;
  description: string;
  order: number;
};

export type Topic = TopicMetadata & {
  Component: ComponentType;
};
