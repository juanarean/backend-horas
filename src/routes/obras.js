const express = require('express');
const pool = require('../database'); // conexion a la base de datos
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('obras/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    //console.log(req.body);
    const { bas, cliente, ubicacion, latitud, longitud, descripcion } = req.body;
    const entradaNueva = {
        bas,
        descripcion,
        cliente,
        ubicacion,
        latitud,
        longitud
    };
    await pool.query('INSERT INTO bas set?', [entradaNueva]);
    //res.send('Recibido');
    req.flash('success', 'Obra guardada exitosamente!');
    res.redirect('/obras');
});

router.get('/', isLoggedIn, async(req, res) => {
    const obras = await pool.query('SELECT * FROM bas');
    //console.log(obras);
    res.render('obras/list', { obras: obras });
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM bas WHERE ID = ?', [id]);
    req.flash('success', 'Obra borrada de la base de datos!');
    res.redirect('/obras');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const obra = await pool.query('SELECT * FROM bas WHERE id = ?', [id]);
    console.log(obra);
    res.render('obras/edit', { obra: obra[0] });
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { bas, cliente, ubicacion, latitud, longitud, descripcion } = req.body;
    const entradaNueva = {
        bas,
        descripcion,
        cliente,
        ubicacion,
        latitud,
        longitud
    };
    await pool.query('UPDATE bas set ? WHERE id = ?', [entradaNueva, id]);
    req.flash('success', 'Obra actualizada!');
    res.redirect('/obras');
});

module.exports = router;