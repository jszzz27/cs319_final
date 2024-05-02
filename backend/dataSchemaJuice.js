const mongoose = require('mongoose')

const ReactFormDataSchemaJuice = new mongoose.Schema({
    _id: { type: Number },
    juiceID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    macro_img: { type: String },
},
{ collection: "juice" });

const JuiceProduct = mongoose.model('JuiceProduct', ReactFormDataSchemaJuice)

module.exports = JuiceProduct
