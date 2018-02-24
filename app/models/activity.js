var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ActivitySchema   = new Schema({
    description: String,
    _id: String,
    name: String,
    status: Boolean
},{ collection: 'fitset_activities' });

module.exports = mongoose.model('Activity', ActivitySchema);