const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const connectionString = process.env.DB_TYPE + process.env.DB_USER + ':' + process.env.DB_PSW + process.env.DB_PATH;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

MongoClient.connect(connectionString, function(err, db) {
  console.log('Initial connection to server successful.');
  if (err) {
    console.log('error occurred:', err);
  }

  var collection = db.collection('events');

  collection.find().toArray(function(err, docs) {
    console.log('testing auth access', docs);
  });
  db.close();
});

app.get('/events', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {

    console.log('Connected correctly to server');
    if (err) {
      console.log('error in connecting at get events:', err);
    }

    var collection = db.collection('events');

    collection.find().toArray(function(err, events) {
      if (err) {
        console.log('error in getting the event documents', err);
      }

      res.send(events);
    });
    db.close();
  });
});

app.get('/volunteers', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');
    collection.find().toArray(function(err, volunteers) {
      res.send(volunteers);
    });
    db.close();
  });
});

app.post('/events', function(req, res) {
  console.log('req.body: ', req.body);
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }
    console.log('post request data', req);
    var collection = db.collection('events');
    collection
      .insertOne({
        name: req.body.name,
        date: req.body.date,
        currentVolunteers: req.body.currentVolunteers,
        maxVolunteers: req.body.maxVolunteers
      })
      .then(function(result) {
        console.log('New Event Saved to MongoDb');
        res.send('New Event Added.');
      });
      db.close();
  });
});

//creates new volunteer
app.post('/register', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }
    console.log('post data - register', req);
    var collection = db.collection('volunteers');
    collection
      .insertOne({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        eventsJoined: 0,
        futureEvents: []
      })
      .then(function(result) {
        console.log('New Event Saved to MongoDb');
        res.send('New Event Added.');
      });
      db.close();
  });
});

app.put('/events/joinEvent', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('events');
    collection
      .update(
        { name: req.body.eventName },
        { $push: { currentVolunteers: { name: req.body.username, email: req.body.email } } }
      )
      .then(function(result) {
        console.log('User added to Event', result);
        res.send('User joined event.');
      });
      db.close();
  });
});

app.put('/volunteers/joinEvent', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');
    collection
      .update(
        { name: req.body.username },
        {
          $inc: { eventsJoined: 1 },
          $push: { futureEvents: { name: req.body.eventName } }
        }
      )
      .then(function(result) {
        console.log('Event added to User', result);
        res.send('Event added to User.');
      });
      db.close();
  });
});

app.delete('/events/:id', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('events');
    collection
      .deleteOne({
        _id: ObjectID(req.params.id)
      })
      .then(function(result) {
        console.log('Event removed from MongoDb', result);
        res.send('Event Removed.');
      });
      db.close();
  });
});

app.delete('/volunteers/:id', function(req, res) {
  MongoClient.connect(connectionString, function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');
    collection
      .deleteOne({
        _id: ObjectID(req.params.id)
      })
      .then(function(result) {
        console.log('Volunteer removed from MongoDb', result);
        res.send('Volunteer Removed.');
      });
      db.close();
  });
});

app.listen(process.env.DB_PORT, function() {
  console.log('listening on 3000');
});
