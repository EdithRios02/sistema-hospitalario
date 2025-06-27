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
        <nav>
          <Link to="/">Cola</Link> | 
          <Link to="/reservas">Reservas</Link> | 
          <Link to="/historial">Historial</Link> | 
          <Link to="/recordatorios">Recordatorios</Link> | 
          <Link to="/acciones">Acciones Médicas</Link>
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
