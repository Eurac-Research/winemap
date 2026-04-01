import Link from "next/link";
import { ReactNode } from "react";
import styles from "@/styles/Home.module.css";

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
      className={`min-w-[220px] sm:min-w-[240px] h-40 snap-start p-4 flex flex-col gap-3 ${styles.interactiveBox}`}
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
