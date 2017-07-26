import React from 'react';
import preload from '../../../data.json';

const volunteers = preload[0].volunteers.map(volunteer =>
  <li key={volunteer.id}>
    <span>{volunteer.name}</span>
    <span><button>Delete</button></span>
    <span><button>Edit</button></span>
  </li>);

const VolunteerDashboard = () =>
  <div>
    <h1>Volunteer Dashboard</h1>
    <ul>{volunteers}</ul>
  </div>;

export default VolunteerDashboard;
