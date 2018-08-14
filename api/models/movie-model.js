var mongoose = require('mongoose');
var schema = mongoose.Schema;

var movieSchema = new Schema({
    name : String,
    duration : Number,
    time : Date,
    date : Date,
    genre : String
});

module.exports = mongoose.model('movie', )