import { Link } from 'react-router-dom';
import type { StudyTopic } from '../content/schema';

type TopicCardProps = {
  topic: StudyTopic;
};

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <article className="card topic-card">
      <div className="topic-card-head">
        <p className="eyebrow">{topic.module.title}</p>
        <span className="badge">{topic.level}</span>
      </div>
      <h3>{topic.title}</h3>
      <p className="card-copy">{topic.summary}</p>
      <div className="meta-row">
        <span>{topic.estimatedStudyTime}</span>
        <span>{topic.sections.length} sections</span>
      </div>
      <div className="tag-row">
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
