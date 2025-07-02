const pool = require('../base_datos/index.js');

// Crear nuevo paciente
exports.crearPacientes = async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    genero,
    telefono,
    email,
    direccion
  } = req.body;

  // Validación básica
  if (!nombre || !apellido || !fecha_nacimiento) {
    return res.status(400).json({
      error: 'Nombre, apellido y fecha de nacimiento son obligatorios.'
    });
  }

  try {
    const resultado = await pool.query(
      `INSERT INTO paciente 
        (nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion)
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
      [nombre, apellido, fecha_nacimiento, genero, telefono, email, direccion]
    );

    res.status(201).json({
      mensaje: 'Paciente registrado correctamente.',
      paciente: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al crear paciente:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Listar todos los pacientes
exports.listarPacientes = async (req, res) => {
  try {
    const resultado = await pool.query(
      'SELECT * FROM paciente ORDER BY creado_en DESC'
    );

    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Error al obtener pacientes:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
