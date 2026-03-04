import Link from "next/link";
import { ReactNode } from "react";

type MainAreaCategory = {
  href: string;
  label: string;
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
      className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/20 hover:border-[#E91E63] transition-all duration-300 overflow-hidden backdrop-blur-md rounded-xl shadow-xl hover:shadow-[#E91E63]/20"
    >
      <div className="p-8">
        <Link href={mainHref} className="flex flex-col items-center text-center group/main">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#E91E63]/20 to-[#E91E63]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wide group-hover/main:text-[#E91E63] transition-colors">
            {title}
          </h2>
        </Link>

        <div className="py-4 text-center">
          <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        </div>

        <div className={categoriesClassName}>
          {categories.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="block px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/link"
            >
              <h3 className="text-white/90 font-semibold text-sm group-hover/link:text-[#E91E63] transition-colors">
                {category.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
