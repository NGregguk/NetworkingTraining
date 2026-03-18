import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import DashboardPage from './pages/DashboardPage';
import GlossaryPage from './pages/GlossaryPage';
import NotFoundPage from './pages/NotFoundPage';
import RevisionPage from './pages/RevisionPage';
import TopicPage from './pages/TopicPage';
import TopicsPage from './pages/TopicsPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:slug" element={<TopicPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

