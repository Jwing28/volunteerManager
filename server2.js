const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  assert = require('assert');

  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    // assert.equal(null, err);
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');

    collection.find().toArray(function(err, docs) {
      // console.log('result', docs);
    });
  });

//parse json and url encoding 
app.use(bodyParser.urlencoded());
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
      // console.log('result', events);
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
      // console.log('result', volunteers);
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
    //now need to take in request, update db, return success
    collection.insertOne({
      name: req.body.name,
      date: req.body.date,
      maxVolunteers: req.body.maxVolunteers
    })
    .then(function(result) {
      // process result
      console.log('New Event Saved to MongoDb');
      res.send('New Event Added.')//send result?
    })
  });
});

app.listen('3000', function() {
  console.log('listening on 3000');
});

//use rest....learn graphql later..
//routes:

//get
// '/admin'
// 'adimn/volunteers'
// 'admin/events'
// '/volunteers'
// 'volunteers/events'
// 'volunteer/account'
//post
// 'admin'
// '/admin/volunteers'
// '/admin/events'
// '/volunteers'
// '/volunteeers/events'
//update
// 'admin'
// '/admin/volunteers'
// '/admin/events'
//delete (put)
// 'admin'
// '/admin/volunteers'
// '/admin/events'
// 'volunteer'
// 'volunteer/account'

//admins get - CRUD
//volunteers get - CRD
