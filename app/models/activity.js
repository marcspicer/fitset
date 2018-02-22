var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ActivitySchema   = new Schema({
    description: String,
    id: Number,
    name: String,
    status: String
});

module.exports = mongoose.model('Activity', ActivitySchema);