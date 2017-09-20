const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');

    collection.find().toArray(function(err, docs) {
      // console.log('result', docs);
    });
  });

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/events', function(req, res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('events');
    collection.find().toArray(function(err, events) {
      res.send(events);
    });
  });
});

app.get('/volunteers', function(req, res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');
    collection.find().toArray(function(err, volunteers) {
      res.send(volunteers);
    });
  });
});

app.post('/events', function(req, res) {
  console.log('req.body: ', req.body);
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }
    console.log('post request data', req);
    var collection = db.collection('events');
    collection.insertOne({
      name: req.body.name,
      date: req.body.date,
      signedUpVolunteers: req.body.signedUpVolunteers,
      maxVolunteers: req.body.maxVolunteers
    })
    .then(function(result) {
      console.log('New Event Saved to MongoDb');
      res.send('New Event Added.');
    })
  });
});

app.post('/register', function(req, res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }
    console.log('post data - register', req);
    var collection = db.collection('volunteers');
    collection.insertOne({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      eventsAttended: 0,
      futureEvents: []
    })
    .then(function(result) {
      console.log('New Event Saved to MongoDb');
      res.send('New Event Added.');
    })
  });
});

//the end of the path is interactable via req.params.whatever end of path is!
app.delete('/events/:id', function(req,res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('events');
    collection.deleteOne({
      "_id" : ObjectID(req.params.id)
    })
    .then(function(result) {
      console.log('Event removed from MongoDb', result);
      res.send('Event Removed.');
    })
  });
});

app.listen('3000', function() {
  console.log('listening on 3000');
});
