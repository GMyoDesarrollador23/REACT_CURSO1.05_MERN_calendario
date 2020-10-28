/*
    Rutas de Usuario / Auth
    host + /api/auth 
*/
const { Router } = require("express");
const { check } = require("express-validator");

const {
   crearUsuario,
   loginUsuario,
   revalidarToken,
} = require("../controllers/auth");
const {
   validarCampos,
} = require("../middlewares/validar-campo");
const {
   validarJwt,
} = require("../middlewares/validar-jwt");

// *********************rutas*********************
// configurar el router
const router = Router();
// ----------------------------------------------
router.post(
   "/new",
   [
      /* middleweres */
      check("email", "el email es obligatorio").isEmail(),
      check("name", "el nombre es obligatorio")
         .not()
         .isEmpty(),
      check(
         "password",
         "el password debe de ser de 6 caracteres"
      ).isLength({ min: 6 }),
      validarCampos,
   ],
   crearUsuario
);
// ----------------------------------------------
router.post(
   "/",
   [
      /* middleweres */
      check("email", "el email no es valido").isEmail(),
      check(
         "password",
         "el password debe de tener al menos 6 caracteres"
      ).isLength({ min: 6 }),
      validarCampos,
   ],
   loginUsuario
);
// ----------------------------------------------
router.get("/renew", validarJwt, revalidarToken);

module.exports = router;
