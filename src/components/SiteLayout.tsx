import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { glossaryTerms, topics } from '../content';

type Theme = 'light' | 'dark';

const storageKey = 'network-atlas-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(storageKey);

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
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

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
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(storageKey, theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#07151c' : '#f8f2e8');
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      setIsHeaderCompact(window.scrollY > 72);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
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
            Network Atlas
          </NavLink>
          <p className="brand-note">
            Networking study notes for revision and reference.
          </p>
        </div>
        <nav className="nav-links" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
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
