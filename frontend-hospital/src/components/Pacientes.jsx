import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    genero: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  // Obtener pacientes al cargar el componente
  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/pacientes');
      setPacientes(res.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
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
      await axios.post('http://localhost:3000/pacientes', formulario);
      obtenerPacientes(); // Actualiza la lista
      setFormulario({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        genero: '',
        telefono: '',
        email: '',
        direccion: '',
      });
    } catch (error) {
      console.error('Error al crear paciente:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Registro de Pacientes</h2>

      <form onSubmit={manejarEnvio} style={{ marginBottom: '30px' }}>
        <input type="text" name="nombre" placeholder="Nombre" value={formulario.nombre} onChange={manejarCambio} required />
        <input type="text" name="apellido" placeholder="Apellido" value={formulario.apellido} onChange={manejarCambio} required />
        <input type="date" name="fecha_nacimiento" value={formulario.fecha_nacimiento} onChange={manejarCambio} required />
        <input type="text" name="genero" placeholder="Género" value={formulario.genero} onChange={manejarCambio} />
        <input type="text" name="telefono" placeholder="Teléfono" value={formulario.telefono} onChange={manejarCambio} />
        <input type="email" name="email" placeholder="Email" value={formulario.email} onChange={manejarCambio} />
        <input type="text" name="direccion" placeholder="Dirección" value={formulario.direccion} onChange={manejarCambio} />
        <button type="submit">Registrar</button>
      </form>

      <h3>Lista de Pacientes</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Fecha de Nacimiento</th>
            <th>Género</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nombre} {paciente.apellido}</td>
              <td>{paciente.fecha_nacimiento}</td>
              <td>{paciente.genero}</td>
              <td>{paciente.telefono}</td>
              <td>{paciente.email}</td>
              <td>{paciente.direccion}</td>
              <td>{new Date(paciente.creado_en).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pacientes;
