const express = require('express');
const router = express.Router();
const reservaControlador = require('../controladores/reservaControlador');

router.post('/', reservaControlador.crearReserva);
router.get('/', reservaControlador.listarReservas);

module.exports = router;
