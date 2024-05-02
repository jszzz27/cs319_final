const mongoose = require('mongoose')

const ReactFormDataSchemaWater = new mongoose.Schema({
    _id: { type: Number },
    waterID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    macro_img: { type: String },
},
{ collection: "water" });

const WaterProduct = mongoose.model('WaterProduct', ReactFormDataSchemaWater)

module.exports = WaterProduct
