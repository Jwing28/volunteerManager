import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../app/actions';

class AdminDashboard extends React.Component {
  componentDidMount() {
    if(!this.props.events.length) {
      this.props.getAPIData();//grab all data and send to render method
    }
  }

  render() { //render method comes before componentDidMount!
    if(!this.props.events.length) {
      return <div>Loading....</div>
    }

    return(
      <div>
        <h1>Administrator Dashboard</h1>
        <h3><Link to="/newEvent">Create New Event</Link></h3>
        <h4>Upcoming Events</h4>
        <ul>{this.props.events}</ul>
        <h4>Current Volunteers</h4>
        <ul>{this.props.volunteers}</ul>
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
  getAPIData() {
    dispatch(getAPIData());
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
