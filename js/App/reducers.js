import { My_Test } from './actions';

const initialState = {
  data: ''
};

function testRedux(state = initialState, action) {
  if (action.type === My_Test) {
    console.log('state: ', state);
    console.log('action ', action);
    console.log({...state,testing:action.payload})
    return {
      ...state,
      data: action.payload
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
