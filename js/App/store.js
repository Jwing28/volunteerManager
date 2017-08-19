import { createStore } from 'redux';
import testRedux from './reducers';
import { test } from './actions';

let store = createStore(testRedux);

console.log('in store, line 7', store.getState());

// whenever state changes log it
let unsubscribe = store.subscribe(() =>
  console.log('inside unsubscribe',store.getState())
)

store.dispatch(test('something else'));

//subscribe returned fn for unregistering the listener
unsubscribe();

export default store;
