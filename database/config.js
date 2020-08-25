const mongoose = require('mongoose');

const dbConnection = async() => {

   try {
      await mongoose.connect(process.env.CONNECTION, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      });

      console.log('Base de datos conectada');

   } catch (error){
      console.log(error);
      throw new Error('Error a la hora de iniciar la BD.');
   }

}

module.exports = {
   dbConnection
}