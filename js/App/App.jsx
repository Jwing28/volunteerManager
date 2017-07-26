import React from 'react';
import store from './store';
import test from './actions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import AdminDashboard from '../Users/Admin/Dashboard';
import VolunteerDashboard from '../Users/Volunteers/Dashboard';
import NewEvent from '../Users/Admin/NewEvent';

const FourOhFour = () => <h1>404</h1>;

//include all routes inside switch.
//landing is the default path , initially where you want to take users to
//for now we created just one other screen outside of landing, the admin dashboard
const App = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/volunteer" component={VolunteerDashboard} />
      <Route path="/newEvent" component={NewEvent} />      
    </Switch>
  </BrowserRouter>;

export default App;
///YOU GOT REACT ROUTER SETUP - SETUP ALL OTHER PAGE ROUTES NOW WHILE ITS EASY....
//THEN START ADDING DATA.
