import { Link } from 'react-router-dom';
import { glossaryTerms, topics, totalSections, trackGroups } from '../content';

const trackSummaries = trackGroups.map((group) => ({
  ...group,
  firstTopic: group.topics[0],
  glossaryCount: glossaryTerms.filter((term) => term.trackId === group.track.id).length,
  revisionQuestionCount: group.topics.reduce(
    (count, topic) => count + topic.revision.questions.length,
    0,
  ),
  sectionCount: group.topics.reduce((count, topic) => count + topic.sections.length, 0),
}));

const networkingTrack = trackGroups.find((group) => group.track.id === 'networking');
const cyberSecurityTrack = trackGroups.find(
  (group) => group.track.id === 'cyber-security',
);

export default function DashboardPage() {
  return (
    <div className="page-content stagger">
      <section className="hero-grid">
        <article className="hero-card">
          <p className="eyebrow">Field Guide Portal</p>
          <h1>Study networking and cyber security as separate tracks</h1>
          <p className="lede">
            Keep the networking route and the cyber security route distinct, move
            through each in a deliberate order, and still use one portal for search,
            glossary review, and revision.
          </p>
          <div className="cta-row">
            <Link to="/topics?track=networking" className="button-primary">
              Open networking track
            </Link>
            <Link to="/topics?track=cyber-security" className="button-secondary">
              Open cyber security track
            </Link>
          </div>
        </article>

        <aside className="card hero-side">
          <p className="eyebrow">At A Glance</p>
          <h2>Current portal coverage</h2>
          <div className="stats-grid">
            <div>
              <span className="stat-value">{trackGroups.length}</span>
              <span className="stat-label">Study tracks</span>
            </div>
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
          </div>
          <p className="card-copy">
            Networking and cyber security now sit in separate tracks, while the
            portal still shares the same search, glossary, revision, and topic-page
            structure.
          </p>
          <div className="track-snapshot-list">
            {networkingTrack ? (
              <p className="track-snapshot-item">
                <strong>{networkingTrack.track.title}</strong>
                <span>
                  {networkingTrack.topics.length} topics and{' '}
                  {networkingTrack.modules.length} modules
                </span>
              </p>
            ) : null}
            {cyberSecurityTrack ? (
              <p className="track-snapshot-item">
                <strong>{cyberSecurityTrack.track.title}</strong>
                <span>
                  {cyberSecurityTrack.topics.length} topics and{' '}
                  {cyberSecurityTrack.modules.length} modules
                </span>
              </p>
            ) : null}
          </div>
        </aside>
      </section>

      <section>
        <div className="section-title-row">
          <div className="section-heading">
            <p className="eyebrow">Tracks</p>
            <h2>Choose a route through the portal</h2>
            <p className="section-caption">
              Each track keeps its own modules, lesson order, and filtered
              revision/glossary views so related topics stay together instead of
              being blended into one long list.
            </p>
          </div>
          <Link to="/topics" className="text-link">
            Browse the full library
          </Link>
        </div>

        <div className="track-overview-grid">
          {trackSummaries.map((group) => (
            <article key={group.track.id} className="card track-overview-card">
              <div className="track-overview-head">
                <p className="eyebrow">Track</p>
                <h3>{group.track.title}</h3>
              </div>

              <p className="card-copy">{group.track.summary}</p>

              <div className="track-overview-meta">
                <span>{group.topics.length} topics</span>
                <span>{group.sectionCount} sections</span>
                <span>{group.glossaryCount} glossary terms</span>
                <span>{group.revisionQuestionCount} revision questions</span>
              </div>

              <div className="track-overview-block">
                <p className="eyebrow">Modules</p>
                <ul className="link-list track-preview-links">
                  {group.modules.slice(0, 3).map((module) => (
                    <li key={module.id}>
                      <strong>{module.title}</strong>
                      <p>{module.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cta-row">
                <Link
                  to={`/topics?track=${group.track.id}`}
                  className="button-primary"
                >
                  Browse track
                </Link>
                <Link
                  to={`/revision?track=${group.track.id}`}
                  className="button-secondary"
                >
                  Open revision
                </Link>
              </div>

              {group.firstTopic ? (
                <Link to={`/topics/${group.firstTopic.slug}`} className="text-link">
                  Start with {group.firstTopic.title}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="card spotlight-card">
        <div className="section-title-row">
          <div className="section-heading">
            <p className="eyebrow">Shared Tools</p>
            <h2>Use the same portal tools across both tracks</h2>
            <p className="section-caption">
              Search spans both tracks, while glossary and revision pages can stay
              global or be narrowed down to one route at a time.
            </p>
          </div>
        </div>
        <div className="spotlight-grid">
          <article className="reference-card">
            <p className="reference-label">Search</p>
            <h3>Cross-track lookup</h3>
            <p className="card-copy">
              Find topic pages, section headings, and glossary terms without losing
              track context in the results.
            </p>
          </article>
          <article className="reference-card">
            <p className="reference-label">Glossary</p>
            <h3>Filtered definitions</h3>
            <p className="card-copy">
              Review all terms together or isolate networking and cyber security
              vocabulary as separate study passes.
            </p>
          </article>
          <article className="reference-card">
            <p className="reference-label">Revision</p>
            <h3>Track-specific recall</h3>
            <p className="card-copy">
              Keep revision sessions focused by opening a filtered pack for the
              track you are actively studying.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
