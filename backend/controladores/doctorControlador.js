
const pool = require('../base_datos/index.js');

exports.crearDoctor = async (req, res) => {
  const { nombre, apellido, especialidad, telefono, email } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO doctor (nombre, apellido, especialidad, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, apellido, especialidad, telefono, email]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
