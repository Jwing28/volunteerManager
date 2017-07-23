import React from 'react';
import preload from '../../../data.json';

const events = preload.events.map(event =>
  <li key={event.id}>
    <span>{event.name}</span>
    <span>{" " + event.signedUpVolunteers.length + "/" + event.maxVolunteers}</span>
  </li>);

const AdminDashboard = () =>
  <div>
    <h1>admin dashboard</h1>
    <ul>{events}</ul>
  </div>;

export default AdminDashboard;
