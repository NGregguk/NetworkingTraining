import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchSite, trackGroups, type SearchResult } from '../content';

type SearchItemKind = SearchResult['kind'] | 'page';

type SearchItem = {
  href: string;
  id: string;
  kind: SearchItemKind;
  preview: string;
  subtitle: string;
  title: string;
};

type SiteSearchProps = {
  onOpen?: () => void;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  return Boolean(
    target.closest('input, textarea, select, [contenteditable="true"]'),
  );
}

function getResultKindLabel(kind: SearchItemKind) {
  if (kind === 'topic') {
    return 'Topic';
  }

  if (kind === 'section') {
    return 'Section';
  }

  if (kind === 'glossary') {
    return 'Glossary';
  }

  return 'Page';
}

export default function SiteSearch({ onOpen }: SiteSearchProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dialogTitleId = useId();
  const searchFieldId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const quickResults = useMemo<SearchItem[]>(
    () => [
      {
        id: 'quick-topics-page',
        kind: 'page',
        title: 'Browse all topics',
        subtitle: 'Page',
        preview: 'Open both study tracks and move through each module in order.',
        href: '/topics',
      },
      ...trackGroups.map((group) => ({
        id: `quick-track-${group.track.id}`,
        kind: 'page' as const,
        title: `${group.track.title} track`,
        subtitle: 'Track page',
        preview: group.track.summary,
        href: `/topics?track=${group.track.id}`,
      })),
      {
        id: 'quick-glossary-page',
        kind: 'page',
        title: 'Open glossary',
        subtitle: 'Page',
        preview: 'Review compact definitions across networking and cyber security.',
        href: '/glossary',
      },
      {
        id: 'quick-revision-page',
        kind: 'page',
        title: 'Open revision pack',
        subtitle: 'Page',
        preview: 'Jump into condensed recall notes and self-check questions.',
        href: '/revision',
      },
      ...trackGroups.flatMap((group) =>
        group.topics.slice(0, 2).map((topic) => ({
          id: `quick-topic-${topic.slug}`,
          kind: 'topic' as const,
          title: topic.title,
          subtitle: `${topic.track.title} / ${topic.module.title} topic`,
          preview: topic.summary,
          href: `/topics/${topic.slug}`,
        })),
      ),
    ],
    [],
  );

  const results = useMemo<SearchItem[]>(() => {
    if (!deferredQuery.trim()) {
      return quickResults;
    }

    return searchSite(deferredQuery, 10).map((result) => ({
      id: result.id,
      kind: result.kind,
      title: result.title,
      subtitle: result.subtitle,
      preview: result.preview,
      href: result.href,
    }));
  }, [deferredQuery, quickResults]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery, isOpen]);

  useEffect(() => {
    if (!isOpen || !results.length) {
      return;
    }

    resultRefs.current[activeIndex]?.scrollIntoView({
      block: 'nearest',
    });
  }, [activeIndex, isOpen, results]);

  useEffect(() => {
    if (!isOpen && !query) {
      return;
    }

    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSearchShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k';

      if (isSearchShortcut) {
        event.preventDefault();
        onOpen?.();
        setIsOpen(true);
        return;
      }

      if (
        event.key === '/' &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !isEditableTarget(event.target)
      ) {
        event.preventDefault();
        onOpen?.();
        setIsOpen(true);
        return;
      }

      if (event.key === 'Escape' && isOpen) {
        event.preventDefault();
        setIsOpen(false);
        setQuery('');
        setActiveIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onOpen]);

  const isShowingSuggestions = !deferredQuery.trim();

  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  };

  const openSearch = () => {
    onOpen?.();
    setIsOpen(true);
  };

  const openResult = (result: SearchItem) => {
    closeSearch();
    navigate(result.href);
  };

  return (
    <>
      <button
        type="button"
        className={isOpen ? 'search-trigger search-trigger-active' : 'search-trigger'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Open global search"
        title="Search (Ctrl+K or /)"
        onClick={openSearch}
      >
        <span className="search-trigger-label">Search</span>
        <span className="search-trigger-shortcut" aria-hidden="true">
          Ctrl K
        </span>
      </button>

      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div className="search-layer" role="presentation" onClick={closeSearch}>
              <div
                className="search-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogTitleId}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="search-dialog-header">
                  <div>
                    <p className="eyebrow">Global Search</p>
                    <h2 id={dialogTitleId}>
                      Find topics, sections, and glossary terms across both tracks
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="search-close"
                    onClick={closeSearch}
                    aria-label="Close search"
                  >
                    Esc
                  </button>
                </div>

                <label className="search-field" htmlFor={searchFieldId}>
                  <span className="search-field-icon" aria-hidden="true">
                    /
                  </span>
                  <input
                    id={searchFieldId}
                    ref={inputRef}
                    className="search-input"
                    type="text"
                    value={query}
                    placeholder="Search IPv4, DNS, wireless security, glossary terms..."
                    spellCheck={false}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (!results.length) {
                        if (event.key === 'Escape') {
                          event.preventDefault();
                          closeSearch();
                        }

                        return;
                      }

                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setActiveIndex((current) => (current + 1) % results.length);
                        return;
                      }

                      if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        setActiveIndex((current) =>
                          current === 0 ? results.length - 1 : current - 1,
                        );
                        return;
                      }

                      if (event.key === 'Enter') {
                        event.preventDefault();
                        openResult(results[activeIndex]);
                        return;
                      }

                      if (event.key === 'Escape') {
                        event.preventDefault();
                        closeSearch();
                      }
                    }}
                  />
                </label>

                <div className="search-results-panel">
                  <div className="search-results-head">
                    <p className="search-results-label">
                      {isShowingSuggestions
                        ? 'Quick links'
                        : `${results.length} ${results.length === 1 ? 'match' : 'matches'}`}
                    </p>
                    <p className="search-results-note">
                      {isShowingSuggestions
                        ? 'Use / or Ctrl+K to open search from anywhere.'
                        : 'Arrow keys move through results.'}
                    </p>
                  </div>

                  {results.length ? (
                    <div
                      className="search-results"
                      role="listbox"
                      aria-label="Search results"
                    >
                      {results.map((result, index) => {
                        const kindLabel = getResultKindLabel(result.kind);
                        const isActive = index === activeIndex;

                        return (
                          <button
                            key={result.id}
                            ref={(node) => {
                              resultRefs.current[index] = node;
                            }}
                            type="button"
                            role="option"
                            aria-selected={isActive}
                            className={
                              isActive
                                ? 'search-result search-result-active'
                                : 'search-result'
                            }
                            onMouseMove={() => setActiveIndex(index)}
                            onFocus={() => setActiveIndex(index)}
                            onClick={() => openResult(result)}
                          >
                            <div className="search-result-head">
                              <div className="search-result-copy">
                                <span className="search-result-title">
                                  {result.title}
                                </span>
                                <span className="search-result-subtitle">
                                  {result.subtitle}
                                </span>
                              </div>
                              <span
                                className={`search-result-kind search-result-kind-${result.kind}`}
                              >
                                {kindLabel}
                              </span>
                            </div>
                            <p className="search-result-preview">{result.preview}</p>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="search-empty">
                      <p className="search-empty-title">No matching results</p>
                      <p className="search-empty-copy">
                        Try a topic name, protocol, glossary term, or a phrase such
                        as subnet mask, DHCP lease, ACL rule, or wireless security.
                      </p>
                    </div>
                  )}
                </div>

                <div className="search-footer">
                  <div className="search-shortcuts">
                    <span className="search-shortcut-chip">Enter to open</span>
                    <span className="search-shortcut-chip">Esc to close</span>
                    <span className="search-shortcut-chip">/ to reopen later</span>
                  </div>
                  <p className="search-footer-copy">
                    Search covers topic pages, section headings, and glossary
                    entries across networking and cyber security.
                  </p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
