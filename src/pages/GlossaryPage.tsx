import { Link } from 'react-router-dom';
import { glossaryTerms } from '../content';

const alphabet = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index),
);

const groupedTerms = glossaryTerms.reduce<Record<string, typeof glossaryTerms>>(
  (accumulator, term) => {
    const letter = term.term[0].toUpperCase();
    accumulator[letter] ??= [];
    accumulator[letter].push(term);
    return accumulator;
  },
  {},
);

const groupedTermEntries = Object.entries(groupedTerms).sort(([left], [right]) =>
  left.localeCompare(right),
);

const availableLetters = new Set(groupedTermEntries.map(([letter]) => letter));

function getGlossaryLetterId(letter: string) {
  return `glossary-letter-${letter}`;
}

export default function GlossaryPage() {
  return (
    <div className="page-content stagger">
      <section className="page-hero card">
        <p className="eyebrow">Glossary</p>
        <h1>Core networking terminology</h1>
        <p className="lede">
          Definitions are intentionally compact so they work for review as well as
          first-pass learning.
        </p>
      </section>

      <div className="glossary-layout">
        <div className="glossary-main">
          {groupedTermEntries.map(([letter, terms]) => (
            <section
              key={letter}
              id={getGlossaryLetterId(letter)}
              className="glossary-group"
            >
              <div className="section-title-row">
                <div>
                  <p className="eyebrow">Letter</p>
                  <h2>{letter}</h2>
                </div>
              </div>
              <div className="term-grid">
                {terms.map((term) => (
                  <article key={term.id} id={term.id} className="card term-card">
                    <div className="topic-card-head">
                      <h3>{term.term}</h3>
                      <Link to={term.topicHref} className="text-link">
                        {term.topicTitle}
                      </Link>
                    </div>
                    <p className="card-copy">{term.definition}</p>
                    <p className="term-note">{term.importance}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="glossary-index" aria-label="Glossary alphabet navigation">
          <nav className="glossary-alphabet">
            {alphabet.map((letter) =>
              availableLetters.has(letter) ? (
                <a
                  key={letter}
                  href={`#${getGlossaryLetterId(letter)}`}
                  className="glossary-letter-link"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  aria-hidden="true"
                  className="glossary-letter-disabled"
                >
                  {letter}
                </span>
              ),
            )}
          </nav>
        </aside>
      </div>
    </div>
  );
}
