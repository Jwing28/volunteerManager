import axios from 'axios';
import React from 'react';

//action types
export const GET_EVENTS = 'allData';
export const CREATE_EVENT = 'Create_Event';
export const REGISTER_EVENT = 'Register_Event';
export const CREATE_VOLUNTEER = 'Create_Volunteer';
export const DELETE_EVENT = 'Delete_Event';
export const DELETE_VOLUNTEER = 'Delete_Volunteer';
export const JOIN_EVENT = 'Join_Event';

export const getAPIData = () => {
  return dispatch => {
    const getEvents = () => axios.get(`${process.env.API_HOST}/events`);
    const getVolunteers = () => axios.get(`${process.env.API_HOST}/volunteers`);

    axios
      .all([getEvents(), getVolunteers()])
      .then(
        axios.spread((events, volunteers) => {
          var results = { events: events.data, volunteers: volunteers.data };
          dispatch({ type: GET_EVENTS, payload: results });
        })
      )
      .catch(error => {
        console.log('an error occurred getting app data', error);
      });
  };
};

export const postNewEvent = EventInfo => {
  console.log('inside actions', EventInfo);
  return dispatch => {
    axios
      .post(`${process.env.API_HOST}/events`, EventInfo)
      .then(result => {
        console.log('server returned on post: ', result);
        dispatch({ type: CREATE_EVENT, payload: EventInfo });
      })
      .catch(error => {
        console.log('an error occurred creating event', error);
      });
  };
};

export const joinEvent = VolunteerInfo => {
  console.log('inside joinEvent', VolunteerInfo);

  const addUserToEvent = () => {
    return axios.put(`${process.env.API_HOST}/events/joinEvent`, VolunteerInfo);
  };

  const addEventTouser = () => {
    return axios.put(`${process.env.API_HOST}/volunteers/joinEvent`, VolunteerInfo);
  };

  return dispatch => {
    axios
      .all([addUserToEvent(), addEventTouser()])
      .then(
        axios.spread((userToEventResult, eventToUserResult) => {
          console.log('userToEventResult result: ', userToEventResult);
          console.log('eventToUserResult result: ', eventToUserResult);
          dispatch({ type: JOIN_EVENT, payload: VolunteerInfo });
        })
      )
      .catch(error => {
        console.log('an error occurred joining event', error);
      });
  };
};

export const existingUser = ExistingUser => {
  console.log('inside existingUser', ExistingUser);

  return dispatch => {
    axios
      .get(`${process.env.API_HOST}/login`, ExistingUser)
      .then(result => {
        console.log('server returned on get: ', result);
        dispatch({ type: REGISTER_EVENT, payload: ExistingUser });
      })
      .catch(error => {
        console.log('an error occurred requesting user', error);
      });
  };
};

export const createNewVolunteer = NewUser => {
  return dispatch => {
    axios
      .post(`${process.env.API_HOST}/register`, NewUser)
      .then(result => {
        console.log('server returned on get: ', result);
        dispatch({ type: CREATE_VOLUNTEER, payload: NewUser });
      })
      .catch(error => {
        console.log('an error occurred requesting user', error);
      });
  };
};

export const deleteEvent = EventId => {
  return dispatch => {
    axios
      .delete(`${process.env.API_HOST}/events/${EventId}`)
      .then(result => {
        console.log('event removed: ', result);
        dispatch({ type: DELETE_EVENT, payload: EventId });
      })
      .catch(error => {
        console.log('an error occurred deleting event', error);
      });
  };
};

export const deleteVolunteer = VolunteerId => {
  return dispatch => {
    axios
      .delete(`${process.env.API_HOST}/volunteers/${VolunteerId}`)
      .then(result => {
        console.log('volunteer removed: ', result);
        dispatch({ type: DELETE_VOLUNTEER, payload: VolunteerId });
      })
      .catch(error => {
        console.log('an error occurred deleting volunteer', error);
      });
  };
};
