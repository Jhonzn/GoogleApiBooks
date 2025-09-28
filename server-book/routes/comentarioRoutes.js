const express = require("express");
const Comentario = require("../models/Comentario");
const router = express.Router();


router.post( "/", async (req, res) => {
    const nuevoConment = new Comentario(req.body);
    await nuevoConment.save();
    res.json(nuevoConment);
});
router.get("/", async (req, res) => {
    const comentarios = await Comentario.find();
    res.json(comentarios);
});
router.delete("/:id", async (req, res) => {
    try {
        await Comentario.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Comentario eliminado"});     
    } catch (err) {
        res.json(500).json({ success: false, error: err.message});    
    }
});
router.put("/:id", async(req, res) => {
    try {
        const updatedComment = await Comentario.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({ success: true, data: updatedComment });      
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});       
    }
});
module.exports =router;