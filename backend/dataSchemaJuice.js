const mongoose = require('mongoose')

const ReactFormDataSchemaJuice = new mongoose.Schema({
    juiceID: { type: Number},
    title: { type: String },
    url: { type: String },
    description: { type: String },
    Cal: { type: Number },
    Sug: { type: Number },
    review: [{
        username: { type: String },
        comment: { type: String },
        rating: { type: Number }
    }]
},
{ collection: "juice" },
{ versionKey: false });

const JuiceProduct = mongoose.model('JuiceProduct', ReactFormDataSchemaJuice)

module.exports = JuiceProduct
