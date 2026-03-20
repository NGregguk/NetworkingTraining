import { Link } from 'react-router-dom';
import type { StudyTopic } from '../content/schema';

type TopicCardProps = {
  topic: StudyTopic;
  showModule?: boolean;
  titleTag?: 'h3' | 'h4';
};

export default function TopicCard({
  topic,
  showModule = true,
  titleTag = 'h3',
}: TopicCardProps) {
  const TitleTag = titleTag;

  return (
    <article
      className={
        showModule ? 'card topic-card' : 'card topic-card topic-card-no-context'
      }
    >
      <div className="topic-card-head">
        {showModule ? (
          <p className="eyebrow topic-card-context">{topic.module.title}</p>
        ) : null}
        <span className="badge">{topic.level}</span>
      </div>
      <TitleTag className="topic-card-title">{topic.title}</TitleTag>
      <div className="meta-row topic-card-meta">
        <span>{topic.sections.length} sections</span>
      </div>
      <p className="card-copy topic-card-summary">{topic.summary}</p>
      <div className="tag-row topic-card-tags">
        {topic.tags.map((tag) => (
          <span key={tag} className="chip">
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/topics/${topic.slug}`} className="topic-card-link">
        <span>Open topic</span>
        <span aria-hidden="true">-&gt;</span>
      </Link>
    </article>
  );
}
