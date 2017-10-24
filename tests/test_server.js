import React from 'react';
import { mount, shallow } from 'enzyme';
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

const should = chai.should();
chai.use(chaiHttp);

import { CheckUserLogin } from '../js/Users/Volunteers/Login';
import { CheckUserRegistration } from '../js/Users/Volunteers/Register';

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

describe('<Login />', () => {
  it('should allow valid login', () => {
    expect(shallow(<CheckUserLogin userInfo={{ name: 'Joe Johnson', valid: true }} />).text()).to.equal(
      'Welcome! Joe Johnson '
    );
  });
  it('should throw Error on invaid login', () => {
    expect(shallow(<CheckUserLogin userInfo={{ name: 'Wrong Name', valid: false }} />).text()).to.equal(
      'User was not found. Try again or register as new user.'
    );
  });
});

describe('<Register />', () => {
  it('should allow valid registration', () => {
    expect(shallow(<CheckUserRegistration userInfo={{ name: 'Joe Johnson', valid: false }} />).text()).to.equal(
      'Welcome! Joe Johnson Please sign up for an event(s). '
    );
  });
  it('should throw Error if user already exists', () => {
    expect(shallow(<CheckUserRegistration userInfo={{ name: 'Joe Johnson', valid: true }} />).text()).to.equal(
      'Sorry, Joe Johnson, user already exists. Please login as existing user or retry registering.'
    );
  });
});
