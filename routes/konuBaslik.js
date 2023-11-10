const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');

const { konuBaslikModel, validateKonuBaslik } = require('../model/konuBaslik');

router.get("/", async (req, res) => {
    const konuBaslik = await konuBaslikModel.find().populate('altbasliklar');

    if (!konuBaslik) {
        return res.status(404).json({ success: false, message: 'Konu Başlık bulunamadı.' });
    }
    res.send(konuBaslik);
});

router.get("/:id", async (req, res) => {
    //konubaslik define

    let konuBaslik;

    try {
        konuBaslik = await konuBaslikModel.findById(req.params.id).populate('altbasliklar');

        if (!konuBaslik) {
            return res.status(404).json({ message: error.message });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Konu Başlığı bulunamadı.' });
    }

    res.send(konuBaslik);
});

router.post("/",auth, async (req, res) => {
    const { error } = validateKonuBaslik(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const konuBaslik = new konuBaslikModel({
        sira: req.body.sira,
        baslik: req.body.baslik,
        resim: req.body.resim,
        altbasliklar: req.body.altbasliklar
    });
    await konuBaslik.save();
    res.send(konuBaslik);
});

module.exports = router;