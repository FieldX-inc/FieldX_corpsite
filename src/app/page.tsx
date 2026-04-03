import { notFound } from "next/navigation";

import { siteContent } from "@/components/site/content";
import { OperatesXLanding } from "@/components/site/operatesX/OperatesXLanding";
import { getServiceDetail } from "@/components/site/serviceDetails";
import type { ServiceDetail } from "@/components/site/serviceDetails";
import { HomeTemplate } from "@/components/templates";
import { getBlogPosts } from "@/lib/content/repository";
import { isPrelaunchOperatesX } from "@/lib/releasePhase";

type OperatesXLandingDetail = ServiceDetail & {
  hero: NonNullable<ServiceDetail["hero"]>;
  problemSection: NonNullable<ServiceDetail["problemSection"]>;
  ctaSection: NonNullable<ServiceDetail["ctaSection"]>;
  operatesXLanding: NonNullable<ServiceDetail["operatesXLanding"]>;
};

function isOperatesXLandingDetail(detail: ServiceDetail | null): detail is OperatesXLandingDetail {
  return Boolean(detail?.hero && detail.problemSection && detail.ctaSection && detail.operatesXLanding);
}

export default async function HomePage() {
  if (isPrelaunchOperatesX()) {
    const operatesXDetail = getServiceDetail("operates-x");

    if (!isOperatesXLandingDetail(operatesXDetail)) {
      notFound();
    }

    return (
      <section className="fx-section-organism fx-service-detail fx-service-detail-lp fx-service-detail-lp-ja">
        <div className="fx-shell fx-service-detail-shell">
          <OperatesXLanding detail={operatesXDetail} />
        </div>
      </section>
    );
  }

  const columnPosts = (await getBlogPosts()).slice(0, 3);

  return <HomeTemplate content={siteContent} columnPosts={columnPosts} newsPosts={[]} />;
}
