export default function NotFound() {
  return (
    <main className="grid-stage" id="top">
      <section className="grid-tile tile-intro">
        <span className="tile-label">Not Found</span>
        <h1>ページが見つかりません</h1>
        <p>トップページから、SHUFFLEとREFRAINを選び直してください。</p>
        <div className="intro-actions">
          <a href="/">トップへ戻る</a>
        </div>
      </section>
    </main>
  );
}
