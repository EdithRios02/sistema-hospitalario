const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Define un puerto claro y consistente
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/cola', require('./rutas/colaRutas'));
app.use('/api/reservas', require('./rutas/reservaRutas'));
app.use('/api/historial', require('./rutas/historialRutas'));
app.use('/api/recordatorios', require('./rutas/recordatorioRutas'));
app.use('/api/acciones', require('./rutas/accionMedicaRutas'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta base opcional para ver si el servidor está vivo
app.get('/', (req, res) => {
  res.send('🚀 Servidor backend activo');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('✅ Servidor corriendo en: http://localhost:3000');
});
