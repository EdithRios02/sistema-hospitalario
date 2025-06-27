const pool = require('../base_datos');

exports.registrarAccion = async (req, res) => {
  const { id_paciente, id_doctor, tipo_accion, descripcion, fecha_accion } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO accion_medica (id_paciente, id_doctor, tipo_accion, descripcion, fecha_accion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_paciente, id_doctor, tipo_accion, descripcion, fecha_accion]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerAccionesPorPaciente = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const resultado = await pool.query(
      'SELECT * FROM accion_medica WHERE id_paciente = $1 ORDER BY fecha_accion DESC',
      [id_paciente]
    );
    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
