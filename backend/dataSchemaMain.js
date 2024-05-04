const mongoose = require('mongoose')

const ReactFormDataSchemaMain = new mongoose.Schema({
    mainid: { type: Number },
    title: { type: String },
    url: { type: String },
},
{ collection: "main" });

const MainProduct = mongoose.model('MainProduct', ReactFormDataSchemaMain)

module.exports = MainProduct
