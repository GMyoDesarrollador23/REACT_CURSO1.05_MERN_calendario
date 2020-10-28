const mongoose = require("mongoose");
// *******************************************************
const dbConection = async () => {
   try {
      await mongoose.connect(process.env.BD_CNN, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      });
      console.log("DDBB online");
   } catch (error) {
      console.log(error);
      throw new Error(
         "Error al ahora de inicializar a la DDBB"
      );
   }
};

module.exports = {
   dbConection,
};
