const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const turnos = req.body;
  console.log('Turnos recibidos:', turnos);
  res.status(200).json({ mensaje: 'Turnos procesados correctamente' });
});

module.exports = router;
