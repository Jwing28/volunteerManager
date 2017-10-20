import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';

var should = chai.should();
chai.use(chaiHttp);

//chai uses old version of should = have to assert existance of something before testing it

describe('GET requests', function() {
  it('should retrieve all events', function(done) {
    chai.request('http://localhost:3000').get('/events').end(function(err, res) {
      should.exist(res.body);
      res.body.should.be.a('array');
      done();
    });
  });

  it('should retrieve all volunteers', function(done) {
    chai.request('http://localhost:3000').get('/volunteers').end(function(err, res) {
      should.exist(res.body);
      res.body.should.be.a('array');
      done();
    });
  });
});

