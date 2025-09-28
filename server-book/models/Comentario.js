const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema(
    {
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
        idLibro: String,
        nombre: String,
        comentario: String,
        puntuacion: Number,
        fecha: Date,
    }
)

module.exports = mongoose.model("Comentario", comentarioSchema);