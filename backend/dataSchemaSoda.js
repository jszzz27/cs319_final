const mongoose = require('mongoose')
const ReactFormDataSchemaSoda = new mongoose.Schema({
    _id: { type: Number },
    sodaID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    macro_img: { type: String },
},
{ collection: "soda" });

const SodaProduct = mongoose.model('SodaProduct', ReactFormDataSchemaSoda)

module.exports = SodaProduct
