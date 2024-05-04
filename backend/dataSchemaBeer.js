const mongoose = require('mongoose')

const ReactFormDataSchemaBeer = new mongoose.Schema({
    _id: { type: Number },
    beerID: { type: Number },
    title: { type: String },
    url: { type: String },
    description: { type: String },
    macro_img: { type: String },
    review: [{
        username: { type: String},
        comment: { type: String },
        rating: { type: Number }
    }]
},
{ collection: "beer" });

const BeerProduct = mongoose.model('BeerProduct', ReactFormDataSchemaBeer)

module.exports = BeerProduct
