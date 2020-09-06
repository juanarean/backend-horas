// rutas para cargar y obtenere las horas

const express = require('express');
const pool = require('../database'); // conexion a la base de datos
const router = express.Router();

router.get('/add', (req, res) => {
    res.send('en construccion');
});

router.post('/add', async(req, res) => {
    res.send('Recibido');
});

module.exports = router;