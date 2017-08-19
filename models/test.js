let mongoose = require('mongoose');

// test Schema
let testSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

let Article = module.exports = mongoose.model('article', testSchema);
