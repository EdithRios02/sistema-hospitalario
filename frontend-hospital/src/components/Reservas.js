import React, { useState, useEffect } from 'react';
import api from '../api';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState({
    id_paciente: '', id_doctor: '', fecha_reserva: '', hora_reserva: '', sala: ''
  });

  const obtenerReservas = async () => {
    const res = await api.get('/reservas');
    setReservas(res.data);
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/reservas', formData);
    obtenerReservas();
  };

  return (
    <div>
      <h2>Reservas</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID Paciente" value={formData.id_paciente} onChange={(e) => setFormData({ ...formData, id_paciente: e.target.value })} />
        <input placeholder="ID Doctor" value={formData.id_doctor} onChange={(e) => setFormData({ ...formData, id_doctor: e.target.value })} />
        <input placeholder="Fecha" value={formData.fecha_reserva} onChange={(e) => setFormData({ ...formData, fecha_reserva: e.target.value })} />
        <input placeholder="Hora" value={formData.hora_reserva} onChange={(e) => setFormData({ ...formData, hora_reserva: e.target.value })} />
        <input placeholder="Sala" value={formData.sala} onChange={(e) => setFormData({ ...formData, sala: e.target.value })} />
        <button type="submit">Reservar</button>
      </form>
      <ul>
        {reservas.map((r) => (
          <li key={r.id}>{r.fecha_reserva} - {r.hora_reserva} - Sala {r.sala}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reservas;
