type EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
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
  gaClientId: string;
};

function hasDataLayer() {
  return typeof window !== "undefined" && Array.isArray(window.dataLayer);
}

export function getCurrentPagePath() {
  if (typeof window === "undefined") {
    return "";
  }

  return `${window.location.pathname}${window.location.search}`;
}

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return "";
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] ?? "") : "";
}

function getGaClientId() {
  const gaCookie = getCookieValue("_ga");
  const parts = gaCookie.split(".");

  if (parts.length < 4) {
    return "";
  }

  return `${parts[2]}.${parts[3]}`;
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
      utmTerm: "",
      gaClientId: ""
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
    utmTerm: searchParams.get("utm_term") ?? "",
    gaClientId: getGaClientId()
  };
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (!hasDataLayer()) {
    return;
  }

  window.dataLayer?.push({
    event: eventName,
    ...params
  });
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

export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle
  });
}
