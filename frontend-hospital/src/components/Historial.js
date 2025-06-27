import React, { useState } from 'react';
import api from '../api';

function Historial() {
  const [idPaciente, setIdPaciente] = useState('');
  const [historial, setHistorial] = useState([]);

  const obtenerHistorial = async () => {
    const res = await api.get(`/historial/${idPaciente}`);
    setHistorial(res.data);
  };

  return (
    <div>
      <h2>Historial Médico</h2>
      <input placeholder="ID Paciente" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} />
      <button onClick={obtenerHistorial}>Consultar</button>
      <ul>
        {historial.map((h) => (
          <li key={h.id}>{h.fecha}: {h.diagnostico}</li>
        ))}
      </ul>
    </div>
  );
}

export default Historial;
