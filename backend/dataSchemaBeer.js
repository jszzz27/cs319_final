const mongoose = require('mongoose')

const ReactFormDataSchemaBeer = new mongoose.Schema({
    beerID: { type: Number },
    title: { type: String },
    url: { type: String },
    description: { type: String },
    Cal: { type: Number },
    Carb: { type: Number },
    Alc: { type: Number },
    review: [{
        username: { type: String },
        comment: { type: String },
        rating: { type: Number }
    }]
},
{ collection: "beer" },
{ versionKey: false });

const BeerProduct = mongoose.model('BeerProduct', ReactFormDataSchemaBeer)

module.exports = BeerProduct
