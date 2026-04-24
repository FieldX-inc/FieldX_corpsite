import Image from "next/image";
import Link from "next/link";

import { BodyText, Surface } from "@/components/atoms";

import aboutGradientImage from "../../../Gradient-eclipse-1.png";
import serviceGradientImage from "../../../Gradient-eclipse-1 (1).png";

import type { ColumnPost } from "@/types/content";
import type { HomeSection } from "@/types/site";

type HomeNewsOrganismProps = {
  sectionId: HomeSection;
  heading: string;
  eyebrowJa: string;
  emptyLabel: string;
  posts: ColumnPost[];
  titleId?: string;
};

function formatPublishedAt(value?: string) {
  if (!value) {
    return "2026/01/01";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "2026/01/01";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function HomeNewsOrganism({
  sectionId,
  heading,
  eyebrowJa,
  emptyLabel,
  posts,
  titleId = "home-news-title"
}: HomeNewsOrganismProps) {
  const featuredPosts = posts.slice(0, 5);

  return (
    <Surface as="section" id={sectionId} tone="light" labelledBy={titleId} className="fx-home-news-organism">
      <div className="fx-home-news-panel">
        <div className="fx-shell fx-home-news-shell">
          <header className="fx-home-news-header">
            <h2 id={titleId} className="fx-home-news-eyebrow-en">
              {heading}
            </h2>
            <p className="fx-home-news-eyebrow-ja">{eyebrowJa}</p>
          </header>

          {featuredPosts.length === 0 ? (
            <BodyText>{emptyLabel}</BodyText>
          ) : (
            <ul className="fx-home-news-list" aria-label={heading}>
              {featuredPosts.map((post) => (
                <li key={post.slug} className="fx-home-news-item">
                  <Link href={`/column/${post.slug}`} className="fx-home-news-link">
                    <p className="fx-home-news-date">{formatPublishedAt(post.publishedAt)}</p>
                    <p className="fx-home-news-title">{post.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="fx-home-news-links">
        <Link href="/about" className="fx-home-news-link-card fx-home-news-link-card-about">
          <Image
            src={aboutGradientImage}
            alt=""
            width={809}
            height={299}
            sizes="50vw"
            className="fx-home-news-link-card-image"
            aria-hidden="true"
          />
        </Link>

        <Link href="/what-we-do" className="fx-home-news-link-card fx-home-news-link-card-service">
          <Image
            src={serviceGradientImage}
            alt=""
            width={809}
            height={299}
            sizes="50vw"
            className="fx-home-news-link-card-image"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Surface>
  );
}
