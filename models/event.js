var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  name: { type: String, required: true, unique: true },
  date: Date,
  currentVolunteers: [{ name: String, email: String, age: Number, eventsJoined: Number, futureEvents: Array }],
  maxVolunteers: Number
});

var Event = mongoose.model('events', eventSchema);
module.exports = Event;


