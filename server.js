const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const connectionString = process.env.DB_TYPE + process.env.DB_USER + ':' + process.env.DB_PSW + process.env.DB_PATH;
const prodConnectionString =
  process.env.DB_TYPE + process.env.DB_USER + ':' + process.env.DB_PSW + process.env.MONGODB_URI;

const Event = require('./models/event');
const Volunteer = require('./models/volunteer');
const mongoose = require('mongoose');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 10, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

mongoose.connect(prodConnectionString || connectionString, options);

app.get('/events', function(req, res) {
  Event.find({}, function(err, events) {
    if (err) {
      console.log('error: ', err);
    }

    console.log('All events', events);
    res.send(events);
  });
});

app.get('/volunteers', function(req, res) {
  Volunteer.find({}, function(err, volunteers) {
    if (err) {
      console.log('error: ', err);
    }

    console.log('All volunteers', volunteers);
    res.send(volunteers);
  });
});
// create a new user
app.post('/events', function(req, res) {
  var newEvent = Event({
    name: req.body.name,
    date: req.body.date,
    currentVolunteers: req.body.currentVolunteers,
    maxVolunteers: req.body.maxVolunteers
  });

  newEvent.save(function(err) {
    if (err) throw err;

    console.log('Event created!');
    res.send('New Event Added');
  });
});

//creates new volunteer
app.post('/register', function(req, res) {
  var newVolunteer = Volunteer({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    eventsJoined: 0,
    futureEvents: []
  });

  // save the user
  newVolunteer.save(function(err) {
    if (err) throw err;

    console.log('Volunteer created!');
    res.send('New Volunteer Added');
  });
});
//find event & push volunteer into event's array
app.put('/events/joinEvent', function(req, res) {
  var eventObj = { name: req.body.eventName };
  var userJoinEvent = { $push: { currentVolunteers: { name: req.body.username, email: req.body.email } } };

  Event.findOneAndUpdate(eventObj, userJoinEvent, function(err, user) {
    if (err) throw err;

    console.log('User added to event list', user);
    res.send('User joined event.');
  });
});
//find user & push event into user's array
app.put('/volunteers/joinEvent', function(req, res) {
  var userObj = { name: req.body.username };
  var addEventToUser = { $push: { futureEvents: { name: req.body.eventName } } };
  var incrementEventsJoined = { $inc: { eventsJoined: 1 } };

  Volunteer.findOneAndUpdate(userObj, addEventToUser, incrementEventsJoined, function(err, volunteer) {
    if (err) throw err;

    console.log('Event added to user list', volunteer);
    res.send('Event added to User.');
  });
});

app.delete('/events/:id', function(req, res) {
  // find the event with id
  Event.findByIdAndRemove(ObjectID(req.params.id), function(err) {
    if (err) throw err;

    console.log('Event deleted!');
    res.send('Event Removed');
  });
});

app.delete('/volunteers/:id', function(req, res) {
  // find the user with id
  Volunteer.findByIdAndRemove(ObjectID(req.params.id), function(err) {
    if (err) throw err;

    console.log('User deleted!');
    res.send('Volunteer Removed');
  });
});

app.listen(process.env.DB_PORT, function() {
  console.log(`Listening on port ${process.env.DB_PORT}`);
});
