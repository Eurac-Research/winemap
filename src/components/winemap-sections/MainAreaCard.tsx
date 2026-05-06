import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type MainAreaCardProps = {
  href: string;
  title: string;
  description: string;
  imageLabel?: string;
  accentClassName?: string;
};

export default function MainAreaCard({
  href,
  title,
  description,
  imageLabel = "Preview",
}: MainAreaCardProps) {
  return (
    <article className="flex h-full min-w-0 snap-start flex-col overflow-hidden bg-[#0f6eb3] text-white">
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <Image
          src="/images/vineyard_sun.jpg"
          alt={`${title} preview`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,110,179,0.08),rgba(15,110,179,0.2))]" />
        <div className="absolute inset-x-6 top-6 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white">
          {imageLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-7 py-6">
        <h3 className="max-w-[14ch] text-3xl font-semibold leading-tight">
          {title}
        </h3>
        <p className="mt-5 flex-1 text-lg leading-9 text-white/92">
          {description}
        </p>
        <Link
          href={href}
          className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/75 px-4 py-2 text-lg font-medium text-white transition hover:bg-white hover:text-[#0f6eb3]"
        >
          <ArrowRight className="h-4 w-4" />
          <span>More</span>
        </Link>
      </div>
    </article>
  );
}
