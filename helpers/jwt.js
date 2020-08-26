const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

   return new Promise( (resolve, reject) => {

      const payload = {
         uid
      }
   
      jwt.sign(payload, process.env.JWT_SECRETKEY, {
         expiresIn: '12h',
   
      }, (err, token) => {
         
         if (err) {
            console.log(error);
            reject('No se pudo generar el JWT')
         } else {
            resolve(token);
         }
   
      });

   });

}

module.exports = {
   generarJWT
}