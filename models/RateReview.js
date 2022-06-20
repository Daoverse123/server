var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let RateReview = new Schema({
    "review_id": String,
    "wallet_address": String,
    "rating": Boolean, //true = thumbs_up , false = thumbs_down
    "chain": String             
})

module.exports = mongoose.model('RateReview', RateReview);