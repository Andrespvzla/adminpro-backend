const path = require('path');
const fs = require('fs');

const { response } = require('express');
const {v4: uuidv4 } = require('uuid');
const { actualizarImg } = require('../helpers/actualizarImg');


const fileUpload = (req, res = response) => {

   const tipo = req.params.tipo;
   const id = req.params.id;

   const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

   // Validar tipo
   if (!tiposValidos.includes(tipo)) {

      return res.status(400).json({
         ok: false,
         msg: 'No es un médico, un usuario o un hospital'
      });

   }

   // Validar que exista un archivo   
   if (!req.files || Object.keys(req.files).length === 0) {

      return res.status(400).json({
         ok: false,
         msg: 'No hay ningun archivo'
      });

   }

   // Procesar la imagen
   const file = req.files.img;

   const nombreCortado = file.name.split('.');
   const extensionArchivo = nombreCortado[nombreCortado.length - 1];

   // Validar extension
   const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

   if (!extensionesValidas.includes(extensionArchivo)) {

      return res.status(400).json({
         ok: false,
         msg: 'No es una extensión permitida'
      });

   }

   // Generar el nombre del archivo
   const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

   // Path para guardar la imagen
   const path = `./uploads/${ tipo }/${ nombreArchivo }`;

   // Mover la img
   file.mv(path, (error) => {
      if (error) {

         return res.status(400).json({
            ok: false,
            msg: 'Error al mover la imagen'
         });

      }

      // Actualizar DB
      actualizarImg(tipo, id, nombreArchivo);

      res.json({
         ok: true,
         msg: 'Archivo subido con exito',
         nombreArchivo
      });

   })
}

const retornaImg = (req, res = response) => {

   const tipo = req.params.tipo;
   const foto = req.params.foto;

   const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

   // Img por defecto
   if (fs.existsSync(pathImg)) {

      res.sendFile(pathImg);

   } else {

      const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
      res.sendFile(pathImg);

   }

}


module.exports = {
   fileUpload,
   retornaImg
}