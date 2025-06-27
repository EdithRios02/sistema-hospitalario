import React, { useState } from 'react';
import api from '../api';

function AccionesMedicas() {
  const [idPaciente, setIdPaciente] = useState('');
  const [acciones, setAcciones] = useState([]);

  const buscar = async () => {
    const res = await api.get(`/acciones/${idPaciente}`);
    setAcciones(res.data);
  };

  return (
    <div>
      <h2>Acciones Médicas</h2>
      <input placeholder="ID Paciente" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} />
      <button onClick={buscar}>Buscar</button>
      <ul>
        {acciones.map((a) => (
          <li key={a.id}>{a.fecha_accion}: {a.tipo_accion} - {a.descripcion}</li>
        ))}
      </ul>
    </div>
  );
}

export default AccionesMedicas;
