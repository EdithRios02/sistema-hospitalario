const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/cola', require('./rutas/colaRutas'));
app.use('/api/reservas', require('./rutas/reservaRutas'));
app.use('/api/pacientes', require('./rutas/pacienteRutas')); 
app.use('/api/doctor', require('./rutas/doctorRoutes'));

// Ruta de prueba del servidor
app.get('/', (req, res) => {
  res.send('🚀 Servidor backend activo');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
