import type { StudyExample, StudySection } from '../content/schema';
import InlineFormattedText from './InlineFormattedText';
import SectionInteractive from './SectionInteractive';

type TopicSectionCardProps = {
  section: StudySection;
};

function renderExample(example: StudyExample, index: number) {
  if (typeof example === 'string') {
    return (
      <li key={`example-${index}`}>
        <InlineFormattedText text={example} />
      </li>
    );
  }

  return (
    <li key={`example-${index}`} className="example-item example-item-code">
      {example.intro && (
        <p>
          <InlineFormattedText text={example.intro} />
        </p>
      )}
      <pre className="example-code-block">
        <code>{example.code}</code>
      </pre>
      {example.outro && (
        <p>
          <InlineFormattedText text={example.outro} />
        </p>
      )}
    </li>
  );
}

export default function TopicSectionCard({
  section,
}: TopicSectionCardProps) {
  return (
    <section id={section.id} className="card section-card">
      <div className="section-header">
        <p className="eyebrow">{section.strapline}</p>
        <h2>{section.title}</h2>
      </div>

      <p className="lede">
        <InlineFormattedText text={section.overview} />
      </p>

      <div className="section-grid">
        <article className="section-panel">
          <h3>Why It Matters</h3>
          <p>
            <InlineFormattedText text={section.whyItMatters} />
          </p>
        </article>

        <article className="section-panel">
          <h3>How It Works</h3>
          <ul className="detail-list">
            {section.howItWorks.map((item) => (
              <li key={item}>
                <InlineFormattedText text={item} />
              </li>
            ))}
          </ul>
        </article>
      </div>

      {section.referenceItems && (
        <div className="reference-grid">
          {section.referenceItems.map((item) => (
            <article key={`${item.label}-${item.value}`} className="reference-card">
              <p className="reference-label">{item.label}</p>
              <h4>{item.value}</h4>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      )}

      <div className="section-grid">
        <article className="section-panel">
          <h3>Examples and Applied Cases</h3>
          <ul className="detail-list">
            {section.examples.map(renderExample)}
          </ul>
        </article>

        <article className="section-panel">
          <h3>Common Misunderstandings</h3>
          <ul className="detail-list">
            {section.misconceptions.map((item) => (
              <li key={item}>
                <InlineFormattedText text={item} />
              </li>
            ))}
          </ul>
        </article>
      </div>

      {section.interactive && <SectionInteractive interactive={section.interactive} />}

      <article className="section-panel recap-panel">
        <h3>Recap</h3>
        <ul className="detail-list">
          {section.recap.map((item) => (
            <li key={item}>
              <InlineFormattedText text={item} />
            </li>
          ))}
        </ul>
      </article>

      {section.connections && (
        <article className="section-panel">
          <h3>Connect This Topic</h3>
          <ul className="link-list">
            {section.connections.map((connection) => (
              <li key={connection.href}>
                <a href={connection.href}>{connection.label}</a>
                <p>
                  <InlineFormattedText text={connection.note} />
                </p>
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}
