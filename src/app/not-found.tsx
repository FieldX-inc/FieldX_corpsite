import Link from "next/link";

import { NotFoundRunner } from "@/components/organisms/NotFoundRunner";

export default function NotFound() {
  return (
    <section className="fx-page-section fx-not-found">
      <div className="fx-shell fx-not-found-inner">
        <p className="fx-not-found-kicker">404</p>
        <NotFoundRunner />
        <h1 className="fx-not-found-title">ページは現在、準備中です</h1>
        <p className="fx-not-found-message">
          お探しのページは見つかりませんでした。
          <br />
          URLが変更されたか、AIエージェントが準備中かもしれません。
        </p>
        <div className="fx-not-found-actions">
          <Link href="/" className="fx-not-found-primary-link">
            トップへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
