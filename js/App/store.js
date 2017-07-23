import { createStore } from 'redux';
import testRedux from './reducers';
import { test } from './actions';

let store = createStore(testRedux);

console.log('in store, line 7', store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log('inside unsubscribe',store.getState())
)

store.dispatch(test('stuff'))


console.log(test)
unsubscribe();

export default store;
