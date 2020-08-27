/*
   Hospitales 
   Ruta: /api/hospitales
*/

const { Router } = require('Express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales')

const router = Router();

router.get('/', validarJWT, getHospitales);
router.post('/', 
   [
      validarJWT,
      check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
      validarCampos
   ], 
   crearHospital
);

router.put('/:id', 
   [
      validarJWT
   ],
   actualizarHospital
);

router.delete('/:id',
   validarJWT,
   borrarHospital
);

module.exports = router;