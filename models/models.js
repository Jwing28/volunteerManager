var mongoose = require('mongoose');
var schemaMongoose = mongoose.schema;
//var db = mongoose.connection;


// db.once('open',function(callback){
//   console.log('from models file: Connection Succeeded');/* Once the database connection has succeeded, the code in db.once is executed. */
// });

var Schema = mongoose.Schema;

var eventSchema = new Schema({
  id:Number,
  name:String,
  date:Date,
  signedUpVolunteers:Array,
  maxVolunteers:Number
});

var volunteerSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  eventsAttended: Number,
  upComingEvents:Array
});

var Event = mongoose.model('Event',eventSchema);
var Volunteer = mongoose.model("Volunteer", volunteerSchema);

Event.find({ 'id':0 },function(err,event){
  if (err) console.log('error',err);
  console.log('event info: ', event);
});

module.exports.Data = {
  Event:Event,
  Volunteer:Volunteer
};
