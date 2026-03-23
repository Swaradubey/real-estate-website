"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className = "", width = 300, height = 68 }: LogoProps) {
  return (
    <Image
      src="/images/atibha-logo.png"
      alt="ATIBHA REALTY"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
