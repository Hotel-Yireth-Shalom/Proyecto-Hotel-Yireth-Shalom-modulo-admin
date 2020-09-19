const {
    Router
} = require('express');
const router = Router();
const controlador = require('../controller/Admin.controller');


router.get('/', controlador.login);
router.get('/admin', controlador.admin);

router.post('/admin', controlador.reservasa);
router.post('/login', controlador.registarUsuario);
router.post('/login-admin', controlador.initlogin)
router.post('/cerrarsesion', controlador.cerrarSesion)

router.post('/actualizarDatos', controlador.actualizarDatos)

router.get('/eliminarclentes/:id', controlador.eliminarclientes)
router.get('/editarclentes/:id', controlador.editarclientes)

module.exports = router;