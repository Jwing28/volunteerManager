import React from 'react';
import { connect } from 'react-redux';

//NOTES:
//client & server side form validation ?
class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', date: '', maxVolunteers: '' }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMaxVolunteers = this.handleMaxVolunteers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (e) {
    this.setState({ name: e.target.value });
  }

  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }

  handleMaxVolunteers(e) {
    this.setState({ maxVolunteers: this.state.maxVolunteers + 1 });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return(
      <div>
        <div className={"title"}>Create A New Event</div>
        <form className={"newEventContainer"} onSubmit={this.handleSubmit}>
          <div><label>Name <input type="text" name="Name" value={this.state.name} onChange={this.handleNameChange} /></label></div>
          <div><label>Date <input type="date" name="Date" value={this.state.date} onChange={this.handleDateChange} /></label></div>
          <div><label>Maximum # of Volunteers <input type="text" name="Max Volunteers" value={this.state.maxVolunteers} onChange={this.handleMaxVolunteers}/></label></div>
          <input type="submit" value="Create Event" />
        </form>
        <h3>Admins: Please don't create duplicate events.</h3>
        <ul>{this.props.data.events}</ul>
      </div>
    );
  }
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
  postNewEvent(dataRequest) {
    dispatch(getAPIData(dataRequest));
  }
});

export default connect(mapStateToProps)(NewEvent);

//onsubmit, component method dispatches ~'newEvent'
//action creator post request to update mongodb
//dispatch inside action creator dispatches action with
//new event you created to reducer
//need to create new reducer clause
//return updated state
//use should receive notification message was success (or not)
