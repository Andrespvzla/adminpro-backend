/*
   Subida de archivos
   Ruta: api/uploads/
*/

const { Router } = require('Express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImg } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload );
router.get('/:tipo/:foto', retornaImg );


module.exports = router;