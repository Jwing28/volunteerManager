import { My_Test, CREATE_EVENT } from './actions';
//mapStateToProps - props.data initially
const initialState = {data: ''};
//we update the store here
//so we have to pass new stuff!
const testRedux = (state = initialState, action) => {
  if (action.type === My_Test) {
    return {
      ...state,
      data: action.payload
    }
  }else if (action.type === CREATE_EVENT) { //action.payload = new event was made
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
