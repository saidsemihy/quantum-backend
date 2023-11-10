const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = require('mongoose');

require('./konuBaslik');

const altBaslik = new Schema({
    altbaslik: {
        type: String,
    },
    icerik: {
        type: String,
    },
    //konuBaslik import
    konuBaslik: {
        type: Schema.Types.ObjectId,
        ref: 'konuBaslik'
    },
    //sira import
    sira: {
        type: Number,
    },
});

function validateAltBaslik(altBaslik) {
    const schema = Joi.object({
        altbaslik: Joi.string().min(3).required(),
        icerik: Joi.string().min(3).required(),
        konuBaslik: Joi.string(),
        sira: Joi.number().required(),
    });
    return schema.validate(altBaslik);
}

const altBaslikModel = mongoose.model('altBaslik', altBaslik);
module.exports = {altBaslikModel, validateAltBaslik};
    