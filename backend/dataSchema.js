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

//------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------

const ReactFormDataSchemaBeer = new mongoose.Schema({
    _id: { type: Number },
    beerID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    macro_img: { type: String },
},
{ collection: "beer" });

const BeerProduct = mongoose.model('BeerProduct', ReactFormDataSchemaBeer)

//------------------------------------------------------------------------------------

const ReactFormDataSchemaReview = new mongoose.Schema({
    _id: { type: Number },
    reviewID: { type: Number},
    productName: { type: String },
    comment: { type: String },
    rating: {type: String }
},
{ collection: "review" });

const ReviewProduct = mongoose.model('ReviewProduct', ReactFormDataSchemaReview)

module.exports = {
    WaterProduct,
    JuiceProduct,
    SodaProduct,
    BeerProduct,
    ReviewProduct
}