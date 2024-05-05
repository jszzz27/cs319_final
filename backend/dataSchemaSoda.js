const mongoose = require('mongoose')
const ReactFormDataSchemaSoda = new mongoose.Schema({
    _id: { type: Number },
    sodaID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    Cal: { type: Number },
    Sug: { type: Number },
    Caf: { type: Number },
    review: [{
        username: { type: String },
        comment: { type: String },
        rating: { type: Number }
    }]
},
{ collection: "soda" },
{ versionKey: false });

const SodaProduct = mongoose.model('SodaProduct', ReactFormDataSchemaSoda)

module.exports = SodaProduct
