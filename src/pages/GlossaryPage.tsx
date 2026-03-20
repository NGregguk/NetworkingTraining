import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TrackFilter from '../components/TrackFilter';
import { getTrackById, glossaryTerms, isTrackId } from '../content';

const alphabet = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index),
);

function getGlossaryLetterId(letter: string) {
  return `glossary-letter-${letter}`;
}

export default function GlossaryPage() {
  const [searchParams] = useSearchParams();
  const requestedTrackId = searchParams.get('track');
  const activeTrackId = isTrackId(requestedTrackId) ? requestedTrackId : undefined;
  const activeTrack = activeTrackId ? getTrackById(activeTrackId) : undefined;

  const filteredTerms = useMemo(
    () =>
      activeTrackId
        ? glossaryTerms.filter((term) => term.trackId === activeTrackId)
        : glossaryTerms,
    [activeTrackId],
  );

  const groupedTerms = useMemo(
    () =>
      filteredTerms.reduce<Record<string, typeof filteredTerms>>((accumulator, term) => {
        const letter = term.term[0].toUpperCase();
        accumulator[letter] ??= [];
        accumulator[letter].push(term);
        return accumulator;
      }, {}),
    [filteredTerms],
  );

  const groupedTermEntries = useMemo(
    () =>
      Object.entries(groupedTerms).sort(([left], [right]) =>
        left.localeCompare(right),
      ),
    [groupedTerms],
  );

  const availableLetters = useMemo(
    () => new Set(groupedTermEntries.map(([letter]) => letter)),
    [groupedTermEntries],
  );

  return (
    <div className="page-content stagger">
      <section className="page-hero card">
        <p className="eyebrow">Glossary</p>
        <h1>
          {activeTrack
            ? `${activeTrack.title} glossary`
            : 'Definitions across both study tracks'}
        </h1>
        <p className="lede">
          {activeTrack
            ? `${activeTrack.summary} This filtered glossary keeps the vocabulary for this route together without pulling in terms from the other track.`
            : 'Use the glossary as a shared reference across networking and cyber security, or narrow it to one track when you want a cleaner beginner study pass.'}
        </p>
        <TrackFilter pathname="/glossary" activeTrackId={activeTrackId} />
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
                <div className="section-heading">
                  <h2>{letter}</h2>
                </div>
              </div>

              <div className="term-grid">
                {terms.map((term) => (
                  <article key={term.id} id={term.id} className="card term-card">
                    <div className="term-card-head">
                      <h3>{term.term}</h3>
                      <div className="term-card-meta">
                        <span className="badge glossary-track-badge">
                          {term.trackTitle}
                        </span>
                        <Link to={term.topicHref} className="text-link term-source-link">
                          {term.topicTitle}
                        </Link>
                      </div>
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
