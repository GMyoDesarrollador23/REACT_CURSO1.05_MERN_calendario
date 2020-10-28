const { response } = require("express");
const Evento = require("../models/Evento");

// *******************************************************
const getEventos = async (req, res = response) => {
   const eventos = await Evento.find().populate(
      "user",
      "name"
   );

   res.status(201).json({
      ok: true,
      eventos,
   });
};

// ------------------------------------------------------
const crearEvento = async (req, res = response) => {
   const evento = new Evento(req.body);

   try {
      evento.user = req.uid;
      const eventoGuardado = await evento.save();

      res.json({
         ok: true,
         evento: eventoGuardado,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "Hable clon el administrador...",
      });
   }
};

// ------------------------------------------------------
const ActualizarEvento = async (req, res = response) => {
   const eventoId = req.params.id;
   const uid = req.uid;

   try {
      // verificar que el usuario exista
      const evento = await Evento.findById(eventoId);
      if (!evento) {
         return res.status(404).json({
            ok: false,
            msg: "el evento no exite con ese id",
         });
      }
      // verificar que el usuario sea duenio de la nota
      if (evento.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: "no tiene permiso para editar el evento",
         });
      }

      const nuevoEvento = { ...req.body, user: uid };

      // actualizar evento
      const eventoActualizado = await Evento.findByIdAndUpdate(
         eventoId,
         nuevoEvento,
         { new: true }
      );
      res.status(200).json({
         ok: true,
         evento: eventoActualizado,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "error al actualizar el evento...",
      });
   }
};

// ------------------------------------------------------
const eliminarEvento = async (req, res = response) => {
   // obtener el id de los parametros
   const eventoId = req.params.id;
   // obtener el id del usuario
   const uid = req.uid;
   try {
      // buscar el el evento mediante el id
      const evento = await Evento.findById(eventoId);
      if (!evento) {
         return res.status(404).json({
            ok: false,
            msg: "el evento no exite con ese id",
         });
      }
      
      // verificar que el evento sea del usuario
      if (evento.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: "no tiene permiso para elimianr el evento",
         });
      }

      // eliminar el evento
      await Evento.findOneAndDelete(eventoId);

      res.status(200).json({
         ok: true,
         msg: "elimado con exito ",
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "error al elimiar el evento...",
      });
   }
};
// ------------------------------------------------------

module.exports = {
   getEventos,
   crearEvento,
   ActualizarEvento,
   eliminarEvento,
};
