import React from 'react';
import { Link, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import VolunteerSummary from './VolunteerSummary';

//use this as reference
//going to need to do something similar on submit for login and register
const VolunteerDashboard = ({ match }) =>(
  <div>
    <h1>Volunteer Dashboard</h1>
      <Link style={volunteerDashStyle} to={`${match.url}/register`}>
        New Volunteer
      </Link>
      <Link style={volunteerDashStyle} to={`${match.url}/login`}>
        Existing Volunteer
      </Link>
      <Link style={volunteerDashStyle} to={`${match.url}/account`}>
        Your Account
      </Link>
      <Route path={`${match.url}/register`} component={Register} />
      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/account`} component={VolunteerSummary} />
  </div>
);

const volunteerDashStyle = {
  marginRight: '15px'
}

export default VolunteerDashboard;
