const express = require("express");
const router = express.Router();

const { altBaslikModel, validateAltBaslik } = require('../model/altBaslik');
const { konuBaslikModel } = require('../model/konuBaslik');
const auth = require('../middleware/auth');
require('../model/konuBaslik');

router.get("/", async (req, res) => {
    const altBaslik = await altBaslikModel.find().populate('konuBaslik', 'baslik');
    res.send(altBaslik);
});

router.post("/:id", auth, async (req, res) => {
    const { error } = validateAltBaslik(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const konuBaslik = await konuBaslikModel.findById(req.params.id);

    if (!konuBaslik) {
        return res.status(404).json({ success: false, message: 'Konu Başlık bulunamadı.' });
    }

    const altBaslik = new altBaslikModel({
        altbaslik: req.body.altbaslik,
        icerik: req.body.icerik,
        konuBaslik: req.params.id,
        sira: req.body.sira,
    });
    await altBaslik.save();
    res.send(altBaslik);

    konuBaslik.altbasliklar.push(altBaslik._id);
    await konuBaslik.save();
});

router.post("/", auth, async (req, res) => {
    const { error } = validateAltBaslik(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const konuBaslik = await konuBaslikModel.findById(req.body.konuBaslik);

    if (!konuBaslik) {
        return res.status(404).json({ success: false, message: 'Konu Başlık bulunamadı.' });
    }

    const altBaslik = new altBaslikModel({
        altbaslik: req.body.altbaslik,
        icerik: req.body.icerik,
        konuBaslik: req.body.konuBaslik,
        sira: req.body.sira,
    });
    await altBaslik.save();
    res.send(altBaslik);

    konuBaslik.altbasliklar.push(altBaslik._id);
    await konuBaslik.save();
});

module.exports = router;