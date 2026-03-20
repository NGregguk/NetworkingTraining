import { Link, useSearchParams } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import TrackFilter from '../components/TrackFilter';
import { getTrackById, isTrackId, trackGroups } from '../content';

export default function TopicsPage() {
  const [searchParams] = useSearchParams();
  const requestedTrackId = searchParams.get('track');
  const activeTrackId = isTrackId(requestedTrackId) ? requestedTrackId : undefined;
  const activeTrack = activeTrackId ? getTrackById(activeTrackId) : undefined;
  const visibleTrackGroups = activeTrackId
    ? trackGroups.filter((group) => group.track.id === activeTrackId)
    : trackGroups;

  return (
    <div className="page-content stagger">
      <section className="page-hero card">
        <p className="eyebrow">Topic Index</p>
        <h1>
          {activeTrack
            ? `${activeTrack.title} topics organised by module`
            : 'Study tracks organised by module'}
        </h1>
        <p className="lede">
          {activeTrack
            ? `${activeTrack.summary} Move through the modules in order, then branch back to the other track when you want adjacent study without mixing the core sequence.`
            : 'Networking and cyber security are now separated into distinct tracks so each route can keep its own study order while still sharing the same portal.'}
        </p>
        <TrackFilter pathname="/topics" activeTrackId={activeTrackId} />
      </section>

      {visibleTrackGroups.map((trackGroup) => (
        <section key={trackGroup.track.id} className="track-section">
          <div className="section-title-row">
            <div className="section-heading">
              {!activeTrackId ? <p className="eyebrow">Track</p> : null}
              <h2>{trackGroup.track.title}</h2>
              <p className="section-caption">{trackGroup.track.summary}</p>
            </div>
            <div className="meta-row track-section-meta">
              <span>{trackGroup.topics.length} topics</span>
              <span>{trackGroup.modules.length} modules</span>
            </div>
          </div>

          <div className="module-stack">
            {trackGroup.modules.map((module) => (
              <section key={module.id} className="module-section">
                <div className="section-title-row">
                  <div className="section-heading">
                    <h3>{module.title}</h3>
                  </div>
                  <p className="section-caption">{module.summary}</p>
                </div>
                <div className="card-grid topics-grid">
                  {module.topics.map((topic) => (
                    <TopicCard
                      key={topic.slug}
                      topic={topic}
                      showModule={false}
                      titleTag="h4"
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      ))}

      {!activeTrackId ? null : (
        <section className="card spotlight-card">
          <div className="section-title-row">
            <div className="section-heading">
              <p className="eyebrow">Track Tools</p>
              <h2>Stay inside this track while you revise</h2>
            </div>
          </div>
          <div className="cta-row">
            <Link to={`/revision?track=${activeTrackId}`} className="button-secondary">
              Open filtered revision
            </Link>
            <Link to={`/glossary?track=${activeTrackId}`} className="button-secondary">
              Open filtered glossary
            </Link>
            <Link to="/topics" className="text-link">
              Return to all tracks
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
