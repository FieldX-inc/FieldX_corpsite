"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

import { trackPageView } from "@/lib/analytics";

type GoogleTagManagerProps = {
  gtmId: string;
};

function GoogleTagManagerPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialPageRef = useRef(false);

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    if (!hasTrackedInitialPageRef.current) {
      hasTrackedInitialPageRef.current = true;
      return;
    }

    trackPageView(pagePath, document.title);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Suspense fallback={null}>
        <GoogleTagManagerPageView />
      </Suspense>
    </>
  );
}
