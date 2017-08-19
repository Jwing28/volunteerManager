import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../app/actions';
import axios from 'axios';


class AdminDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = { events: [], volunteers:[] }
  }

  componentDidMount() {
    const getEvents = () => axios.get('http://localhost:3000/events');
    const getVolunteers = () => axios.get('http://localhost:3000/volunteers');

    axios
      .all([getEvents(),getVolunteers()])
      .then(axios.spread((events,volunteers) => {
        var returnedEvents = events.data.map((event) => {
          return (
            <li key={event._id}>
              {'Name: ' +  event.name + ' - ' + event.date + '\n' +
              'Volunteers: ' + event.signedUpVolunteers + ' / ' + event.maxVolunteers}
            </li>
          );
        });

        var returnedVolunteers = volunteers.data.map((volunteer) => {
          return (
            <li key={volunteer._id}>
              {'Name: ' +  volunteer.name + ' - ' + volunteer.email + volunteer.age + '\n' +
              '# of Events Attended: ' + volunteer.eventsAttended}
            </li>
          );
        });
        this.setState({ events:returnedEvents, volunteers:returnedVolunteers });
      }))
      .catch((error) => {
        console.log('an error occurred getting data',error);
      });
  }

  render() {
    if(!this.state.events.length) {
      return <div>Loading....</div>
    }
    return(
      <div>
        <h1>Administrator Dashboard</h1>
        <h3><Link to="/newEvent">Create New Event</Link></h3>
        <h4>Upcoming Events</h4>
        <ul>{this.state.events}</ul>
        <h4>Current Volunteers</h4>
        <ul>{this.state.volunteers}</ul>
        <h4>From redux store: {this.props.testing}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    testing:state.testing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAPIData:dispatch(getAPIData('test'))
  }
}

export default connect(mapStateToProps)(AdminDashboard);
