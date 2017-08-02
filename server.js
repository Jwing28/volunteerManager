/* eslint no-console:0 */
require('babel-register');

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var mongoose = require('mongoose');
//var Models = require('./models/models');
mongoose.Promise = Promise;

// Or `createConnection`
var promise = mongoose.createConnection('mongodb://localhost/volunteerManager', {
  useMongoClient: true,
  /* other options */
});
promise.then(function(db) {
  /* Use `db`, for instance `db.model()`*/
    console.log('db',db.base.connections[1]);

}).catch(function(error){
  console.log('an error has occurred mongoose connection: ', error);
});


//
// mongoose.connection.db.collection('data',(error,data)=>{
//   if (error) { console.log('error: ', error)}
//   console.log('data received: ', data);
// });




//graphql
var schema = buildSchema(`
  type User {
    id: String
    name: String
    random:[Int]
  }

  type Name {
    id:String
    name:String
  }

  type Query {
    testQuery(name:String!):Name
  }
`);


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

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000,function(){
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
