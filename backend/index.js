const express = require("express");
// dotenv para que finciones las variables de entorno
require("dotenv").config();
const cors = require("cors");

const { dbConection } = require("./database/config");

// crear el servideor de express
const app = express();

// conectarse a la base de datos
dbConection();

// cors
app.use(cors());

// directorio publico
app.use(express.static("public"));

// lectura y parseo del dody
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// exuchar la peticion
app.listen(process.env.PORT, () => {
   console.log(
      `servidor corriendo en el puerto ${process.env.PORT}`
   );
});
