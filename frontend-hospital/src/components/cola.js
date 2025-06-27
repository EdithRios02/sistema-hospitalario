import React, { useState } from 'react';
import api from '../api';

function Cola() {
  const [formData, setFormData] = useState({
    id_paciente: '',
    codigo_sala: '',
    numero_cola: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/cola', formData);
      alert('Turno creado: ' + res.data.id);
    } catch (err) {
      alert('Error al crear turno');
    }
  };

  return (
    <div>
      <h2>Crear Turno</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ID Paciente"
          value={formData.id_paciente}
          onChange={(e) => setFormData({ ...formData, id_paciente: e.target.value })}
        />
        <input
          placeholder="Código Sala"
          value={formData.codigo_sala}
          onChange={(e) => setFormData({ ...formData, codigo_sala: e.target.value })}
        />
        <input
          placeholder="Número de Cola"
          value={formData.numero_cola}
          onChange={(e) => setFormData({ ...formData, numero_cola: e.target.value })}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default Cola;
