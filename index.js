//const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

/*mongoose.connect(
  process.env.DB,
  err => {
    console.log("Conectado correctamente a la BD", process.env.DB);
  }
);*/

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto", process.env.PORT);
});
