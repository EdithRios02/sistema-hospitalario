import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Cola from './components/cola';
import Reservas from './components/Reservas';
import Pacientes from './components/Pacientes';
import Doctor from './components/Doctor';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="navbar-menu">
            <li><Link to="/">Cola</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/pacientes">Paciente</Link></li>
            <li><Link to="/doctor">Doctor</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Cola />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
