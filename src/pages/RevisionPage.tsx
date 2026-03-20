import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import InlineFormattedText from '../components/InlineFormattedText';
import OnThisPageNav from '../components/OnThisPageNav';
import TrackFilter from '../components/TrackFilter';
import { getTrackById, isTrackId, trackGroups } from '../content';

export default function RevisionPage() {
  const [searchParams] = useSearchParams();
  const requestedTrackId = searchParams.get('track');
  const activeTrackId = isTrackId(requestedTrackId) ? requestedTrackId : undefined;
  const activeTrack = activeTrackId ? getTrackById(activeTrackId) : undefined;
  const visibleTrackGroups = activeTrackId
    ? trackGroups.filter((group) => group.track.id === activeTrackId)
    : trackGroups;

  const revisionTopics = useMemo(
    () => visibleTrackGroups.flatMap((group) => group.topics),
    [visibleTrackGroups],
  );

  const [activeTopicId, setActiveTopicId] = useState('');

  const topicLinks = revisionTopics.map((topic) => ({
    id: `revision-${topic.slug}`,
    href: `#revision-${topic.slug}`,
    label: activeTrackId ? topic.title : `${topic.track.title}: ${topic.title}`,
  }));

  useEffect(() => {
    if (!revisionTopics.length) {
      setActiveTopicId('');
      return;
    }

    const updateActiveTopic = () => {
      const offset = 180;
      let nextActiveTopicId = `revision-${revisionTopics[0].slug}`;

      for (const topic of revisionTopics) {
        const topicId = `revision-${topic.slug}`;
        const element = document.getElementById(topicId);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= offset) {
          nextActiveTopicId = topicId;
          continue;
        }

        break;
      }

      setActiveTopicId((current) =>
        current === nextActiveTopicId ? current : nextActiveTopicId,
      );
    };

    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(() => {
        updateActiveTopic();
        isTicking = false;
      });
    };

    updateActiveTopic();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveTopic);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveTopic);
    };
  }, [revisionTopics]);

  return (
    <div className="page-content revision-layout">
      <div className="revision-main stagger">
        <section className="page-hero card">
          <p className="eyebrow">Revision Summary</p>
          <h1>
            {activeTrack
              ? `${activeTrack.title} recall material`
              : 'Condensed recall material for both study tracks'}
          </h1>
          <p className="lede">
            {activeTrack
              ? `Use this filtered pack after reading the full ${activeTrack.title.toLowerCase()} topic pages. It is designed for reinforcement rather than first-pass learning.`
              : 'Use this page after reading the full topic pages. It stays within the shared portal, but you can filter it so networking and cyber security revision remain separate.'}
          </p>
          <TrackFilter pathname="/revision" activeTrackId={activeTrackId} />
        </section>

        <details className="card on-this-page-mobile">
          <summary className="on-this-page-summary">
            <span className="on-this-page-summary-copy">
              <span className="eyebrow on-this-page-eyebrow">On This Page</span>
              <span className="on-this-page-summary-detail">
                {topicLinks.length} topics
              </span>
            </span>
            <span className="on-this-page-summary-action" aria-hidden="true">
              <span className="on-this-page-state on-this-page-state-closed">
                Show list
              </span>
              <span className="on-this-page-state on-this-page-state-open">
                Hide list
              </span>
              <span className="on-this-page-chevron">v</span>
            </span>
          </summary>
          <nav className="on-this-page-mobile-body" aria-label="On this page">
            <OnThisPageNav items={topicLinks} activeId={activeTopicId} />
          </nav>
        </details>

        {visibleTrackGroups.map((group) => (
          <section key={group.track.id} className="track-section">
            <div className="section-title-row">
              <div className="section-heading">
                {!activeTrackId ? <p className="eyebrow">Track</p> : null}
                <h2>{group.track.title}</h2>
                <p className="section-caption">{group.track.summary}</p>
              </div>
              <div className="meta-row track-section-meta">
                <span>{group.topics.length} topics</span>
                <span>
                  {group.topics.reduce(
                    (count, topic) => count + topic.revision.questions.length,
                    0,
                  )}{' '}
                  revision questions
                </span>
              </div>
            </div>

            <div className="track-topic-stack">
              {group.topics.map((topic) => (
                <section
                  key={topic.slug}
                  id={`revision-${topic.slug}`}
                  className="card revision-card"
                >
                  <div className="section-title-row">
                    <div className="section-heading">
                      <p className="eyebrow">{topic.module.title}</p>
                      <h3>{topic.title}</h3>
                    </div>
                    <Link to={`/topics/${topic.slug}`} className="text-link">
                      Return to full topic
                    </Link>
                  </div>

                  <p className="lede">
                    <InlineFormattedText text={topic.revision.summary} />
                  </p>

                  <div className="section-grid">
                    <article className="section-panel">
                      <h4>Memory Framework</h4>
                      <ol className="detail-list numbered-list">
                        {topic.revision.memoryFramework.map((item) => (
                          <li key={item}>
                            <InlineFormattedText text={item} />
                          </li>
                        ))}
                      </ol>
                    </article>

                    <article className="section-panel">
                      <h4>Mastery Checklist</h4>
                      <ul className="detail-list">
                        {topic.revision.checklist.map((item) => (
                          <li key={item}>
                            <InlineFormattedText text={item} />
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>

                  <div className="section-grid">
                    <article className="section-panel">
                      <h4>Self-Check Questions</h4>
                      <ul className="detail-list">
                        {topic.revision.questions.map((item) => (
                          <li key={item}>
                            <InlineFormattedText text={item} />
                          </li>
                        ))}
                      </ul>
                    </article>

                    <article className="section-panel">
                      <h4>Frequent Errors</h4>
                      <ul className="detail-list">
                        {topic.revision.pitfalls.map((item) => (
                          <li key={item}>
                            <InlineFormattedText text={item} />
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="revision-rail">
        <div className="card sticky-card on-this-page-desktop">
          <p className="eyebrow">On This Page</p>
          <OnThisPageNav items={topicLinks} activeId={activeTopicId} />
        </div>
      </aside>
    </div>
  );
}
