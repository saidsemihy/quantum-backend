//const products = require('./routes/secenekler');
const express = require("express");
const mongoose = require("mongoose");

const home = require('../routes/home');
const konuBaslik = require('../routes/konuBaslik');
const altBaslik = require('../routes/altBaslik');
const users = require('../routes/user');

module.exports = function (app) {
    app.use(express.json()); // req.body
 

    app.use("/api/konuBaslik", konuBaslik);
    app.use("/api/altBaslik", altBaslik);
    app.use("/api/users", users);
    app.use("/", home);
}