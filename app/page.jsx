import Image from "next/image";
import { designProjects } from "@/lib/designs";

export default function Page() {
  const updatedDate = new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "long",
  }).format(new Date("2026-06-17"));

  return (
    <main className="library-shell">
      <header className="library-hero">
        <div>
          <p className="eyebrow">Design Library</p>
          <h1>作ったHP・LPを、ここからすぐ見る。</h1>
        </div>
        <p>
          公開済みサイトとローカル作業フォルダをまとめた一覧です。サムネイルで見分けて、
          必要なページをすぐ開けます。
        </p>
      </header>

      <section className="summary-strip" aria-label="制作物の概要">
        <article>
          <span>{designProjects.length}</span>
          <p>登録済み</p>
        </article>
        <article>
          <span>HP / LP</span>
          <p>制作物タイプ</p>
        </article>
        <article>
          <span>{updatedDate}</span>
          <p>最終整理日</p>
        </article>
      </section>

      <section className="project-grid" aria-label="制作物一覧">
        {designProjects.map((project) => (
          <article className={`project-card ${project.accent}`} key={project.id}>
            <a
              className="project-shot"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title}を開く`}
            >
              <Image
                src={project.image}
                alt={`${project.title}のスクリーンショット`}
                width={1200}
                height={760}
                sizes="(min-width: 980px) 33vw, 100vw"
                priority={project.id === "hotel-shuffle"}
              />
            </a>
            <div className="project-body">
              <div className="project-meta">
                <span>{project.type}</span>
                <span>{project.status}</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-actions">
                <a href={project.url} target="_blank" rel="noreferrer">
                  サイトを見る
                </a>
                <code title={project.localPath}>{project.localPath}</code>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
