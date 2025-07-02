
const express = require('express');
const router = express.Router();
const doctorControlador = require('../controladores/doctorControlador');

// Ruta para crear un doctor
router.post('/', doctorControlador.crearDoctor);

module.exports = router;

