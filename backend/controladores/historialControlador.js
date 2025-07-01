const pool = require('../base_datos/index.js');

exports.crearHistorial = async (req, res) => {
  const { id_paciente, diagnostico, tratamiento, observaciones } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO historial (id_paciente, diagnostico, tratamiento, observaciones) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_paciente, diagnostico, tratamiento, observaciones]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarHistorial = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const resultado = await pool.query(
      'SELECT * FROM historial WHERE id_paciente = $1 ORDER BY fecha DESC, hora DESC',
      [id_paciente]
    );
    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
