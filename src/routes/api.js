var express = require("express");
var ApiController = require("../controllers/api");

const passport = require('passport');

const { apiLoggedIn, apiNotLoggedIn } = require('../lib/auth'); // para proteger las vistas

var router = express.Router();

//Cargar rutas de la API:
router.post("/login", apiNotLoggedIn, ApiController.login);

router.post("/init-job", apiLoggedIn, ApiController.initJob);
router.post("/fin-job", apiLoggedIn, ApiController.finJob);

//router.get("/obras", apiLoggedIn, ApiController.obras);
//router.get("/horas", apiLoggedIn, ApiController.horas);

//router.post("/nueva-obra", apiLoggedIn, ApiController.nuevaObra);
// router.put("/obra", apiLoggedIn, ApiController.cambiarObra);

module.exports = router;