const express = require('express');
const router = express.Router();
const colaControlador = require('../controladores/colaControlador');

router.post('/', colaControlador.crearCola);
// Puedes agregar más rutas: listar, eliminar, actualizar estado, etc.

module.exports = router;
