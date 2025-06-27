const express = require('express');
const router = express.Router();
const historialControlador = require('../controladores/historialControlador');

router.post('/', historialControlador.crearHistorial);
router.get('/:id_paciente', historialControlador.listarHistorial);

module.exports = router;
