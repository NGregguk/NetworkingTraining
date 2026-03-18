import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InlineFormattedText from '../components/InlineFormattedText';
import { topics } from '../content';

export default function RevisionPage() {
  const [activeTopicId, setActiveTopicId] = useState(
    topics.length ? `revision-${topics[0].slug}` : '',
  );

  useEffect(() => {
    if (!topics.length) {
      setActiveTopicId('');
      return;
    }

    const updateActiveTopic = () => {
      const offset = 180;
      let nextActiveTopicId = `revision-${topics[0].slug}`;

      for (const topic of topics) {
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
  }, []);

  return (
    <div className="page-content revision-layout">
      <div className="revision-main stagger">
        <section className="page-hero card">
          <p className="eyebrow">Revision Summary</p>
          <h1>Condensed recall material for later study sessions</h1>
          <p className="lede">
            Use this page after reading the full topic pages. It is written for
            reinforcement, not as a replacement for the deeper explanations.
          </p>
        </section>

        {topics.map((topic) => (
          <section
            key={topic.slug}
            id={`revision-${topic.slug}`}
            className="card revision-card"
          >
            <div className="section-title-row">
              <div>
                <p className="eyebrow">{topic.module.title}</p>
                <h2>{topic.title}</h2>
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
                <h3>Memory Framework</h3>
                <ol className="detail-list numbered-list">
                  {topic.revision.memoryFramework.map((item) => (
                    <li key={item}>
                      <InlineFormattedText text={item} />
                    </li>
                  ))}
                </ol>
              </article>

              <article className="section-panel">
                <h3>Mastery Checklist</h3>
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
                <h3>Self-Check Questions</h3>
                <ul className="detail-list">
                  {topic.revision.questions.map((item) => (
                    <li key={item}>
                      <InlineFormattedText text={item} />
                    </li>
                  ))}
                </ul>
              </article>

              <article className="section-panel">
                <h3>Frequent Errors</h3>
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

      <aside className="revision-rail">
        <div className="card sticky-card">
          <p className="eyebrow">On This Page</p>
          <ul className="section-nav">
            {topics.map((topic) => {
              const topicId = `revision-${topic.slug}`;

              return (
                <li key={topic.slug}>
                  <a
                    href={`#${topicId}`}
                    className={
                      activeTopicId === topicId
                        ? 'section-nav-link section-nav-link-active'
                        : 'section-nav-link'
                    }
                    aria-current={
                      activeTopicId === topicId ? 'location' : undefined
                    }
                  >
                    {topic.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
