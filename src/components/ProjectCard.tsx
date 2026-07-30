import { ReactNode } from "react";

import type { Project } from "@/content/projects";

export default function ProjectSmallCard({
    name, slug, link, logo
    }: Project) {
        const content = (
        <>
            {logo ? (
            <div className="border border-[color:var(--border)]">{logo}</div>
            ) : (
            <h3 className="mt-4 text-lg font-semibold">{name}</h3>
            )}
        </>
        );

        return (
        <div id={slug} className="block rounded-xl border p-6 transition-colors border-[color:var(--border)] bg-[color:var(--surface-overlay)] hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-muted)]">
            {link ? (
                <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                >
                {content}
                </a>
            ) : (
                content
            )}
        </div>
        )
    }