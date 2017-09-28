import React from 'react';
import { Link, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import VolunteerSummary from './VolunteerSummary';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import NavigationBar from '../../Components/NavigationBar';

const VolunteerDashboard = ({ match }) =>(
  <div>
    <NavigationBar />  
    <h1 style={volunteerDashStyle}>Volunteer Dashboard</h1>
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
  marginRight: '15px',
  textAlign:'center'
}

export default VolunteerDashboard;



