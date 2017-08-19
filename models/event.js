var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  id:Number,
  name:String,
  date:Date,
  signedUpVolunteers:Array,
  maxVolunteers:Number
});

var Event = module.exports = mongoose.model('event',eventSchema);
