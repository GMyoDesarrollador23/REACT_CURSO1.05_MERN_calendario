const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");
// *************************************************
// --------------------------------------------------------
const crearUsuario = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      // verificar si el email existe
      let usuario = await Usuario.findOne({ email });
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg:
               "error el usuario con ese correro ya existe",
         });
      }

      usuario = new Usuario(req.body);

      // encriptar contrasenia
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      // Guardar nuevo usuario
      await usuario.save();

      //Generar jwt
      const token = await generarJWT(
         usuario.id,
         usuario.name
      );

      // enviar respuesta
      res.status(201).json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "Error en la base de datos",
      });
   }
};

// --------------------------------------------------------
const loginUsuario = async (req, res = response) => {
   const { email, password } = req.body;

   try {
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
         return res.status(400).json({
            ok: false,
            msg: "error el usuario con ese email no existe",
         });
      }

      // confirmar el password
      const valiPassword = bcrypt.compareSync(
         password,
         usuario.password
      );
      if (!valiPassword) {
         return res.status(400).json({
            ok: false,
            msg: "Password Incorrecto",
         });
      }

      // Generar token
      const token = await generarJWT(
         usuario.id,
         usuario.name
      );

      res.status(201).json({
         ok: true,
         uid: usuario.id,
         name: usuario.name,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: "Error por favor hable con el adm...",
      });
   }
};

// --------------------------------------------------------
const revalidarToken = async (req, res = response) => {
   const { uid, name } = req;

   const token = await generarJWT(uid, name);

   res.json({ ok: true, name, uid, token });
};

// --------------------------------------------------------
module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken,
};
