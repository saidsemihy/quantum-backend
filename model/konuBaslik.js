const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = require('mongoose');

require('./altBaslik');

const konuBaslik = new Schema({
    sira: {
        type: Number,
    },

    baslik:{
        type:String,
    },
    resim:{
        type:String,
    },
    altbasliklar:[{
        type: Schema.Types.ObjectId,
        ref: 'altBaslik'
    }],
});

function validateKonuBaslik(konuBaslik) {
    const schema = Joi.object({
        sira: Joi.number().required(),
        baslik: Joi.string().min(3).required(),
        resim: Joi.string().min(3).required(),
        //altbasliklar import
        
    });
    return schema.validate(konuBaslik);
}


const konuBaslikModel = mongoose.model('konuBaslik', konuBaslik);
module.exports = { konuBaslikModel, validateKonuBaslik };