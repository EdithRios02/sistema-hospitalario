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
      console.error('Error al obtener reservas:', err);
      setError('No se pudo cargar la lista de reservas.');
    }
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  // Validaciones en tiempo real
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar solo números en campos específicos
    if (['id_paciente', 'id_doctor', 'sala'].includes(name)) {
      if (!/^\d*$/.test(value)) return; // solo números permitidos
    }

    setFormData({ ...formData, [name]: value });
  };

  const validarFormulario = () => {
    const soloNumeros = /^[0-9]+$/;

    if (!soloNumeros.test(formData.id_paciente)) {
      setError('El ID del paciente debe contener solo números.');
      return false;
    }

    if (!soloNumeros.test(formData.id_doctor)) {
      setError('El ID del doctor debe contener solo números.');
      return false;
    }

    if (formData.sala && !soloNumeros.test(formData.sala)) {
      setError('La sala debe contener solo números.');
      return false;
    }

    if (!formData.fecha_reserva || !formData.hora_reserva) {
      setError('La fecha y la hora son obligatorias.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      await api.post('/reservas', formData);
      obtenerReservas();
      setFormData({
        id_paciente: '',
        id_doctor: '',
        fecha_reserva: '',
        hora_reserva: '',
        sala: '',
      });
      setError(null);
    } catch (err) {
      console.error('Error al crear reserva:', err);
      setError('Error al crear la reserva. Verifica los datos.');
    }
  };

  const eliminarReserva = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta reserva?')) return;
    try {
      await api.delete(`/reservas/${id}`);
      obtenerReservas();
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
      setError('Error al eliminar la reserva.');
    }
  };

  return (
    <div>
      <h2>Reservas</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="id_paciente"
          placeholder="ID Paciente"
          value={formData.id_paciente}
          onChange={handleChange}
        />
        <input
          name="id_doctor"
          placeholder="ID Doctor"
          value={formData.id_doctor}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha_reserva"
          placeholder="Fecha"
          value={formData.fecha_reserva}
          onChange={handleChange}
        />
        <input
          type="time"
          name="hora_reserva"
          placeholder="Hora"
          value={formData.hora_reserva}
          onChange={handleChange}
        />
        <input
          name="sala"
          placeholder="Sala"
          value={formData.sala}
          onChange={handleChange}
        />
        <button type="submit">Reservar</button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Paciente</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Doctor</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hora</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Sala</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                No hay reservas registradas.
              </td>
            </tr>
          ) : (
            reservas.map((r) => (
              <tr key={r.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{r.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{r.id_paciente}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{r.id_doctor}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{r.fecha_reserva}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{r.hora_reserva}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{r.sala}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => eliminarReserva(r.id)} style={{ color: 'red' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Reservas;
