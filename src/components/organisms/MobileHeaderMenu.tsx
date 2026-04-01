"use client";

import { useEffect, useId, useRef, useState } from "react";

import { GlobalNavList } from "@/components/molecules";

type MobileHeaderMenuProps = {
  nav: {
    about: string;
    whatWeDo: string;
    column: string;
    news: string;
    contact: string;
  };
};

export function MobileHeaderMenu({ nav }: MobileHeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
    );
    firstFocusable?.focus();
  }, [isOpen]);

  return (
    <div className="fx-mobile-menu">
      <button
        type="button"
        className="fx-mobile-menu-trigger"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggleMenu}
      >
        <span className="fx-mobile-menu-trigger-text">Menu</span>
        <span className="fx-mobile-menu-trigger-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Close menu backdrop"
            className="fx-mobile-menu-backdrop"
            tabIndex={-1}
            onClick={closeMenu}
          />
          <div id={panelId} ref={panelRef} className="fx-mobile-menu-panel">
            <nav aria-label="Mobile Global">
              <GlobalNavList
                nav={nav}
                enableAboutDropdown={false}
                className="fx-global-nav-list fx-global-nav-list-mobile"
                onNavigate={closeMenu}
              />
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
