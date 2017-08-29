import { createStore, applyMiddleware } from 'redux';
import testRedux from './reducers';
import { getAPIData } from './actions';
import thunkMiddleware from 'redux-thunk';
//maybe grab logger middleware ? npm..

// const store = createStore(
//   testRedux,
//   +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions instead of objects
//   )
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(testRedux, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

// whenever state changes log it
let unsubscribe = store.subscribe(() =>
  console.log('inside unsubscribe',store.getState())
)

store.dispatch(getAPIData('something else'));

//subscribe returned fn for unregistering the listener
unsubscribe();

export default store;
