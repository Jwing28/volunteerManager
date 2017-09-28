import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../App/actions';
import { deleteEvent } from '../../App/actions';
import { deleteVolunteer } from '../../App/actions';
import EventVolunteerTable from '../../Components/Tables';
import { ListEvents, ListVolunteers } from '../../Components/RenderLists';
import Leaderboard from '../../Components/Leaderboard';
import NavigationBar from '../../Components/NavigationBar';

class AdminDashboard extends React.Component {
  componentDidMount() {
    if(!this.props.events.length) {
      this.props.getAPIData();
    }
  }

  handleRemoveEvent(eventId) {
    this.props.deleteEvent(eventId);
  }

  handleRemoveVolunteer(volunteerId) {
    this.props.deleteVolunteer(volunteerId);
  }

  render() { //render method comes before componentDidMount!
    const barData = this.props.volunteers.map((volunteer) => ({ name: volunteer.name, joined: volunteer.eventsJoined } ));
    
    if(!this.props.events.length || !this.props.volunteers.length) {
      return <div>Loading....</div>
    } else {
      return (
        <div>
          <NavigationBar />
          <h1 style={{textAlign:'center'}}>Administrator Dashboard</h1>          
          <h3 style={{textAlign:'center'}}><Link to="/newEvent">Create New Event</Link></h3>
          <hr />
          <Leaderboard barData={barData} />           
          <h4 style={{textAlign:'center'}}>Upcoming Events</h4>
          <EventVolunteerTable tableType={'Event'} data={{action: 'Delete Event', tableData: ListEvents(this.props.events)}} />
          <h4 style={{textAlign:'center'}}>Current Volunteers</h4>
          <EventVolunteerTable tableType={'Volunteer'} data={{action: 'Remove Volunteer', tableData: this.props.volunteers}} />
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAPIData:() => {
      dispatch(getAPIData);
    },
    deleteEvent:(id) => {
      dispatch(deleteEvent(id));
    },
    deleteVolunteer:(id) => {
      dispatch(deleteVolunteer(id));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
