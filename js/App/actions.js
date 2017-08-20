//action types
export const My_Test = 'allData';
//need axios here
import axios from 'axios';
import React from 'react';

//action creator
// export function test(text) {
//   return {
//     type: My_Test,
//     payload:text
//   };
// }

// export function getAPIData(role) {
//   return {
//     type: My_Test,
//     payload:role
//   };
// }

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
        console.log('results ', results);
        dispatch({ type:'allData', payload: results });
      }))
      .catch((error) => {
        console.log('an error occurred getting data',error);
      });
  };
}

/*
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
    this.setState({ events:returnedEvents, volunteers:returnedVolunteers });
  }))
  .catch((error) => {
    console.log('an error occurred getting data',error);
  });
*/
