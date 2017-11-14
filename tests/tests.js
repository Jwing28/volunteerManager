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
import { ListEvents, ListVolunteers } from '../js/Components/RenderLists';

//chai uses old version of should = have to assert existance of something before testing it
describe('GET requests', function() {
  it('should retrieve all events', function(done) {
    chai.request('http://localhost:3000').get('/events').end(function(err, res) {
      should.exist(res.body);
      console.log('resbody', res.body);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

  it('should retrieve all volunteers', function(done) {
    chai.request('http://localhost:3000').get('/volunteers').end(function(err, res) {
      should.exist(res.body);
      expect(Array.isArray(res.body)).to.equal(true);
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

describe('<ListEvents />', () => {
  it('should render a list of events', () => {
    expect(
      ListEvents([{ name: '5k Run', date: '10/27/17', currentVolunteers: [], maxVolunteers: [] }], function event() {
        return 'testing event list';
      })
    ).to.have.lengthOf(1);
  });
  it('should return null with no events', () => {
    expect(
      ListEvents([], function event() {
        return 'testing event list';
      })
    ).to.equal(null);
  });
});

describe('<ListVolunteers />', () => {
  it('should render a list of volunteers', () => {
    expect(
      ListVolunteers(
        { data: [{ name: 'Joe Johnson', email: 'jj@gmail.com', age: 33, eventsJoined: [] }] },
        function event() {
          return 'testing volunteer list';
        }
      )
    ).to.not.equal(null);
  });
  it('should return null with no volunteers', () => {
    expect(
      ListVolunteers({ data: [] }, function event() {
        return 'testing volunteer list';
      })
    ).to.equal(null);
  });
});
