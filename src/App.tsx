import * as React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Loader from './layouts/Loader';

const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Projects = React.lazy(() => import('./pages/Projects'));

const App = () => {
  return (
    <Router>
      <Layout>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </Layout>
    </Router>
  );
};

export default App;
