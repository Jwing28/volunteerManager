import { GET_EVENTS, CREATE_EVENT, REGISTER_EVENT, CREATE_VOLUNTEER, DELETE_EVENT, DELETE_VOLUNTEER } from './actions';

const initialState = {events:[],volunteers:[]};

const Reducers = (state = initialState, action) => {
  if (action.type === GET_EVENTS) {
    return {
      ...state,
      events: action.payload.events,
      volunteers: action.payload.volunteers
    }
  }else if (action.type === CREATE_EVENT) {
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
  } else if (action.type === CREATE_VOLUNTEER) {
    return {
      ...state,
      volunteers: state.volunteers.concat(action.payload)
    }
  } else if (action.type === DELETE_EVENT) {
    return { 
      ...state,
      events: state.events.filter((Event) => Event._id !== action.payload)
    }
  } else if (action.type === DELETE_VOLUNTEER) {
    return {
      ...state,
      volunteers: state.volunteers.filter((Volunteer) => Volunteer._id !== action.payload)      
    }
  }
  return state;
}

export default Reducers;
