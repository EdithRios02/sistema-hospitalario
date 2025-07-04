const express = require('express');
const router = express.Router();
const doctorControlador = require('../controladores/doctorControlador');

router.get('/', doctorControlador.obtenerDoctores);
router.post('/', doctorControlador.crearDoctor);
router.delete('/:id', doctorControlador.eliminarDoctor);
router.put('/:id',doctorControlador.editarDoctor)
router.patch('/:id', doctorControlador.editarDoctor)

module.exports = router;
