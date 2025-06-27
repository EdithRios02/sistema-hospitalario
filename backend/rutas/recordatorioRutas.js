const express = require('express');
const router = express.Router();
const recordatorioControlador = require('../controladores/recordatorioControlador');

router.post('/', recordatorioControlador.crearRecordatorio);
router.get('/', recordatorioControlador.listarRecordatorios);

module.exports = router;
