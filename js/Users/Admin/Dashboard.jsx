import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../app/actions';
import { Table } from 'react-bootstrap';

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
      const listEvents = this.props.events.map((event, index) =>
        <tr key={event._id}>
          <td>{index + 1}</td>        
          <td>{event.name}</td>
          <td>{event.date}</td>
        </tr>
      );

      const listVolunteers = this.props.volunteers.map((volunteer, index) =>
        <tr key={event._id}>
          <td>{index + 1}</td>        
          <td>{volunteer.name}</td>
          <td>{volunteer.email}</td>
          <td>{volunteer.age}</td>
          <td>{volunteer.eventsAttended}</td>
        </tr>        
      );

      return (
        <div>
          <h1>Administrator Dashboard</h1>
          <h3><Link to="/newEvent">Create New Event</Link></h3>
          <h4>Upcoming Events</h4>
          <Table striped bordered condensed hover responsive>
            <tHead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Date</th> 
            </tr>           
            </tHead>
            <tbody>
              {listEvents}
            </tbody>
          </Table>
          <h4>Current Volunteers</h4>
          <Table striped bordered condensed hover responsive>
            <tHead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Events Attended</th>  
            </tr>          
            </tHead>
            <tbody>
              {listVolunteers}
            </tbody>
          </Table>
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
