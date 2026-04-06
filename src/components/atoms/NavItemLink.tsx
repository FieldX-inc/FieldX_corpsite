"use client";

import Link from "next/link";

import { trackCtaClick } from "@/lib/analytics";

type NavItemTracking = {
  ctaId: string;
  ctaLabel?: string;
  ctaLocation: string;
};

type NavItemLinkProps = {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
  tracking?: NavItemTracking;
};

export function NavItemLink({ href, label, className, onClick, tracking }: NavItemLinkProps) {
  const handleClick = () => {
    if (tracking) {
      trackCtaClick({
        ctaId: tracking.ctaId,
        ctaLabel: tracking.ctaLabel ?? label,
        ctaLocation: tracking.ctaLocation,
        destinationUrl: href
      });
    }

    onClick?.();
  };

  return (
    <Link href={href} className={className ? `fx-nav-item-link ${className}` : "fx-nav-item-link"} onClick={handleClick}>
      {label}
    </Link>
  );
}
