import { useEffect, useId, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { glossaryTerms, topics } from '../content';
import SiteSearch from './SiteSearch';

type Theme = 'light' | 'dark';

const storageKey = 'network-field-guide-theme';
const legacyStorageKey = 'network-atlas-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme =
    window.localStorage.getItem(storageKey) ??
    window.localStorage.getItem(legacyStorageKey);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

const navigationItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Topics', to: '/topics' },
  { label: 'Glossary', to: '/glossary' },
  { label: 'Revision', to: '/revision' },
];

export default function SiteLayout() {
  const compactScrollThreshold = 88;
  const expandScrollThreshold = 40;
  const location = useLocation();
  const mobileNavigationId = useId();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const timer = window.setTimeout(() => {
      const target = document.getElementById(location.hash.replace('#', ''));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setIsMobileNavigationOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(storageKey, theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#1e1e1e' : '#f0f0f0');
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setIsHeaderCompact((current) => {
        const nextCompactState = current
          ? window.scrollY > expandScrollThreshold
          : window.scrollY > compactScrollThreshold;

        return current === nextCompactState ? current : nextCompactState;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [compactScrollThreshold, expandScrollThreshold]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(min-width: 681px)');
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMobileNavigationOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleViewportChange);

    return () => mediaQuery.removeEventListener('change', handleViewportChange);
  }, []);

  return (
    <div className="site-shell">
      <header
        className={
          isHeaderCompact ? 'site-header site-header-compact' : 'site-header'
        }
      >
        <div className="brand-block">
          <NavLink to="/" className="brand-mark">
            Network Field Guide
          </NavLink>
          <p className="brand-note">
            Networking study notes for revision and reference.
          </p>
        </div>
        <nav
          id={mobileNavigationId}
          className={
            isMobileNavigationOpen ? 'nav-links nav-links-open' : 'nav-links'
          }
          aria-label="Primary navigation"
        >
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileNavigationOpen(false)}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <SiteSearch onOpen={() => setIsMobileNavigationOpen(false)} />
          <button
            type="button"
            className={
              isMobileNavigationOpen
                ? 'mobile-nav-toggle mobile-nav-toggle-active'
                : 'mobile-nav-toggle'
            }
            aria-expanded={isMobileNavigationOpen}
            aria-controls={mobileNavigationId}
            aria-label={
              isMobileNavigationOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            onClick={() =>
              setIsMobileNavigationOpen((current) => !current)
            }
          >
            <span className="mobile-nav-toggle-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={() =>
              setTheme((current) => (current === 'light' ? 'dark' : 'light'))
            }
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <span className="sr-only">
              {theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
            </span>
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-thumb" />
            </span>
          </button>
        </div>
      </header>

      <main className="page-shell">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div>
          <p className="footer-title">At A Glance</p>
          <p className="footer-copy">
            {topics.length} topic pages and {glossaryTerms.length} glossary
            terms available for study and revision.
          </p>
        </div>
        <div>
          <p className="footer-title">Revision Habit</p>
          <p className="footer-copy">
            Read the full lesson first, review key terms in the glossary, then
            use revision questions to test recall.
          </p>
        </div>
      </footer>
    </div>
  );
}
