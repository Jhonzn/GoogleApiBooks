const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {
        const {nombre, email, password} = req.body;

        const userExist = await Usuario.findOne({email});

        const userExist2 = await Usuario.findOne({nombre});

        if (userExist || userExist2) return res.status(400).json({ msg: "Usuario ya existe" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Usuario.create({nombre, email, password: hashedPassword });

        res.status(201).json({ msg: "Usuario creado", user: newUser });
        
    } catch (err) {
        res.status(500).json({ msg: err.message });   
    }
}

exports.login = async (req, res) => {

    try {

        const {email, password} = req.body;

        const user = await Usuario.findOne({email});

        if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(400).json({ msg: "Credenciales inválidas" });

        const token = jwt.sign({ id: user._id , nombre: user.nombre, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, email: user.email, nombre: user.nombre } });
        
    } catch (err) {

        res.status(500).json({ msg: err.message });
        
    }

}