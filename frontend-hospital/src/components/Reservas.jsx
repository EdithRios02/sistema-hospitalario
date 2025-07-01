import React, { useState, useEffect } from 'react';
import api from '../api';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState({
    id_paciente: '',
    id_doctor: '',
    fecha_reserva: '',
    hora_reserva: '',
    sala: '',
  });
  const [error, setError] = useState(null);

  const obtenerReservas = async () => {
    try {
      const res = await api.get('/reservas');
      setReservas(res.data);
      setError(null);
    } catch (err) {
      console.error('❌ Error al obtener reservas:', err);
      setError('No se pudo cargar la lista de reservas.');
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reservas', formData);
      obtenerReservas(); // actualiza lista
      setFormData({
        id_paciente: '',
        id_doctor: '',
        fecha_reserva: '',
        hora_reserva: '',
        sala: '',
      });
      setError(null);
    } catch (err) {
      console.error('❌ Error al crear reserva:', err);
      setError('Error al crear la reserva. Verifica los datos.');
    }
  };

  return (
    <div>
      <h2>Reservas</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID Paciente"
          value={formData.id_paciente}
          onChange={(e) => setFormData({ ...formData, id_paciente: e.target.value })}
        />
        <input
          placeholder="ID Doctor"
          value={formData.id_doctor}
          onChange={(e) => setFormData({ ...formData, id_doctor: e.target.value })}
        />
        <input
        type="date"
          placeholder="Fecha"
          value={formData.fecha_reserva}
          onChange={(e) => setFormData({ ...formData, fecha_reserva: e.target.value })}
        />
        <input
        type="time"
          placeholder="Hora"
          value={formData.hora_reserva}
          onChange={(e) => setFormData({ ...formData, hora_reserva: e.target.value })}
        />
        <input
          placeholder="Sala"
          value={formData.sala}
          onChange={(e) => setFormData({ ...formData, sala: e.target.value })}
        />
        <button type="submit">Reservar</button>
      </form>

      <ul>
        {reservas.length === 0 ? (
          <li>No hay reservas registradas.</li>
        ) : (
          reservas.map((r) => (
            <li key={r.id}>
              {r.fecha_reserva} - {r.hora_reserva} - Sala {r.sala}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Reservas;