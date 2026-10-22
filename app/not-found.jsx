export default function NotFound() {
  return (
    <main className="notfound" id="top">
      <span className="tile-label">Not Found</span>
      <h1>ページが見つかりません</h1>
      <p>トップページから、SHUFFLEとREFRAINを選び直してください。</p>
      <a className="btn ghost-paper" href="/">
        トップへ戻る <span aria-hidden="true" className="arrow">→</span>
      </a>
    </main>
  );
}
