import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import InlineFormattedText from '../components/InlineFormattedText';
import OnThisPageNav from '../components/OnThisPageNav';
import TopicSectionCard from '../components/TopicSectionCard';
import { getTopicBySlug } from '../content';
import NotFoundPage from './NotFoundPage';

export default function TopicPage() {
  const { slug } = useParams();
  const topic = slug ? getTopicBySlug(slug) : undefined;
  const sections = topic?.sections ?? [];
  const [activeSectionId, setActiveSectionId] = useState('');

  useEffect(() => {
    if (!topic || !sections.length) {
      setActiveSectionId('');
      return;
    }

    const updateActiveSection = () => {
      const offset = 180;
      let nextActiveSectionId = sections[0].id;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        if (element.getBoundingClientRect().top <= offset) {
          nextActiveSectionId = section.id;
          continue;
        }

        break;
      }

      setActiveSectionId((current) =>
        current === nextActiveSectionId ? current : nextActiveSectionId,
      );
    };

    let isTicking = false;

    const handleScroll = () => {
      if (isTicking) {
        return;
      }

      isTicking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        isTicking = false;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [topic, sections]);

  if (!topic) {
    return <NotFoundPage />;
  }

  const sectionLinks = topic.sections.map((section) => ({
    id: section.id,
    href: `#${section.id}`,
    label: section.title,
  }));

  return (
    <div className="page-content topic-layout stagger">
      <aside className="topic-rail topic-rail-left">
        <div className="card sticky-card">
          <p className="eyebrow">Study Shortcuts</p>
          <ul className="link-list compact-links">
            <li>
              <Link to="/glossary">Open glossary</Link>
              <p>Reinforce definitions while reading.</p>
            </li>
            <li>
              <Link to="/revision">Open revision pack</Link>
              <p>Condensed recall cues and self-check prompts.</p>
            </li>
          </ul>
        </div>
      </aside>

      <div className="topic-main">
        <section className="hero-card topic-hero">
          <p className="eyebrow">{topic.module.title}</p>
          <h1>{topic.title}</h1>
          <p className="lede">{topic.summary}</p>
          <p className="hero-note">{topic.heroNote}</p>
          <div className="meta-row">
            <span>{topic.level}</span>
          </div>
        </section>

        <details className="card on-this-page-mobile">
          <summary className="on-this-page-summary">
            <span className="on-this-page-summary-copy">
              <span className="eyebrow on-this-page-eyebrow">On This Page</span>
              <span className="on-this-page-summary-detail">
                {sectionLinks.length} sections
              </span>
            </span>
            <span className="on-this-page-chevron" aria-hidden="true">
              ▾
            </span>
          </summary>
          <nav className="on-this-page-mobile-body" aria-label="On this page">
            <OnThisPageNav items={sectionLinks} activeId={activeSectionId} />
          </nav>
        </details>

        <section className="card">
          <div className="section-title-row">
            <div className="section-heading">
              <p className="eyebrow">Learning Objectives</p>
              <h2>What this page should leave you able to do</h2>
            </div>
          </div>
          <ul className="detail-list">
            {topic.learningObjectives.map((objective) => (
              <li key={objective}>
                <InlineFormattedText text={objective} />
              </li>
            ))}
          </ul>
        </section>

        {topic.sections.map((section) => (
          <TopicSectionCard key={section.id} section={section} />
        ))}

        <section className="card">
          <div className="section-title-row">
            <div className="section-heading">
              <p className="eyebrow">End-Of-Topic Reinforcement</p>
              <h2>Quick review before you move on</h2>
            </div>
          </div>
          <p className="lede">
            <InlineFormattedText text={topic.revision.summary} />
          </p>
          <div className="section-grid">
            <article className="section-panel">
              <h3>Memory Framework</h3>
              <ul className="detail-list">
                {topic.revision.memoryFramework.map((item) => (
                  <li key={item}>
                    <InlineFormattedText text={item} />
                  </li>
                ))}
              </ul>
            </article>
            <article className="section-panel">
              <h3>Common Pitfalls</h3>
              <ul className="detail-list">
                {topic.revision.pitfalls.map((item) => (
                  <li key={item}>
                    <InlineFormattedText text={item} />
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="cta-row">
            <Link to="/revision" className="button-primary">
              Open revision pack
            </Link>
            <Link to="/glossary" className="button-secondary">
              Review glossary terms
            </Link>
          </div>
        </section>
      </div>

      <aside className="topic-rail topic-rail-right">
        <div className="card sticky-card on-this-page-desktop">
          <p className="eyebrow">On This Page</p>
          <OnThisPageNav items={sectionLinks} activeId={activeSectionId} />
        </div>
      </aside>
    </div>
  );
}
