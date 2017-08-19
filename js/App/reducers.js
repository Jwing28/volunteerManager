import { My_Test } from './actions';

const initialState = {
  testing: 'before dispatch'
};

function testRedux(state = initialState, action) {
  if (action.type === My_Test) {
    return {
      ...state,
      testing: action.payload + ' state updated!'
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
