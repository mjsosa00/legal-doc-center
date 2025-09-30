
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import Public from './Public';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/public/:key" element={<Public />} />
      </Routes>
    </Router>
  );
}

export default App;
