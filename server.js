/* eslint no-console:0 */
require('babel-register');

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

var app = express();

// //this had to be uncommented because the db doesn't have any schema to work with otherwise!
var Models = require('./models/event');
mongoose.Promise = Promise;

// // Or `createConnection`
// mongoose.createConnection('mongodb://JonWing:Iwtbag69@localhost:27017/volunteerManager', {
//   useMongoClient: true,
//   /* other options */
// }).then(function(db) {
//   /* Use `db`, for instance `db.model()`*/
//     //console.log('db',db.base.models.Event);
//     //console.log('db',db.base.models.Event);
//
//   // Models.Data.Event.findById({},function(err,doc){
//   //   if(err){
//   //       console.log('ERROR',err);
//   //   }
//   //   console.log('doc?',doc);
//   // });
// //console.log(db.collection('events').find({ "name":"New Year Wishes Run 5k" }));
//
// }).catch(function(error){
//   console.log('an error has occurred mongoose connection: ', error);
// });

mongoose.connect('mongodb://JonWing:Iwtbag69@localhost:27017/volunteerManager',{
  useMongoClient: true,
  /* other options */
});
// console.log('models',Models.Event);
// Models.Event.findById({},function(err,doc){
//   if(err){
//       console.log('ERROR',err);
//   }
//   console.log('doc?',doc);
// });


//graphql
// var schema = buildSchema(`
//   type User {
//     id: String
//     name: String
//     random:[Int]
//   }
//
//   type Name {
//     id:String
//     name:String
//   }
//
//   type Query {
//     testQuery(name:String!):Name
//   }
// `);


var fakeDatabase = {
  'a': {
    id: 'a',
    name: 'alice',
    random:()=>{
      return [1,2,3,4,5];
    }
  }
};
//how you design the root will determine how you design your type Query (or vice versa)
var root = {
  testQuery: function({name}) {
    return fakeDatabase[name];
  }
};


// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
app.listen(4000,function(){
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
