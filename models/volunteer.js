var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  eventsJoined: Number,
  futureEvents: [{ name: String }]
});

var Volunteer = mongoose.model('volunteers', volunteerSchema);
module.exports = Volunteer;
