import { My_Test, CREATE_EVENT, REGISTER_EVENT } from './actions';
const initialState = {events:[],volunteers:[]};

const testRedux = (state = initialState, action) => {
  if (action.type === My_Test) {
    console.log('inside test reducer', action.payload);
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

export default testRedux;

//what kind of reducers do you want?
//admin
//create / delete / add event
//add / remove volunteer from event
//login / logout from site

//types
//EventReducer
//Create_Event
//Delete_Event
//Edit_Event
//VolunteerReducer
//Add_Volunteer
//RemoveVolunteer
//Login/LogoutReducer
//Login
//Logout

//volunteer
//sign up  / remove self from event
//sign up / unsubscribe as volunteer
//login / logout from site
