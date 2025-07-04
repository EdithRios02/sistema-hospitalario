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

exports.eliminarPaciente = async(req, res) =>{
  const { id } = req.params

  const {rowCount} = await pool.query('DELETE FROM paciente WHERE id = $1 RETURNING *',[id])
  return res.status(200).json({rowCount})
  console.log(rowCount)
  
}

exports.editarPaciente = async(req, res) => {
    const { id } = req.params;
    const { nombre, apellido, genero, telefono, email } = req.body; // Ajusta estos campos según tu estructura
    
    const { rowCount } = await pool.query(
        'UPDATE paciente SET nombre = $1, apellido = $2, genero = $3, telefono = $4, email = $5 WHERE id = $6 RETURNING *',
        [nombre, apellido, genero, telefono, email, id]
    );
    
    return res.status(200).json({rowCount});
    console.log(rowCount);
};

exports.editarPaciente = async(req, res) => {
    const { id } = req.params;
    const { nombre, apellido, genero, telefono, email } = req.body;
    
    try {
        const { rowCount } = await pool.query(
            'UPDATE paciente SET nombre = $1, apellido = $2, genero = $3, telefono = $4, email = $5 WHERE id = $6 RETURNING *',
            [nombre, apellido, genero, telefono, email, id]
        );
        
        console.log(rowCount);
        return res.status(200).json({rowCount});
    } catch (error) {
        console.error('Error al editar paciente:', error);
        return res.status(500).json({ error: 'Error al editar paciente' });
    }
};