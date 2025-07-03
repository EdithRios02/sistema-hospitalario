const pool = require('../base_datos/index.js');

// Obtener todos los doctores
exports.obtenerDoctores = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM doctor ORDER BY id');
    res.json(resultado.rows);
  } catch (error) {
    console.error('❌ Error al obtener doctores:', error);
    res.status(500).json({ error: error.message });
  }
};

// Crear un doctor
exports.crearDoctor = async (req, res) => {
  const { nombre, apellido, especialidad, telefono, email } = req.body;

  if (!nombre || !apellido || !email) {
    return res.status(400).json({ error: 'Nombre, apellido y email son obligatorios' });
  }

  try {
    const resultado = await pool.query(
      'INSERT INTO doctor (nombre, apellido, especialidad, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, especialidad, telefono, email]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear doctor:', error);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un doctor
exports.eliminarDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM doctor WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }
    res.json({ mensaje: 'Doctor eliminado correctamente', doctor: resultado.rows[0] });
  } catch (error) {
    console.error('❌ Error al eliminar doctor:', error);
    res.status(500).json({ error: error.message });
  }
};
