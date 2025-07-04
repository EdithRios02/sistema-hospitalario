import React, { useState, useEffect } from 'react';
import api from '../api';

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

  const [errores, setErrores] = useState('');
  const [modoEditar, setModoEditar] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    try {
      const res = await api.get('/pacientes');
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

  const soloLetras = (e) => {
    const tecla = e.key;
    if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]$/.test(tecla)) {
      e.preventDefault();
    }
  };

  const soloNumeros = (e) => {
    const tecla = e.key;
    if (!/^[0-9]$/.test(tecla)) {
      e.preventDefault();
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    const { nombre, apellido, fecha_nacimiento, genero, telefono } = formulario;

    if (!nombre.trim() || !apellido.trim() || !fecha_nacimiento) {
      setErrores('Los campos Nombre, Apellido y Fecha de nacimiento son obligatorios.');
      return;
    }

    setErrores('');

    try {
      if (modoEditar) {
        await api.put(`/pacientes/${idEditar}`, formulario);
        setModoEditar(false);
        setIdEditar(null);
      } else {
        await api.post('/pacientes', formulario);
      }

      obtenerPacientes();
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
      console.error('Error al guardar paciente:', error);
      setErrores('Error al guardar paciente.');
    }
  };

  const eliminarPaciente = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este paciente?')) return;
    try {
      await api.delete(`/pacientes/${id}`);
      obtenerPacientes();
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
    }
  };

  const cargarPacienteParaEditar = (paciente) => {
    setFormulario({
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      fecha_nacimiento: paciente.fecha_nacimiento,
      genero: paciente.genero || '',
      telefono: paciente.telefono || '',
      email: paciente.email || '',
      direccion: paciente.direccion || '',
    });
    setModoEditar(true);
    setIdEditar(paciente.id);
    setErrores('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{modoEditar ? 'Editar Paciente' : 'Registro de Pacientes'}</h2>

      {errores && <p style={{ color: 'red' }}>{errores}</p>}

      <form onSubmit={manejarEnvio} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          onKeyPress={soloLetras}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formulario.apellido}
          onChange={manejarCambio}
          onKeyPress={soloLetras}
          required
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={formulario.fecha_nacimiento}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={formulario.genero}
          onChange={manejarCambio}
          onKeyPress={soloLetras}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={manejarCambio}
          onKeyPress={soloNumeros}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formulario.email}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formulario.direccion}
          onChange={manejarCambio}
        />
        <button type="submit">{modoEditar ? 'Actualizar' : 'Registrar'}</button>
        {modoEditar && (
          <button
            type="button"
            onClick={() => {
              setModoEditar(false);
              setIdEditar(null);
              setFormulario({
                nombre: '',
                apellido: '',
                fecha_nacimiento: '',
                genero: '',
                telefono: '',
                email: '',
                direccion: '',
              });
              setErrores('');
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancelar
          </button>
        )}
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
            <th>Acciones</th>
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
              <td>
                <button onClick={() => cargarPacienteParaEditar(paciente)} style={{ marginRight: '5px' }}>
                  Editar
                </button>
                <button onClick={() => eliminarPaciente(paciente.id)} style={{ color: 'red' }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pacientes;
