import React, { useState, useEffect } from 'react';
import api from '../api';


const Doctor = () => {
  const [doctores, setDoctores] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    telefono: '',
    email: '',
  });

  useEffect(() => {
    obtenerDoctores();
  }, []);

  const obtenerDoctores = async () => {
    try {
      const res = await api.get('/doctor');
      setDoctores(res.data);
    } catch (error) {
      console.error('Error al obtener doctores:', error);
    }
  };

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await api.post('/doctor', formulario);
      obtenerDoctores();
      setFormulario({
        nombre: '',
        apellido: '',
        especialidad: '',
        telefono: '',
        email: '',
      });
    } catch (error) {
      console.error('Error al registrar doctor:', error);
    }
  };

  const eliminarDoctor = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este doctor?')) return;
    try {
      await api.delete(`/doctor/${id}`);
      obtenerDoctores();
    } catch (error) {
      console.error('Error al eliminar doctor:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registrar Doctor</h2>

      <form onSubmit={manejarEnvio} style={{ marginBottom: '30px' }}>
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formulario.apellido} onChange={manejarCambio} required />
        <input type="text" name="especialidad" placeholder="Especialidad" value={formulario.especialidad} onChange={manejarCambio} />
        <input type="text" name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={manejarCambio} />
        <input type="email" name="email" placeholder="Email" value={formulario.email} onChange={manejarCambio} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default Doctor;
