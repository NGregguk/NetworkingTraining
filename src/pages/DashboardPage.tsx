import { Link } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { glossaryTerms, topics, totalRevisionQuestions, totalSections } from '../content';

const DASHBOARD_TOPIC_LIMIT = 3;
const currentTopic = topics[0];
const dashboardTopics = topics.slice(0, DASHBOARD_TOPIC_LIMIT);
const remainingTopicCount = Math.max(topics.length - dashboardTopics.length, 0);

export default function DashboardPage() {
  return (
    <div className="page-content stagger">
      <section className="hero-grid">
        <article className="hero-card">
          <p className="eyebrow">Network Field Guide</p>
          <h1>Learn Networking In A Clear Study Order</h1>
          <p className="lede">
            Start with the foundations, move into focused lessons, keep key
            terms clear in the glossary, and use revision questions to check
            what you can explain from memory.
          </p>
          <div className="cta-row">
            <Link to={`/topics/${currentTopic.slug}`} className="button-primary">
              Start with foundations
            </Link>
            <Link to="/glossary" className="button-secondary">
              Review key terms
            </Link>
          </div>
        </article>

        <aside className="card hero-side">
          <p className="eyebrow">At A Glance</p>
          <h2>Current material</h2>
          <div className="stats-grid">
            <div>
              <span className="stat-value">{topics.length}</span>
              <span className="stat-label">Topic pages</span>
            </div>
            <div>
              <span className="stat-value">{totalSections}</span>
              <span className="stat-label">Lesson sections</span>
            </div>
            <div>
              <span className="stat-value">{glossaryTerms.length}</span>
              <span className="stat-label">Glossary terms</span>
            </div>
            <div>
              <span className="stat-value">{totalRevisionQuestions}</span>
              <span className="stat-label">Revision questions</span>
            </div>
          </div>
          <p className="card-copy">
            Each topic is split into lesson sections for easier reading. Use the
            glossary when terms start to blur together, then use the revision
            questions to check recall without looking back at the page.
          </p>
        </aside>
      </section>

      <section>
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Featured Topics</p>
            <h2>Start with these pages</h2>
            <p className="section-caption">
              The dashboard shows the current starting set. Use the full topics
              page for the complete library as more lessons are added.
            </p>
          </div>
          <Link to="/topics" className="text-link">
            {remainingTopicCount > 0
              ? `Browse all ${topics.length} topics`
              : 'Browse all topics'}
          </Link>
        </div>
        <div className="card-grid topics-grid">
          {dashboardTopics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </div>
  );
}
