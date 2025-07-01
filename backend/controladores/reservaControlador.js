const pool = require('../base_datos/index.js');

exports.crearReserva = async (req, res) => {
  const { id_paciente, id_doctor, fecha_reserva, hora_reserva, sala } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO reserva (id_paciente, id_doctor, fecha_reserva, hora_reserva, sala) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_paciente, id_doctor, fecha_reserva, hora_reserva, sala]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarReservas = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM reserva ORDER BY fecha_reserva, hora_reserva');
    res.status(200).json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

