import React from 'react';
import { Link } from 'react-router-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

//react router v4 injects
//in v4 routes must be hardcoded, not relative (for now)
const VolunteerDashboard = ({ match }) =>(
  <div>
    <h1>Volunteer Dashboard</h1>
      <Link to={`${match.url}/register`}>
        New Volunteer
      </Link>
      <Link to={`${match.url}/login`}>
        Existing Volunteer
      </Link>
      <Route path={`${match.url}/register`} component={Register} />
      <Route path={`${match.url}/login`} component={Login} />
  </div>
);

export default VolunteerDashboard;
