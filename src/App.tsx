import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Landing from './pages/Landing';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/" replace />} />
        <Route path="/about" element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
