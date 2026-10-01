import type { ComponentProps } from "react";
import Image from "next/image";

type RespondLogoProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "width" | "height" | "alt"
> & {
  /** The stacked or landscape logo layout. */
  variant?: "vertical" | "landscape";
  /** The supplied RESPOnD logo colour treatment. */
  color?: "standard" | "monochrome";
  alt?: string;
  width?: number;
  height?: number;
};

const respondLogos = {
  vertical: {
    standard: {
      src: "/logos/respond/vertical/RESPOnD_Logo_Standard_small.png",
      width: 638,
      height: 321,
    },
    monochrome: {
      src: "/logos/respond/vertical/RESPOnD_Logo_Monochrome_small.png",
      width: 638,
      height: 321,
    },
  },
  landscape: {
    standard: {
      src: "/logos/respond/landscape/RESPOnD_Logo_Landscape_small.png",
      width: 1048,
      height: 192,
    },
    monochrome: {
      src: "/logos/respond/landscape/RESPOnD_Logo_Monochrome_Landscape_small.png",
      width: 1048,
      height: 192,
    },
  },
} as const;

export default function RespondLogo({
  variant = "vertical",
  color = "standard",
  alt = "RESPOnD logo",
  width,
  height,
  ...props
}: RespondLogoProps) {
  const logo = respondLogos[variant][color];
  const logoWidth =
    width ?? (height ? (height * logo.width) / logo.height : logo.width);
  const logoHeight =
    height ?? (width ? (width * logo.height) / logo.width : logo.height);

  return (
    <Image
      src={logo.src}
      width={logoWidth}
      height={logoHeight}
      alt={alt}
      {...props}
    />
  );
}
