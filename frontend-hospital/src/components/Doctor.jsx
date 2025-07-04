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
  const [editando, setEditando] = useState(false);
  const [doctorEditando, setDoctorEditando] = useState(null);

  useEffect(() => {
    obtenerDoctores();
  }, []);

  const obtenerDoctores = async () => {
    try {
      const res = await api.get('/doctor');
      setDoctores(res.data);
    } catch (error) {
      console.error('Error al obtener doctores:', error);
      alert('Error al cargar doctores.');
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    // Validaciones en tiempo real:
    if (
      (name === 'nombre' || name === 'apellido' || name === 'especialidad') &&
      /[^a-zA-Z\s]/.test(value)
    ) return;

    if (name === 'telefono' && /[^0-9]/.test(value)) return;

    setFormulario({ ...formulario, [name]: value });
  };

  const validarFormulario = () => {
    const soloLetras = /^[a-zA-Z\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!soloLetras.test(formulario.nombre)) {
      alert('El nombre solo debe contener letras.');
      return false;
    }

    if (!soloLetras.test(formulario.apellido)) {
      alert('El apellido solo debe contener letras.');
      return false;
    }

    if (formulario.especialidad && !soloLetras.test(formulario.especialidad)) {
      alert('La especialidad solo debe contener letras.');
      return false;
    }

    if (formulario.telefono && !soloNumeros.test(formulario.telefono)) {
      alert('El teléfono solo debe contener números.');
      return false;
    }

    if (!emailValido.test(formulario.email)) {
      alert('El email no es válido.');
      return false;
    }

    return true;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.apellido || !formulario.email) {
      alert('Nombre, apellido y email son obligatorios');
      return;
    }

    if (!validarFormulario()) return;

    try {
      if (editando) {
        await api.put(`/doctor/${doctorEditando.id}`, formulario);
        setEditando(false);
        setDoctorEditando(null);
      } else {
        await api.post('/doctor', formulario);
      }

      limpiarFormulario();
      obtenerDoctores();
    } catch (error) {
      console.error('Error al guardar doctor:', error);
      alert('Error al guardar doctor.');
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: '',
      apellido: '',
      especialidad: '',
      telefono: '',
      email: '',
    });
  };

  const iniciarEdicion = (doctor) => {
    setEditando(true);
    setDoctorEditando(doctor);
    setFormulario({
      nombre: doctor.nombre,
      apellido: doctor.apellido,
      especialidad: doctor.especialidad || '',
      telefono: doctor.telefono || '',
      email: doctor.email,
    });
  };

  const eliminarDoctor = async (id) => {
    if (!window.confirm('¿Eliminar este doctor?')) return;
    try {
      await api.delete(`/doctor/${id}`);
      obtenerDoctores();
    } catch (error) {
      console.error('Error al eliminar doctor:', error);
      alert('Error al eliminar doctor.');
    }
  };

  return (
    <div>
      {/* Estilos mínimos para bordes de tabla */}
      <style>
        {`
          table, th, td {
            border: 1px solid #ddd;
            border-collapse: collapse;
            padding: 8px;
          }
        `}
      </style>

      <h2>{editando ? 'Editar Doctor' : 'Registrar Doctor'}</h2>

      <form onSubmit={manejarEnvio}>
        <input name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Nombre" />
        <input name="apellido" value={formulario.apellido} onChange={manejarCambio} placeholder="Apellido" />
        <input name="especialidad" value={formulario.especialidad} onChange={manejarCambio} placeholder="Especialidad" />
        <input name="telefono" value={formulario.telefono} onChange={manejarCambio} placeholder="Teléfono" />
        <input name="email" value={formulario.email} onChange={manejarCambio} placeholder="Email" />
        <button type="submit">{editando ? 'Actualizar' : 'Guardar'}</button>
        {editando && <button onClick={limpiarFormulario} type="button">Cancelar</button>}
      </form>

      <h3>Lista de Doctores</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {doctores.length === 0 ? (
            <tr>
              <td colSpan="7">No hay doctores registrados.</td>
            </tr>
          ) : (
            doctores.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.nombre}</td>
                <td>{doctor.apellido}</td>
                <td>{doctor.especialidad}</td>
                <td>{doctor.telefono}</td>
                <td>{doctor.email}</td>
                <td>
                  <button onClick={() => iniciarEdicion(doctor)}>Editar</button>
                  <button onClick={() => eliminarDoctor(doctor.id)}>Eliminar</button>
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
