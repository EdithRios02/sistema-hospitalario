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
      alert('Error al cargar doctores. Verifica el servidor.');
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
    if (!formulario.nombre || !formulario.apellido || !formulario.email) {
      alert('Nombre, apellido y email son obligatorios');
      return;
    }

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
      alert('Error al registrar doctor. Revisa la consola.');
    }
  };

  const eliminarDoctor = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este doctor?')) return;
    try {
      await api.delete(`/doctor/${id}`);
      obtenerDoctores();
    } catch (error) {
      console.error('Error al eliminar doctor:', error);
      alert('Error al eliminar doctor.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registrar Doctor</h2>

      <form onSubmit={manejarEnvio} style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre" 
          value={formulario.nombre} 
          onChange={manejarCambio} 
          required 
        />
        <input 
          type="text" 
          name="apellido" 
          placeholder="Apellido" 
          value={formulario.apellido} 
          onChange={manejarCambio} 
          required 
        />
        <input 
          type="text" 
          name="especialidad" 
          placeholder="Especialidad" 
          value={formulario.especialidad} 
          onChange={manejarCambio} 
        />
        <input 
          type="text" 
          name="telefono" 
          placeholder="Teléfono" 
          value={formulario.telefono} 
          onChange={manejarCambio} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formulario.email} 
          onChange={manejarCambio} 
          required 
        />
        <button type="submit">Guardar</button>
      </form>

      <h3>Lista de Doctores</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Apellido</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Especialidad</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Teléfono</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctores.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                No hay doctores registrados.
              </td>
            </tr>
          ) : (
            doctores.map((doctor) => (
              <tr key={doctor.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.nombre}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.apellido}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.especialidad}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.telefono}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{doctor.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button 
                    onClick={() => eliminarDoctor(doctor.id)}
                    style={{ 
                      backgroundColor: '#ff4444', 
                      color: 'white', 
                      border: 'none', 
                      padding: '5px 10px', 
                      cursor: 'pointer' 
                    }}
                  >
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
};

export default Doctor;
