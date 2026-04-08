import { SectionKicker, SectionTitle } from "@/components/atoms";

type EditorialHeadingProps = {
  title: string;
  titleId?: string;
  kicker?: string;
  level?: "h1" | "h2" | "h3";
  className?: string;
};

export function EditorialHeading({
  title,
  titleId,
  kicker,
  level = "h2",
  className
}: EditorialHeadingProps) {
  const headingClassName = [
    "fx-editorial-heading",
    `fx-editorial-heading-level-${level.slice(1)}`,
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className="fx-editorial-heading-group">
      {kicker ? <SectionKicker text={kicker} /> : null}
      <SectionTitle as={level} id={titleId} className={headingClassName}>
        {title}
      </SectionTitle>
    </header>
  );
}
