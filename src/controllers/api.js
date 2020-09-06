const pool = require('../database'); // conexion a la base de datos
const passport = require('passport');

var controller = {

    login: (req, res, next) => {
        passport.authenticate('local.signin', (err, user, info) => {
            //console.log(user);
            if (err) { return res.status(200).send({ message: 'Login Incorrecto' }); }
            if (!user) { return res.status(200).send({ message: 'No existe el usuario' }); }
            req.logIn(user, function(err) {
                if (err) { return res.status(200).send({ message: 'Login Incorrecto' }); }
                return res.status(200).send({ message: 'Login Correcto' });
            });
        })(req, res, next);
    },

    initJob: async(req, res, next) => {
        console.log(req.body);
        const { id_bas, sitio, tarea, id_usuario } = req.body;
        const hora = new Date();
        const entradaNueva = {
            id_bas,
            inicio: hora,
            final: null,
            sitio,
            tarea,
            id_usuario,
        };
        var respuesta = await pool.query('INSERT INTO horas set?', [entradaNueva]);
        req.logOut();
        return res.status(200).send({
            respuesta: respuesta
        });
    },

    finJob: async(req, res, next) => {
        console.log(req.body);
        const { id } = req.body;
        const final = new Date();
        const entradaNueva = {
            final
        };
        const respuesta = await pool.query('UPDATE horas set? WHERE id = ?', [entradaNueva, id]);
        req.logOut();
        return res.status(200).send({
            respuesta: respuesta
        });
    }
};

module.exports = controller;