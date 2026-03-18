import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-content">
      <section className="page-hero card">
        <p className="eyebrow">Page Not Found</p>
        <h1>The requested study page does not exist yet.</h1>
        <p className="lede">
          Return to the dashboard or topic index to continue studying the material
          that has already been added.
        </p>
        <div className="cta-row">
          <Link to="/" className="button-primary">
            Go to dashboard
          </Link>
          <Link to="/topics" className="button-secondary">
            Open topic index
          </Link>
        </div>
      </section>
    </div>
  );
}
