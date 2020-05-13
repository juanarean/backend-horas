// rutas para cargar y obtenere las horas

const express = require('express');
const pool = require('../database'); // conexion a la base de datos
const router = express.Router();

router.get('/add', (req, res) => {
    res.send('en construccion');
});

router.post('/add', async(req, res) => {
    //console.log(req.body);
    // const { bas, cliente, lugar, latitud, longitud, descrip } = req.body;
    // const entradaNueva = {
    //     bas,
    //     cliente,
    //     lugar,
    //     latitud,
    //     longitud,
    //     descrip
    // };
    //await pool.query('INSERT INTO horas set?', [entradaNueva]);
    res.send('Recibido');
});

module.exports = router;