import Image from "next/image";

type EuracLogoProps = {
  variant?: "main" | "special";
  className?: string;
  alt?: string;
  sizes?: string;
};

const euracLogos = {
  main: {
    src: "/logos/eurac/main%20version_2021/SCREEN/eurac_logo_red_WEB_pos.png",
    width: 790,
    height: 284,
  },
  special: {
    src: "/logos/eurac/special%20version_2021/SCREEN/eurac_logo_special%20version_red_WEB_pos.png",
    width: 1422,
    height: 164,
  },
} as const;

export default function EuracLogo({
  variant = "main",
  className,
  alt = "Eurac Research",
  sizes,
}: EuracLogoProps) {
  const logo = euracLogos[variant];

  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={alt}
      sizes={sizes}
      className={className}
    />
  );
}
