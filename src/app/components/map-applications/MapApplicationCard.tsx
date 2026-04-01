import Link from "next/link";
import { ReactNode } from "react";

type MapApplicationCardProps = {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
};

export default function MapApplicationCard({
  href,
  title,
  description,
  icon,
}: MapApplicationCardProps) {
  return (
    <Link
      href={href}
      className="min-w-[220px] sm:min-w-[240px] h-40 rounded-xl snap-start transition-all duration-200 p-4 flex flex-col gap-3 hover:-translate-y-0.5 border [border-color:var(--border-soft)] bg-gradient-to-br from-[color:var(--surface-panel-muted)] to-[color:transparent] hover:from-[color:var(--surface-overlay)] hover:to-[color:var(--surface-panel-muted)] shadow-lg"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-sm tracking-wide text-[color:var(--text-strong)]">{title}</h3>
      </div>
      <p className="text-xs leading-relaxed text-[color:var(--text-muted)]">{description}</p>
    </Link>
  );
}
