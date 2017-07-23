import React from 'react';
import store from './store';
import test from './actions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import AdminDashboard from '../Users/Admin/Dashboard';
import VolunteerDashboard from '../Users/Volunteers/Dashboard';

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
    </Switch>
  </BrowserRouter>;

export default App;
///YOU GOT REACT ROUTER SETUP - SETUP ALL OTHER PAGE ROUTES NOW WHILE ITS EASY....
//THEN START ADDING DATA.
