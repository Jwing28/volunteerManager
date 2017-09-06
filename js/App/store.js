import { createStore, applyMiddleware } from 'redux';
import Reducers from './reducers';
import { getAPIData } from './actions';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducers, composeEnhancers(
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
