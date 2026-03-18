import TopicCard from '../components/TopicCard';
import { modules } from '../content';

export default function TopicsPage() {
  return (
    <div className="page-content stagger">
      <section className="page-hero card">
        <p className="eyebrow">Topic Index</p>
        <h1>Study topics organized by module</h1>
        <p className="lede">
          Move from broad overviews into focused lessons and use the links
          between pages to deepen your understanding of related concepts.
        </p>
      </section>

      {modules.map((module) => (
        <section key={module.id}>
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Module</p>
              <h2>{module.title}</h2>
            </div>
            <p className="section-caption">{module.summary}</p>
          </div>
          <div className="card-grid topics-grid">
            {module.topics.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
