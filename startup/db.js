const mongoose = require('mongoose');
const logger = require('./logger');
const config = require('config');



const username = config.get("db.username");
const password = config.get("db.password");
const database = config.get("db.name");

console.log(username, password, database);
module.exports = function () {
    mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ql9y4oa.mongodb.net/${database}?retryWrites=true&w=majority`);
    console.log("mongodb bağlantısı kuruldu.");

}