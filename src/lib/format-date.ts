const japaneseDateFormatter = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Tokyo"
});

export function formatDate(date: string): string {
  return japaneseDateFormatter.format(new Date(date));
}
