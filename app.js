const express = require("express");
const app = express();


const products = require('./routes/secenekler');
const mongoose = require("mongoose");

const home = require('./routes/home');
const konuBaslik = require('./routes/konuBaslik');
const altBaslik = require('./routes/altBaslik');
const users = require('./routes/user');

app.use(express.json());

const username = "quantumapp1";
const password = "quantumapp1";
const database = "quantum";

// mongodb+srv://quantumapp1:<password>@cluster0.ql9y4oa.mongodb.net/?retryWrites=true&w=majority

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ql9y4oa.mongodb.net/${database}?retryWrites=true&w=majority`);
        console.log("mongodb bağlantısı kuruldu.");
    }
    catch (err) {
        console.log(err);
    }
})();

app.use("/api/konuBaslik", konuBaslik);
app.use("/api/products", products);
app.use("/api/altBaslik", altBaslik);
app.use("/api/users", users);
app.use("/", home);



app.listen(3000, () => {
    console.log("listening on port 3000");
});