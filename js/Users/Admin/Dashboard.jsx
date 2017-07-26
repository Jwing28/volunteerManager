import React from 'react';
import preload from '../../../data.json';
import { Link } from 'react-router-dom';

const events = preload[0].events.map(event =>
  <li key={event.id}>
    <span>{event.name}</span>
    <span>{" " + event.signedUpVolunteers.length + "/" + event.maxVolunteers}</span>
    <span><button>Delete</button></span>
    <span><button>Edit</button></span>
  </li>);

const AdminDashboard = () =>
  <div>
    <h1>Administrator Dashboard</h1>
    <h3><Link to="/newEvent">Create New Event</Link></h3>
    <ul>{events}</ul>
  </div>;

export default AdminDashboard;

//defaults to this for admin
  //from menu link, admin can go to volunteer dashboard but we start at volunteer dashboard
