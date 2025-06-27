const pool = require('../base_datos');

exports.crearRecordatorio = async (req, res) => {
  const { id_paciente, mensaje, fecha_envio, metodo } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO recordatorio (id_paciente, mensaje, fecha_envio, metodo) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_paciente, mensaje, fecha_envio, metodo]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarRecordatorios = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM recordatorio ORDER BY fecha_envio DESC');
    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
