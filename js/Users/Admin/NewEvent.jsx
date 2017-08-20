import React from 'react';
import { connect } from 'react-redux';

//NOTES:
//client & server side form validation ?
const NewEvent = (props) => {
  return(
    <div>
      <div className={"title"}>Create A New Event</div>
      <form className={"newEventContainer"}>
        <div><label>Name <input type="text" name="Name"/></label></div>
        <div><label>Date <input type="date" name="Date"/></label></div>
        <div><label>Maximum # of Volunteers <input type="text" name="Max Volunteers"/></label></div>
        <input type="submit" value="Create" />
      </form>
      <h3>Admins: Please don't create duplicate events.</h3>
      <ul>{props.data.events}</ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data:state.data
  }
}
//call dispatch onSubmit
//this time string you pass should be 'postEvent'
//this means you need another statement in reducer
const mapDispatchToProps = (dispatch) => ({
  getAPIData(dataRequest) {
    dispatch(getAPIData(dataRequest));
  }
});

export default connect(mapStateToProps)(NewEvent);
