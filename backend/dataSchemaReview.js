const mongoose = require('mongoose')

const ReactFormDataSchemaReview = new mongoose.Schema({
    _id: { type: Number },
    reviewID: { type: Number},
    productName: { type: String },
    comment: { type: String },
    rating: {type: String }
},
{ collection: "review" });

const ReviewProduct = mongoose.model('ReviewProduct', ReactFormDataSchemaReview)

module.exports = ReviewProduct
