const express = require('express');
const router = express.Router();
const doctorControlador = require('../controladores/doctorControlador');

// Ruta para obtener todos los doctores
router.get('/', doctorControlador.obtenerDoctores);

// Ruta para crear un doctor
router.post('/', doctorControlador.crearDoctor);

// Ruta para eliminar un doctor
router.delete('/:id', doctorControlador.eliminarDoctor);

module.exports = router;
