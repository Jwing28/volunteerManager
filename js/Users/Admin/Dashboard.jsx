import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../app/actions';
import axios from 'axios';


class AdminDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = { events: [] }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/')
      .then((result)=>{
        var returnedEvents = result.data.map((event) => {
          return (
            <li key={event._id}>
              {'Name: ' +  event.name + ' - ' + event.date + '\n' +
              'Volunteers: ' + event.signedUpVolunteers + ' / ' + event.maxVolunteers}
            </li>
          );
        });
        this.setState({events:returnedEvents});
      })
      .catch((error)=>{
        console.log('an error occurred getting data',error);
      })
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
        <ul>pull volunteers from here</ul>
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
