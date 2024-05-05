const mongoose = require('mongoose')

const ReactFormDataSchemaWater = new mongoose.Schema({
    waterID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    bottled: { type: String },
    review: [{
        username: { type: String },
        comment: { type: String },
        rating: { type: Number }
    }]
},
{ collection: "water" },
{ versionKey: false });

const WaterProduct = mongoose.model('WaterProduct', ReactFormDataSchemaWater)

module.exports = WaterProduct
