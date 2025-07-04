const express = require('express');
const router = express.Router();
const reservaControlador = require('../controladores/reservaControlador.js');

router.post('/', reservaControlador.crearReserva);
router.get('/', reservaControlador.listarReservas);
router.delete('/:id',reservaControlador.eliminarReserva);

module.exports = router;
