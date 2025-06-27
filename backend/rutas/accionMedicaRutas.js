const express = require('express');
const router = express.Router();
const accionControlador = require('../controladores/accionMedicaControlador');

router.post('/', accionControlador.registrarAccion);
router.get('/:id_paciente', accionControlador.obtenerAccionesPorPaciente);

module.exports = router;
