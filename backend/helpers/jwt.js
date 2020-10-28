const jwt = require("jsonwebtoken");

const generarJWT = (uid, name) => {
   return new Promise((resolve, rejet) => {
      const payload = { uid, name };

      jwt.sign(
         payload,
         process.env.SECRET_JWT_SEED,
         {
            expiresIn: "2h",
         },
         (e, token) => {
            if (e) {
               console.log(e);
               rejet("no se pudo generar el token");
            }
            resolve(token);
         }
      );
   });
};

module.exports = {
   generarJWT,
};
