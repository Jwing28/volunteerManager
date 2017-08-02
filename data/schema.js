/*
what kind of data will you have and how do you want it returned??

two separate tables of volunteers and events

** but volunteers will have upcoming events

and events will have a list of signed up volunteers

if there are functions for each type, we don't really need that
likely just need two functions that take all the parameters as options
so front end can request only what they want to ?

type volunteer {
  id: ID
  name: String
  email: String
  age: Integer
  eventsAttended: Integer
  upComingEvents: Array
}

type events {
  id: ID
  name: String
  date: Date
  signedUpVolunteers: Array
  maxVolunteers: Integer
}

regular query might look like
{
  volunteer {
    (name:'Jon'){
      email
      age
      eventsAttended
      upComingEvents
    }
  }
}

should expect to get back:

{
  "data":{
    volunteer {
      name:'Jon',
      email:"something@gmail.com",
      age:25,
      eventsAttended:10,
      upComingEvents:[A,B,C]
    }
  }
}
*/
// const { buildSchema } = require('graphql');
//
// var schema = buildSchema(`
//   type User {
//     id: String
//     name: String
//   }
//
//   type Query {
//     user(id: String): User
//   }
// `);
//
//
// exports.schema = schema;
