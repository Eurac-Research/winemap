import { ReactNode } from "react";

import type { Project } from "@/content/projects";

export default function ProjectSmallCard({
    name, slug, link, logo
    }: Project) {
        const cardClassName =
            "block rounded-xl border border-[color:var(--border)] bg-[color:var(--surface-overlay)] p-6 transition-colors hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

        const content = logo ? (
            <div className="border border-[color:var(--border)]">{logo}</div>
            ) : (
            <h3 className="mt-4 text-lg font-semibold">{name}</h3>
            
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