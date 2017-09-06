import React from 'react';
import { connect } from 'react-redux';
import { postNewEvent } from '../../App/actions';

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', date: '', currentVolunteers: 0, maxVolunteers: 0 }

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
    this.setState({ maxVolunteers: e.target.value });
  }

  handleSubmit(e) {
    //e.preventDefault();
    var EventData = {
      name:this.state.name,
      date:this.state.date,
      currentVolunteers: this.state.currentVolunteers,
      maxVolunteers:this.state.maxVolunteers
    }
    this.props.postNewEvent(EventData);
  }

  render() {
    const listEvents = this.props.events.map((event) =>
      <li key={event._id}>
       {'Name: ' +  event.name + ' - ' + event.date + '\n' +
       'Volunteers: ' + event.currentVolunteers + ' / ' + event.maxVolunteers}
      </li>
    );

    return(
      <div>
        <div className={"title"}>Create A New Event</div>
        <form className={"newEventContainer"} onSubmit={this.handleSubmit}>
          <div><label>Name <input type="text" name="Name" value={this.state.name} onChange={this.handleNameChange} required /></label></div>
          <div><label>Date <input type="date" name="Date" value={this.state.date} onChange={this.handleDateChange} required /></label></div>
          <div><label>Maximum # of Volunteers <input type="text" name="Max Volunteers" value={this.state.maxVolunteers} onChange={this.handleMaxVolunteers}/></label></div>
          <input type="submit" value="Create Event" />
        </form>
        <h3>Admins: Please don't create duplicate events.</h3>
        <ul>{listEvents}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events:state.events,
    volunteers: state.volunteers
  }
}

const mapDispatchToProps = (dispatch) => ({
  postNewEvent(NewEventInfo) {
    dispatch(postNewEvent(NewEventInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
