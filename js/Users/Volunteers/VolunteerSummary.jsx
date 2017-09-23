import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import EventTable from '../../Components/EventTable';
import { joinEvent } from '../../App/actions';

//should have a logged in as email tag  in upper right corer of page, next to logout btn
class VolunteerSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout(e) {
    //reset who is logged in, due to user logging out
    localStorage.setItem('email','');
  }

  handleJoinEvent(eventId) {
    //later: should show user they've joined event somehow
    //ideally flips or shows button to remove yourself from event!

    if(localStorage.getItem('email') !== '') {
      const userName = this.props.volunteers
        .filter((volunteer) => volunteer.email === localStorage.getItem('email'))[0].name; 

      const userInfo = {
        id: eventId,
        name: userName,
        email: localStorage.getItem('email')
      };
      console.log(this.props);

      this.props.joinEvent(userInfo);    
      console.log(this.props.events);          
    }
  }

  render() {
    const errorLogin = null;
    console.log(this.props.events)
    const listEvents = this.props.events.map((event, index) =>
      <tr key={event._id}>
        <td>{index + 1}</td>        
        <td>{event.name}</td>
        <td>{event.date}</td>  
        <td>{event.currentVolunteers.length + ' / ' + event.maxVolunteers}</td>    
        <Button
          style={{margin: '10px'}} 
          bsSize="xsmall" 
          bsStyle="success"
          onClick={() => this.handleJoinEvent(event._id)}
        >
          Sign-Up
        </Button>
      </tr>
    );

    const accountInfo = this.props.volunteers
      .filter((volunteer) => {
        return volunteer.email === localStorage.getItem('email');
      }).map((volunteer) =>
        <li key={volunteer._id}>
         {'Name: ' +  volunteer.name + ' Age: ' + volunteer.age + '\n' +
         'Events Attended: ' + volunteer.eventsAttended}
        </li>
    );

    return(
      <div>
        <Button bsStyle="info" onClick={()=> this.handleLogout}>Logout</Button>
        <div className="volunteerInfo">
          <h3>Your Account Info: </h3>
          <div>{accountInfo}</div>
          <p style={{color:'red'}}>{localStorage.getItem('email') === '' ? 'No User Logged in.': ''}</p>
        </div>
        <div className="eventTable">
          <h3>Volunteering Events:</h3>
          <EventTable data={{action: 'Join Event', tableData: listEvents}} />
        </div>
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
  joinEvent(VolunteerInfo) {
    dispatch(joinEvent(VolunteerInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VolunteerSummary);
