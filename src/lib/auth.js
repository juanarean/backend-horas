module.exports = {

    apiLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        return res.status(200).send({
            respuestas: "No estas logueado a la API!!"
        });
    },

    apiNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(200).send({
                respuesta: "Estas logueado..."
            });
        }

        return next();
    },

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        return res.redirect('/login/signin');
    },

    isNotLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/login/profile');
        }
        return next();
    }
};