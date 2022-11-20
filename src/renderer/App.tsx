import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './reset.css';
import Main from './pages/Main';
import Auth from './pages/Auth';
import Topbar from './components/Topbar';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/:type" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}
