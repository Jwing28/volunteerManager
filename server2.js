const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

var MongoClient = require('mongodb').MongoClient,
  f = require('util').format,
  assert = require('assert');

//db.createUser({user:"root", pwd:"123456", roles:["root"]}) - super user
//https://stackoverflow.com/questions/37372684/mongodb-3-2-authentication-failed
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    // assert.equal(null, err);
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');

    collection.find().toArray(function(err, docs) {
      console.log('result', docs);
    });
  });
//'mongodb://JonWing:Iwtbag69@localhost:27017/volunteerManager'
//'mongodb://localhost/nodekb'

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  // Use connect method to connect to the Server
  //'mongodb://JonWing:Iwtbag69@cluster0-shard-00-00-a06ft.mongodb.net:27017,cluster0-shard-00-01-a06ft.mongodb.net:27017,cluster0-shard-00-02-a06ft.mongodb.net:27017/volunteerManager?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    // assert.equal(null, err);
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('events');

    collection.find().toArray(function(err, docs) {
      console.log('result', docs);
      res.send(docs);
    });
  });
});

app.listen('3000', function() {
  console.log('listening on 3000');
});

// make minimal api requests
//onload of '/' grab all of the events and volunteers - obv this is not scalable but for my purposes it's faster
//make this the initial store of redux

//any changes - create/update/delete
//can be processed by redux - >
//update store
//send update to mongodb

// ---> This way, minimize api calls, user experience is faster because load all the data once

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
