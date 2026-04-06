"use client";

import Link from "next/link";

import { trackCtaClick } from "@/lib/analytics";

type TextAnchorTracking = {
  ctaId: string;
  ctaLabel: string;
  ctaLocation: string;
};

type TextAnchorProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  tracking?: TextAnchorTracking;
};

export function TextAnchor({ href, children, className, tracking }: TextAnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const classes = className ?? "fx-text-anchor";
  const handleClick = () => {
    if (!tracking) {
      return;
    }

    trackCtaClick({
      ctaId: tracking.ctaId,
      ctaLabel: tracking.ctaLabel,
      ctaLocation: tracking.ctaLocation,
      destinationUrl: href
    });
  };

  if (isInternal) {
    return (
      <Link href={href} className={classes} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} onClick={handleClick}>
      {children}
    </a>
  );
}
