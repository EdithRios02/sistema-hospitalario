import React, { useState } from 'react';
import api from '../api';

function Cola() {
  const [datos, setDatos] = useState([
    { id_paciente: '', codigo_sala: '', numero_cola: '' }
  ]);

  // Agrega un nuevo campo de turno
  const agregarTurno = () => {
    setDatos([...datos, { id_paciente: '', codigo_sala: '', numero_cola: '' }]);
  };

  // Manejar cambios en los inputs
  const handleChange = (index, e) => {
    const nuevosDatos = [...datos];
    nuevosDatos[index][e.target.name] = e.target.value;
    setDatos(nuevosDatos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/cola', datos);
      alert('Turnos creados correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al crear turnos');
    }
  };

  return (
    <div>
      <h2>Crear Turnos</h2>
      <form onSubmit={handleSubmit}>
        {datos.map((turno, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <input
              name="id_paciente"
              placeholder="ID Paciente"
              value={turno.id_paciente}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="codigo_sala"
              placeholder="Código Sala"
              value={turno.codigo_sala}
              onChange={(e) => handleChange(index, e)}
            />
            <input
              name="numero_cola"
              placeholder="Número de Cola"
              value={turno.numero_cola}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={agregarTurno}>➕ Agregar otro turno</button>
        <br /><br />
        <button type="submit">Guardar todos</button>
      </form>
    </div>
  );
}

export default Cola;
