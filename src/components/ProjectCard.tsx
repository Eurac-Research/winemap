import Image from "next/image";
import type { Project } from "@/content/projects";

export default function ProjectSmallCard({
  name,
  slug,
  link,
  logo,
  logoImage,
}: Project) {
  const cardClassName =
    "block rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-overlay)] p-6 transition-colors hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const content = logo ? (
    <div className="flex h-16 items-center justify-center p-3">
      {logo}
    </div>
  ) : logoImage ? (
    <div className="flex h-16 items-center justify-center p-3">
      <Image
        src={logoImage}
        alt={`${name} logo`}
        width={320}
        height={160}
        className="h-full w-full object-contain"
      />
    </div>
  ) : (
    <h3 className="flex h-16 items-center justify-center text-center text-2xl font-semibold leading-tight">
      {name}
    </h3>
  );

  return link ? (
    <a
      href={link}
      className={cardClassName}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <div id={slug} className={cardClassName}>
      {content}
    </div>
  );
}
