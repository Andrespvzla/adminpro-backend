const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear servidor de EXPRESS
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) =>{
   res.json({
      ok: true,
      msg: 'Hola mundo'
   });
});

app.listen(process.env.PORT, () => {
   console.log('Servidor en puerto ' + process.env.PORT);
});