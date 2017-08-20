//action types
export const My_Test = 'allData';
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
        var returnedEvents = events.data.map((event) => {
          return (
            <li key={event._id}>
              {'Name: ' +  event.name + ' - ' + event.date + '\n' +
              'Volunteers: ' + event.signedUpVolunteers + ' / ' + event.maxVolunteers}
            </li>
          );
        });

        var returnedVolunteers = volunteers.data.map((volunteer) => {
          return (
            <li key={volunteer._id}>
              {'Name: ' +  volunteer.name + ' - ' + volunteer.email + volunteer.age + '\n' +
              '# of Events Attended: ' + volunteer.eventsAttended}
            </li>
          );
        });
        var results = { events: returnedEvents, volunteers: returnedVolunteers };
        console.log('actions.js results ', results);
        dispatch({ type:'allData', payload: results });
      }))
      .catch((error) => {
        console.log('an error occurred getting data',error);
      });
  };
}
