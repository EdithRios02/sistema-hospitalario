const express = require('express');
const router = express.Router();
const pacienteController = require('../controladores/pacienteControlador');

router.post('/pacientes', recordatorioControlador.crearPaciente);
router.get('/pacientes', recordatorioControlador.listarPacientes);

module.exports = router;