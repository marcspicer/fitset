var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationSchema   = new Schema({
   _id: String,
   active: Boolean,
   address: String,
   cancellation_policy: Number,
   city: String,
   description: String,
   geolocation: String,
   latitude: String,
   longitude: String,
   logo: String,
   max_visits: Number,
   mbo_studio: Boolean,
   name: String,
   open_gym: Boolean,
   payout_dropin: String,
   payout_monthly: String,
   phone: String,
   province: String,
   retail_dropin: String,
   retail_monthly: String,
   showers: Boolean,
   updated_at: Date,
   created_at: Date,
   categories: Array
}, {collection: 'fitset_locations'});

module.exports = mongoose.model('Location', LocationSchema);