const express = require('express');
const router = express.Router();
const pacienteController = require('../controladores/pacienteControlador.js');

router.post('/', pacienteController.crearPacientes);
router.get('/', pacienteController.listarPacientes);
router.delete('/:id', pacienteController.eliminarPaciente)
router.put('/:id', pacienteController.editarPaciente);
router.patch('/:id',pacienteController.editarPaciente);

module.exports = router;