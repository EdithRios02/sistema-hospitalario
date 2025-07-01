import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Cola from './components/cola';
import Reservas from './components/Reservas';
import Historial from './components/Historial';
import Recordatorios from './components/Recordatorios';
import AccionesMedicas from './components/AccionesMedicas';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
            <li><Link to="/">Cola</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/historial">Historial</Link></li>
            <li><Link to="/recordatorios">Recordatorios</Link></li>
            <li><Link to="/acciones">Acciones Médicas</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Cola />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/recordatorios" element={<Recordatorios />} />
          <Route path="/acciones" element={<AccionesMedicas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
