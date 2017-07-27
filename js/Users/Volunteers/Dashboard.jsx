import React from 'react';
import preload from '../../../data.json';

const events = preload[0].events.map(event =>
  <li key={event.id}>
    <span>{event.name}</span>
    <span>{" " + event.signedUpVolunteers.length + "/" + event.maxVolunteers}</span>
    <span><button>Join</button></span>
  </li>);

const VolunteerDashboard = () =>
  <div>
    <h1>Volunteer Dashboard</h1>
    <ul>{events}</ul>
  </div>;

export default VolunteerDashboard;
