//action types
export const GET_EVENTS = 'allData';
export const CREATE_EVENT = 'Create_Event';
export const REGISTER_EVENT = 'Register_Event';

//need axios here
import axios from 'axios';
import React from 'react';

export function getAPIData() {
  return (dispatch) => {
    const getEvents = () => axios.get('http://localhost:3000/events');
    const getVolunteers = () => axios.get('http://localhost:3000/volunteers');

    axios
      .all([getEvents(),getVolunteers()])
      .then(axios.spread((events,volunteers) => {
        var results = { events: events.data, volunteers: volunteers.data };
        dispatch({ type:GET_EVENTS, payload: results });
      }))
      .catch((error) => {
        console.log('an error occurred getting data',error);
      });
  };
}

export function postNewEvent(EventInfo) {
  console.log('inside actions', EventInfo);
  return (dispatch) => {
    axios
      .post('http://localhost:3000/events', EventInfo)
      .then((result)=> {
        console.log('server returned on post: ', result);
        dispatch({ type:CREATE_EVENT, payload:EventInfo });
      })
      .catch((error)=> {
        console.log('an error occurred posting event', error);
      });
  }
}

export function existingUser(ExistingUser) {
  console.log('inside newUser', ExistingUser);

  return(dispatch) => {
    //check if email exists in db
      //if does NOT, prompt user that no such email and to try again or register as new users
      //if does exist, log user into THEIR volunteer dashboard
        //what this really means, is get all the data related to their user
        //and get all the events

    axios
      .post('http://localhost:3000/login', ExistingUser)
      .then((result)=> {
        console.log('server returned on post: ', result);
        dispatch({ type:REGISTER_EVENT, payload:ExistingUser });
      })
      .catch((error)=> {
        console.log('an error occurred posting event', error);
      });
  }
}
