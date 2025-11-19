
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={<h2>Welcome to Octofit Tracker!</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
