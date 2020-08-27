/*
   Busqueda
   Ruta: api/todo/:busqueda
*/

const { Router } = require('Express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedas, getColecciones } = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda', validarJWT, getBusquedas);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getColecciones);


module.exports = router;