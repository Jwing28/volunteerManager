import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../app/actions';

class AdminDashboard extends React.Component {
  componentDidMount() {
    if(!this.props.events.length) {
      this.props.getAPIData();
    }
  }

  render() { //render method comes before componentDidMount!
    if(!this.props.events.length || !this.props.volunteers.length) {
      return <div>Loading....</div>
    }else {
      const listEvents = this.props.events.map((event) =>
        <li key={event._id}>
         {'Name: ' +  event.name + ' - ' + event.date + '\n' +
         'Volunteers: ' + event.signedUpVolunteers + ' / ' + event.maxVolunteers}
        </li>
      );

      const listVolunteers = this.props.volunteers.map((volunteer) =>
        <li key={volunteer._id}>
          {'Name: ' +  volunteer.name + ' - ' + volunteer.email + volunteer.age + '\n' +
          '# of Events Attended: ' + volunteer.eventsAttended}
        </li>
      );

      return(
        <div>
          <h1>Administrator Dashboard</h1>
          <h3><Link to="/newEvent">Create New Event</Link></h3>
          <h4>Upcoming Events</h4>
          <ul>{listEvents}</ul>
          <h4>Current Volunteers</h4>
          <ul>{listVolunteers}</ul>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    events:state.events,
    volunteers: state.volunteers
  }
}

const mapDispatchToProps = (dispatch) => ({
  getAPIData() {
    dispatch(getAPIData());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
