const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

   const hospitales = await Hospital.find().populate('usuario', 'nombre');

   try {

      res.json({
         ok: true,
         hospitales
      });

   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
   
}

const crearHospital = async (req, res = response) => {

   const uid = req.uid;
   const hospital = new Hospital({usuario: uid, ...req.body});

   try {

      const hospitalDB = await hospital.save();

      res.json({
         ok: true,
         hospital: hospitalDB
      });

   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
 
}

const actualizarHospital = async (req, res = response) => {

   const id = req.params.id;
   const uid = req.uid;

   try {
      
      const hospitalDB = await Hospital.findById(id);

      if (!hospitalDB) {
         return res.status(404).json({
            ok: true,
            msg: 'Hospital no encontrado por el id'
         });
      }

      const cambiosHospital = {
         ...req.body,
         usuario: uid
      }

      const hospitalActuliazdo = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true});

      res.json({
         ok: true,
         hospitalActuliazdo
      });

   } catch (error) {

      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });

   }

}

const borrarHospital = async (req, res = response) => {

   const id = req.params.id;

   try {
      
      const hospitalDB = await Hospital.findById(id);

      if (!hospitalDB) {
         return res.status(404).json({
            ok: false,
            msg: 'No existe hospital por ese id'
         });
      }

      await Hospital.findByIdAndDelete(id);

      res.json({
         ok: true,
         msg: 'Hospital eliminado'
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: 'Error inesperado'
      });
   }
   
}
   

module.exports = {
   getHospitales,
   crearHospital,
   actualizarHospital,
   borrarHospital
}