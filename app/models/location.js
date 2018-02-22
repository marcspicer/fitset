var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationSchema   = new Schema({
   active: {
       type: String,
       enum: ['1', '0'],
       default: '1'
   },
   address: String,
   cancellation_policy: Number,
   city: String,
   description: String,
   geolocation: String,
   latitude: Number,
   longitude: Number,
   logo: String,
   max_visits: Number,
   mbo_studio: Boolean,
   name: String,
   open_gym: Boolean,
   payout_dropin: Number,
   payout_monthly: Number,
   phone: String,
   province: String,
   retail_dropin: Number,
   retail_monthly: Number,
   showers: Boolean,
   updated_at: Date,
   categories: Array
});

module.exports = mongoose.model('Location', LocationSchema);