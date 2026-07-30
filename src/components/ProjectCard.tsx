import Image from "next/image";
import type { Project } from "@/content/projects";

function ProjectLogo({
  name,
  logo,
  logoImage,
}: Pick<Project, "name" | "logo" | "logoImage">) {
  if (logo) {
    return logo;
  }

  if (logoImage) {
    return (
      <Image
        src={logoImage}
        alt={`${name} logo`}
        width={320}
        height={160}
        className="h-full w-full object-contain"
      />
    );
  }

  return null;
}

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
      <ProjectLogo name={name} logo={logo} />
    </div>
  ) : logoImage ? (
    <div className="flex h-16 items-center justify-center p-3">
      <ProjectLogo name={name} logoImage={logoImage} />
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

export function ProjectDetailCard({
  name,
  slug,
  link,
  logo,
  logoImage,
  description,
}: Project) {
  const hasLogo = Boolean(logo || logoImage);
  const cardClassName =
    "block rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-overlay)] p-6 transition-colors hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const content = (
    <>
      <h3 className="text-lg font-semibold">{name} Project</h3>
      <div className={hasLogo ? "flex items-start justify-between gap-6" : ""}>
        <p className="mt-2 app-muted">{description}</p>
        {hasLogo ? (
          <div className="flex w-40 shrink-0 items-center justify-center p-3">
            <ProjectLogo name={name} logo={logo} logoImage={logoImage} />
          </div>
        ) : null}
      </div>
      {link ? (
        <span className="mt-4 inline-flex items-center gap-2 underline underline-offset-4">
          Visit {name} project page &rarr;
        </span>
      ) : null}
    </>
  );

  return link ? (
    <a
      id={slug}
      href={link}
      className={cardClassName}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <section id={slug} className={cardClassName}>
      {content}
    </section>
  );
}
