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
      className="min-w-[280px] sm:min-w-[320px] h-40 border border-white rounded-lg snap-start bg-white/5 hover:bg-white/10 transition-colors p-4 flex flex-col gap-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg border border-white/40 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-white font-semibold text-base">{title}</h3>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
