import React from 'react';

const events = preload[0].events.map(event =>
  <li key={event.id}>
    <span>{event.name}</span>
    <span>{' ' + event.signedUpVolunteers.length + '/' + event.maxVolunteers}</span>
    <span><button>Join</button></span>
  </li>
);

const VolunteerDashboard = () =>
  <div>
    <h1>Volunteer Dashboard</h1>
    <ul>Get Events here dont use data.json</ul>
  </div>;

export default VolunteerDashboard;
