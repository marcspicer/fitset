var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClassSchema   = new Schema({
    IsAvailable: Boolean,
    address_id: String,
    classScheduleID: String,
    description: String,
    endTime: Date,
    location_id: String,
    mbo_class: Boolean,
    name: String,
    open_gym: Boolean,
    saartTime: Date,
    trainer: String,
    trainer_id: Number
});

module.exports = mongoose.model('Classes', ClassSchema);