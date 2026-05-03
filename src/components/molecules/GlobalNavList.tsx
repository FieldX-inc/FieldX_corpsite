import { NavItemLink, TextAnchor } from "@/components/atoms";

type GlobalNavListProps = {
  nav: {
    about: string;
    whatWeDo: string;
    column: string;
    news: string;
    contact: string;
  };
  aboutSectionNav?: {
    mvv: string;
    team: string;
    companyProfile: string;
  };
  enableAboutDropdown?: boolean;
  className?: string;
  onNavigate?: () => void;
};

export function GlobalNavList({
  nav,
  aboutSectionNav,
  enableAboutDropdown = true,
  className,
  onNavigate
}: GlobalNavListProps) {
  return (
    <ul className={className ?? "fx-global-nav-list"}>
      <li
        className={
          enableAboutDropdown && aboutSectionNav ? "fx-global-nav-item-dropdown" : undefined
        }
      >
        <NavItemLink href="/about" label={nav.about} onClick={onNavigate} />
        {enableAboutDropdown && aboutSectionNav ? (
          <div className="fx-about-subnav" role="menu" aria-label={`${nav.about} sections`}>
            <ul className="fx-about-subnav-list">
              <li>
                <TextAnchor href="/about#mvv" className="fx-about-subnav-link">
                  {aboutSectionNav.mvv}
                </TextAnchor>
              </li>
              <li>
                <TextAnchor href="/about#team" className="fx-about-subnav-link">
                  {aboutSectionNav.team}
                </TextAnchor>
              </li>
              <li>
                <TextAnchor href="/about#company-profile" className="fx-about-subnav-link">
                  {aboutSectionNav.companyProfile}
                </TextAnchor>
              </li>
            </ul>
          </div>
        ) : null}
      </li>
      <li>
        <NavItemLink href="/service" label={nav.whatWeDo} onClick={onNavigate} />
      </li>
      <li className={enableAboutDropdown ? "fx-global-nav-item-dropdown" : undefined}>
        <NavItemLink href="/column/magazine" label={nav.column} onClick={onNavigate} />
        {enableAboutDropdown ? (
          <div className="fx-about-subnav" role="menu" aria-label={`${nav.column} sections`}>
            <ul className="fx-about-subnav-list">
              <li>
                <TextAnchor href="/column/magazine" className="fx-about-subnav-link">
                  マガジン
                </TextAnchor>
              </li>
              <li>
                <TextAnchor href="/column/materials" className="fx-about-subnav-link">
                  資料一覧
                </TextAnchor>
              </li>
            </ul>
          </div>
        ) : null}
      </li>
      <li>
        <NavItemLink href="/news" label={nav.news} onClick={onNavigate} />
      </li>
      <li className="fx-global-nav-item-contact">
        <NavItemLink
          href="/contact"
          label={nav.contact}
          className="fx-nav-item-link-contact"
          onClick={onNavigate}
          tracking={{
            ctaId: "global_nav_contact",
            ctaLocation: "global_nav"
          }}
        />
      </li>
    </ul>
  );
}
