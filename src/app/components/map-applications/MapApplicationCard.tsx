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
      className="min-w-[220px] sm:min-w-[240px] h-40 border border-white rounded-xl snap-start bg-gradient-to-br from-white/10 to-white/0 hover:from-white/15 hover:to-white/5 transition-all duration-200 p-4 flex flex-col gap-3 shadow-lg shadow-black/20 hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-white font-semibold text-sm tracking-wide">{title}</h3>
      </div>
      <p className="text-white/70 text-xs leading-relaxed">{description}</p>
    </Link>
  );
}
