import { GET_EVENTS, CREATE_EVENT, REGISTER_EVENT } from './actions';

const initialState = {events:[],volunteers:[]};

const Reducers = (state = initialState, action) => {
  if (action.type === GET_EVENTS) {
    return {
      ...state,
      events: action.payload.events,
      volunteers: action.payload.volunteers
    }
  }else if (action.type === CREATE_EVENT) {
    console.log('inside create event reducer', action.payload);
    console.log('current state inside create event reducer', state);
    return {
      ...state,
      events: state.events.concat(action.payload)
    }
  } else if (action.type === REGISTER_EVENT) {
    //we know we are registering as a new volunteer
    //so we need to update DB & Store
    return {
      ...state
    }
  }
  return state;
}

export default Reducers;
