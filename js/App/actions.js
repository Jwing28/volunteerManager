import axios from 'axios';
import React from 'react';

//action types
export const GET_EVENTS = 'allData';
export const CREATE_EVENT = 'Create_Event';
export const REGISTER_EVENT = 'Register_Event';
export const CREATE_VOLUNTEER = 'Create_Volunteer';
export const DELETE_EVENT = 'Delete_Event';

export const getAPIData = () =>  {
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
        console.log('an error occurred getting app data',error);
      });
  };
}

export const postNewEvent = (EventInfo) => {
  console.log('inside actions', EventInfo);
  return (dispatch) => {
    axios
      .post('http://localhost:3000/events', EventInfo)
      .then((result) => {
        console.log('server returned on post: ', result);
        dispatch({ type:CREATE_EVENT, payload:EventInfo });
      })
      .catch((error) => {
        console.log('an error occurred creating event', error);
      });
  }
}

export const existingUser = (ExistingUser) => {
  console.log('inside existingUser', ExistingUser);

  return(dispatch) => {
    axios
      .get('http://localhost:3000/login', ExistingUser)
      .then((result) => {
        console.log('server returned on get: ', result);
        dispatch({ type:REGISTER_EVENT, payload:ExistingUser });
      })
      .catch((error) => {
        console.log('an error occurred requesting user', error);
      });
  }
}

export const createNewVolunteer = (NewUser) => {
  return(dispatch) => {
    axios
      .post('http://localhost:3000/register', NewUser)
      .then((result) => {
        console.log('server returned on get: ', result);
        dispatch({ type:CREATE_VOLUNTEER, payload:NewUser });
      })
      .catch((error) => {
        console.log('an error occurred requesting user', error);
      });
  }
}

export const deleteEvent = (EventId) => {
  return(dispatch) => {
    axios
      .delete(`http://localhost:3000/events/${EventId}`)
      .then((result) => {
        console.log('user removed: ', result);
        dispatch({type:DELETE_EVENT, payload:EventId});
      })
      .catch((error) => {
        console.log('an error occurred deleting user', error);
      });      
  }
}
