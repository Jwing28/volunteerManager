import { My_Test, CREATE_EVENT } from './actions';
//mapStateToProps - props.data || this.props.data initially
const initialState = {events:[],volunteers:[]};

const testRedux = (state = initialState, action) => {
  if (action.type === My_Test) {
    console.log('inside test reducer', action.payload);
    return {
      ...state,
      events: action.payload.events,
      volunteers: action.payload.volunteers
    }
  }else if (action.type === CREATE_EVENT) { //action.payload = new event was made
    console.log('inside create event reducer', action.payload);
    console.log('current state inside create event reducer', state);
    return {
      ...state,
      events: state.events.concat(action.payload)
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
