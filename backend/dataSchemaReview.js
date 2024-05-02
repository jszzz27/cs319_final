const mongoose = require('mongoose')

const ReactFormDataSchemaReview = new mongoose.Schema({
    _id: { type: Number },
    username: { type: String },
    productName: { type: String },
    comment: { type: String },
    rating: {type: Number }
},
{ collection: "review" });

const ReviewProduct = mongoose.model('ReviewProduct', ReactFormDataSchemaReview)

module.exports = ReviewProduct
