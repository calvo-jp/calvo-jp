import * as React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import spinner from './assets/spinner.svg';

const NotFound = React.lazy(() => import('./pages/NotFound'));
const Landing = React.lazy(() => import('./pages/Landing'));

const App = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/about" replace />} />
          <Route path="about" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <img src={spinner} alt="" />
    </div>
  );
};

export default App;
