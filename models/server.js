const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uniqueValidator = require("mongoose-unique-validator");

const serverSchema = new Schema(
  {
    notaria: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "El numero es obligatorio"]
    },
    info: {
      type: Array,
      default: []
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

serverSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("Server", serverSchema);
