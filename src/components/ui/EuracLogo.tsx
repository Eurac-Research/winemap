import type { ComponentProps } from "react";
import Image from "next/image";

type EuracLogoProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "width" | "height" | "alt"
> & {
  /** The stacked or landscape logo layout. */
  variant?: "vertical" | "landscape";
  /** The supplied Eurac logo colour. */
  color?: "white" | "red" | "grey" | "black";
  alt?: string;
  width?: number;
  height?: number;
};

const euracLogos = {
  vertical: {
    white: {
      src: "/logos/eurac/vertical/eurac_logo_white_WEB_neg.png",
      width: 790,
      height: 284,
    },
    red: {
      src: "/logos/eurac/vertical/eurac_logo_red_WEB_pos.png",
      width: 790,
      height: 284,
    },
    grey: {
      src: "/logos/eurac/vertical/eurac_logo_grey_WEB_pos.png",
      width: 790,
      height: 284,
    },
    black: {
      src: "/logos/eurac/vertical/eurac_logo_black_WEB_pos.png",
      width: 790,
      height: 284,
    },
  },
  landscape: {
    white: {
      src: "/logos/eurac/landscape/eurac_logo_special%20version_white_WEB_neg.png",
      width: 1422,
      height: 164,
    },
    red: {
      src: "/logos/eurac/landscape/eurac_logo_special%20version_red_WEB_pos.png",
      width: 1422,
      height: 164,
    },
    grey: {
      src: "/logos/eurac/landscape/eurac_logo_special%20version_grey_WEB_pos.png",
      width: 1422,
      height: 164,
    },
    black: {
      src: "/logos/eurac/landscape/eurac_logo_special%20version_black_WEB_pos.png",
      width: 1422,
      height: 164,
    },
  },
} as const;

export default function EuracLogo({
  variant = "vertical",
  color = "red",
  alt = "Eurac Research",
  width,
  height,
  ...props
}: EuracLogoProps) {
  const logo = euracLogos[variant][color];
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
