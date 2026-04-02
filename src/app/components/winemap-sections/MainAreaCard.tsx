import Link from "next/link";
import { ReactNode } from "react";
import styles from "@/styles/Home.module.css";

type MainAreaCategory = {
  href: string;
  label: string;
  description: string
};

type MainAreaCardProps = {
  id: string;
  title: ReactNode;
  description: string;
  icon: ReactNode;
  mainHref: string;
  categories: MainAreaCategory[];
  categoriesClassName?: string;
};

export default function MainAreaCard({
  id,
  title,
  description,
  icon,
  mainHref,
  categories,
  categoriesClassName,
}: MainAreaCardProps) {
  return (
    <div
      id={id}
      className={`relative ${styles.interactiveBox}`}
    >
      <div className="flex h-full flex-col p-8 sm:p-9">
        <Link href={mainHref} className="flex flex-col items-center text-center">
          <div
            className="mb-5 flex h-24 w-24 items-center justify-center rounded-[1.25rem] shadow-sm"
          >
            {icon}
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wide transition-colors text-[color:var(--text-strong)]">
            {title}
          </h2>
        </Link>

        <div className="flex-1 py-5 text-center">
          <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">{description}</p>
        </div>

        <div className={categoriesClassName}>
          {categories.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              title={category.description}
              className={`group block px-3 py-2 ${styles.interactiveLink}`}
            >
              <h3 className={`font-semibold text-sm ${styles.interactiveLinkLabel}`}>
                {category.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
