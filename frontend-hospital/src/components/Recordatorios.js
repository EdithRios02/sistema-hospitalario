import React, { useState, useEffect } from 'react';
import api from '../api';

function Recordatorios() {
  const [formData, setFormData] = useState({ id_paciente: '', mensaje: '', metodo: '' });
  const [lista, setLista] = useState([]);

  const cargar = async () => {
    const res = await api.get('/recordatorios');
    setLista(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/recordatorios', formData);
    cargar();
  };

  return (
    <div>
      <h2>Recordatorios</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID Paciente" value={formData.id_paciente} onChange={(e) => setFormData({ ...formData, id_paciente: e.target.value })} />
        <input placeholder="Mensaje" value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })} />
        <input placeholder="Método" value={formData.metodo} onChange={(e) => setFormData({ ...formData, metodo: e.target.value })} />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {lista.map((r) => (
          <li key={r.id}>{r.fecha_envio}: {r.mensaje} ({r.metodo})</li>
        ))}
      </ul>
    </div>
  );
}

export default Recordatorios;
