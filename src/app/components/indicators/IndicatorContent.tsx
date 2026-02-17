"use client";

import Image from "next/image";
import ImageComparisonSlider from "@/app/components/ImageComparisonSlider";

export type TextBlock = {
  type: "text";
  text: string;
};

export type ListBlock = {
  type: "list";
  items: string[];
};

export type VideoBlock = {
  type: "video";
  label: string;
  url: string;
};

export type ImageComparisonBlock = {
  type: "imageComparison";
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
  aspectRatio?: "auto" | "square" | "wide";
  caption?: string;
};

export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string;
  wrapperClassName?: string;
  objectFit?: "contain" | "cover";
};

export type IndicatorContentBlock =
  | TextBlock
  | ListBlock
  | VideoBlock
  | ImageComparisonBlock
  | ImageBlock;

type IndicatorContentProps = {
  blocks?: IndicatorContentBlock[];
};

export default function IndicatorContent({ blocks = [] }: IndicatorContentProps) {
  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        switch (block.type) {
          case "text":
            return (
              <p key={key} className="mt-4 text-white/80">
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={key} className="mt-4 space-y-3 text-white/80">
                {block.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );

          case "video":
            return (
              <p key={key} className="mt-4 text-white/80">
                {block.label} {block.url}
              </p>
            );

          case "imageComparison":
            return (
              <div key={key} className="mt-6 mx-auto w-full max-w-3xl">
                <ImageComparisonSlider
                  beforeImage={block.beforeImage}
                  afterImage={block.afterImage}
                  beforeLabel={block.beforeLabel}
                  afterLabel={block.afterLabel}
                  alt={block.alt}
                  aspectRatio={block.aspectRatio ?? "auto"}
                  caption={block.caption}
                />
              </div>
            );

          case "image":
            return (
              <figure
                key={key}
                className={block.wrapperClassName ?? "w-full max-w-4xl mx-auto px-4"}
              >
                <div
                  className="relative"
                  style={{ aspectRatio: block.aspectRatio ?? "3 / 2" }}
                >
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className={
                      block.objectFit === "cover"
                        ? "object-cover"
                        : "object-contain"
                    }
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-sm text-center text-white/70">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
