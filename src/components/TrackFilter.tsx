import { Link } from 'react-router-dom';
import { tracks } from '../content';
import type { StudyTrackId } from '../content/schema';

type TrackFilterProps = {
  activeTrackId?: StudyTrackId;
  allLabel?: string;
  pathname: string;
};

export default function TrackFilter({
  activeTrackId,
  allLabel = 'All tracks',
  pathname,
}: TrackFilterProps) {
  return (
    <nav className="track-filter" aria-label="Track filter">
      <Link
        to={pathname}
        className={
          activeTrackId
            ? 'track-filter-link'
            : 'track-filter-link track-filter-link-active'
        }
        aria-current={activeTrackId ? undefined : 'page'}
      >
        {allLabel}
      </Link>

      {tracks.map((track) => (
        <Link
          key={track.id}
          to={`${pathname}?track=${track.id}`}
          className={
            activeTrackId === track.id
              ? 'track-filter-link track-filter-link-active'
              : 'track-filter-link'
          }
          aria-current={activeTrackId === track.id ? 'page' : undefined}
        >
          {track.title}
        </Link>
      ))}
    </nav>
  );
}
