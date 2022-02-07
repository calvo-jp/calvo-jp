import * as React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Layout from './layouts/Layout';
import Project from './pages/project';

const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Background = React.lazy(() => import('./layouts/Background'));

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={<React.Fragment />}>
        <Background />
      </React.Suspense>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/projects/:slug" element={<Project />} />
      </Routes>
    </Router>
  );
};

export default App;
