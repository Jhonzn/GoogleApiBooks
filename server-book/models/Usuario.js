const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    nombre: { type: String, require: true, unique: true},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true}

});

module.exports = mongoose.model("Usuario", userSchema)