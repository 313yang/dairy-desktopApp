import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './reset.css';
import Main from './pages/Main';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}
