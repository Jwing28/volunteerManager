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
    console.log('result', docs);
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
      currentVolunteers: req.body.currentVolunteers,
      maxVolunteers: req.body.maxVolunteers
    })
    .then(function(result) {
      console.log('New Event Saved to MongoDb');
      res.send('New Event Added.');
    })
  });
});

//creates new volunteer 
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
      eventsJoined: 0,
      futureEvents: []
    })
    .then(function(result) {
      console.log('New Event Saved to MongoDb');
      res.send('New Event Added.');
    })
  });
});

//filter for event name.
//update that event's 'currentVolunteers' array with the obj having name and email 
app.put('/events/joinEvent', function(req,res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }
    //works (add and remove) 
    //db.events.update( {name: "Test Event 3" }, { $push: { currentVolunteers: { name:"Joe Johnson", email: "jj@gmail.com" } }}   )
    //db.events.update( {name:"Test Event 3" }, { $pull: { "currentVolunteers": { name: "Joe Johnson", email: "jj@gmail.com"  }  }}  )

    //id name and email are all available...

    var collection = db.collection('events');
    collection.update(
      { name : req.body.eventName },
      { $push: { currentVolunteers: { name: req.body.username, email: req.body.email }}}
    )
    .then(function(result) {
      console.log('User added to Event', result);
      res.send('User joined event.');
    })
  });
});

/*
db.volunteers.update(
   { "_id" : req.body.userId },
   {
     $inc: { stock: 5 },
     $set: {
       item: "ABC123",
       "info.publisher": "2222",
       tags: [ "software" ],
       "ratings.1": { by: "xyz", rating: 3 }
     }
   }
)
*/

app.put('/volunteers/joinEvent', function(req,res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');
    collection.update(
      { name : req.body.eventName },
      {
        $inc: { eventsJoined: 1 },
        $push: { futureEvents: { name: req.body.eventName }}
      }
    )
    .then(function(result) {
      console.log('Event added to User', result);
      res.send('Event added to User.');
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

app.delete('/volunteers/:id', function(req,res) {
  MongoClient.connect('mongodb://localhost/nodekb', function(err, db) {
    console.log('Connected correctly to server');
    if (err) {
      console.log('error occurred:', err);
    }

    var collection = db.collection('volunteers');
    collection.deleteOne({
      "_id" : ObjectID(req.params.id)
    })
    .then(function(result) {
      console.log('Volunteer removed from MongoDb', result);
      res.send('Volunteer Removed.');
    })
  });
});


app.listen('3000', function() {
  console.log('listening on 3000');
});
