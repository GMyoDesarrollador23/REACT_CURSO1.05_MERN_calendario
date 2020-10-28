/*
    Rutas CRUD / Events
    /api/events
*/
const { Router } = require("express");

const {
   getEventos,
   crearEvento,
   ActualizarEvento,
   eliminarEvento,
} = require("../controllers/events");
const {
   validarJwt,
} = require("../middlewares/validar-jwt");
const {
   validarCampos,
} = require("../middlewares/validar-campo");
const { check } = require("express-validator");
const isDate = require("../helpers/isDate");
// ***************************************************************

const router = Router();
router.use(validarJwt);
// -----------------------------------------------------
router.get("/", getEventos);
// -----------------------------------------------------
router.post(
   "/",
   [
      check("title", "el titulo es oblgatoro")
         .not()
         .isEmpty(),
      check(
         "start",
         "fecha de inicio es obligatoria"
      ).custom(isDate),
      check(
         "end",
         "fecha de finalizacion es obligatoria"
      ).custom(isDate),
      validarCampos,
   ],
   crearEvento
);
// -----------------------------------------------------
router.put(
   "/:id",
   [
      check("title", "El titulo es obligatorio")
         .not()
         .isEmpty(),
      check(
         "start",
         "Fecha de inicio es obligatoria"
      ).custom(isDate),
      check(
         "end",
         "Fecha de finalización es obligatoria"
      ).custom(isDate),
      validarCampos,
   ],
   ActualizarEvento
);
// -----------------------------------------------------
router.delete("/:id", eliminarEvento);

module.exports = router;
