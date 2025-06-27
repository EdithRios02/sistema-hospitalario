// controladores/colaControlador.js
const pool = require('../base_datos/index.js');

exports.crearCola = async (req, res) => {
  const { id_paciente, codigo_sala, numero_cola } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO cola (id_paciente, codigo_sala, numero_cola) VALUES ($1, $2, $3) RETURNING *',
      [id_paciente, codigo_sala, numero_cola]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

