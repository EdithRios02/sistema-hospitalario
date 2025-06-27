const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const puerto = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas API
app.use('/api/cola', require('./rutas/colaRutas'));
app.use('/api/reservas', require('./rutas/reservaRutas'));
app.use('/api/historial', require('./rutas/historialRutas'));
app.use('/api/recordatorios', require('./rutas/recordatorioRutas'));
app.use('/api/acciones', require('./rutas/accionMedicaRutas'));

// Servidor activo
app.listen(puerto, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${puerto}`);
});
