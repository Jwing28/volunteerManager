import { createStore, applyMiddleware } from 'redux';
import testRedux from './reducers';
import { getAPIData } from './actions';
import thunkMiddleware from 'redux-thunk';
//maybe grab logger middleware ? npm..

const store = createStore(
  testRedux,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions instead of objects
  )
);

// whenever state changes log it
let unsubscribe = store.subscribe(() =>
  console.log('inside unsubscribe',store.getState())
)

store.dispatch(getAPIData('something else'));

//subscribe returned fn for unregistering the listener
unsubscribe();

export default store;
