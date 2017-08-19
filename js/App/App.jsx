import React from 'react';
import store from './store';
import test from './actions';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'

import Landing from './Landing';
import AdminDashboard from '../Users/Admin/Dashboard';
// import VolunteerDashboard from '../Users/Volunteers/Dashboard';
import NewEvent from '../Users/Admin/NewEvent';

const FourOhFour = () => <h1>404</h1>;

/*

      <Route path="/volunteer" component={VolunteerDashboard} />

*/

//include all routes inside switch.
//landing is the default path , initially where you want to take users to
//for now we created just one other screen outside of landing, the admin dashboard
const App = () =>
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/newEvent" component={NewEvent} />
        <Route path="*" component={FourOhFour} />
      </Switch>
    </HashRouter>
  </Provider>

export default App;
