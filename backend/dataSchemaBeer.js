const mongoose = require('mongoose')

const ReactFormDataSchemaBeer = new mongoose.Schema({
    beerID: { type: Number },
    title: { type: String },
    url: { type: String },
    description: { type: String },
    macro_img: { type: String },
    review: [{
        id: { type: Number },
        username: { type: String},
        comment: { type: String },
        rating: { type: Number }
    }]
},
{ collection: "beer" },
{ versionKey: false });

const BeerProduct = mongoose.model('BeerProduct', ReactFormDataSchemaBeer)

module.exports = BeerProduct
