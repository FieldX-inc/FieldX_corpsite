type EventParams = Record<string, string | number | boolean | null | undefined>;

type Gtag = (
  command: "event" | "config" | "js",
  eventNameOrId: string | Date,
  params?: EventParams
) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

type CtaClickParams = {
  ctaId: string;
  ctaLabel: string;
  ctaLocation: string;
  destinationUrl: string;
};

export type AttributionContext = {
  pagePath: string;
  pageTitle: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

function hasGtag() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function getCurrentPagePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.pathname}${window.location.search}`;
}

export function getAttributionContext(): AttributionContext {
  if (typeof window === "undefined") {
    return {
      pagePath: "",
      pageTitle: "",
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmContent: "",
      utmTerm: ""
    };
  }

  const searchParams = new URLSearchParams(window.location.search);

  return {
    pagePath: getCurrentPagePath(),
    pageTitle: document.title,
    referrer: document.referrer,
    utmSource: searchParams.get("utm_source") ?? "",
    utmMedium: searchParams.get("utm_medium") ?? "",
    utmCampaign: searchParams.get("utm_campaign") ?? "",
    utmContent: searchParams.get("utm_content") ?? "",
    utmTerm: searchParams.get("utm_term") ?? ""
  };
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (!hasGtag()) {
    return;
  }

  window.gtag?.("event", eventName, params);
}

function getDestinationType(destinationUrl: string) {
  if (destinationUrl.startsWith("mailto:")) {
    return "email";
  }

  if (destinationUrl.startsWith("#")) {
    return "anchor";
  }

  if (destinationUrl.startsWith("/")) {
    return "internal";
  }

  return "external";
}

export function trackCtaClick({ ctaId, ctaLabel, ctaLocation, destinationUrl }: CtaClickParams) {
  trackEvent("cta_clicked", {
    cta_id: ctaId,
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    destination_url: destinationUrl,
    destination_type: getDestinationType(destinationUrl),
    page_path: getCurrentPagePath()
  });
}
