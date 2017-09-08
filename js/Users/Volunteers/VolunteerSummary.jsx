import React from 'react';
import { connect } from 'react-redux';
import { postNewEvent } from '../../App/actions';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

//should have a logged in as email tag  in upper right corer of page, next to logout btn

class VolunteerSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    //reset who is logged in, due to user logging out
    localStorage.setItem('email','');
  }

  render() {
    //this should be a scrollable table (of events) next to a large value (of user's data)

    //**you should make the style of this an expression that depends upon percentages and changes color when
    //almost full!
    const listEvents = this.props.events.map((event) =>
      <ListGroupItem key={event._id}>
       {'Name: ' +  event.name + ' - ' + event.date + '\n' +
       'Volunteers: ' + event.currentVolunteers + ' / ' + event.maxVolunteers}
       <Button style={{marginLeft: '10px'}} bsSize="xsmall" bsStyle="success">Sign-Up</Button>
     </ListGroupItem>
    );

    const accountInfo = this.props.volunteers
      .filter((volunteer) => {
        return volunteer.email === localStorage.getItem('email');
      }).map((volunteer) =>
        <li key={volunteer._id}>
         {'Name: ' +  volunteer.name + ' Age:' + volunteer.age + '\n' +
         'Events Attended: ' + volunteer.eventsAttended}
        </li>
    );

    console.log(accountInfo);
    return(
      <div>
        <Button bsStyle="info" onClick={this.handleLogout}>Logout</Button>
        <div className="volunteerInfo">
          <h3>Your Account Info: </h3>
          <div>{accountInfo}</div>
        </div>
        <div className="eventTable">
          <h3>Volunteering Events:</h3>
          <ListGroup>{listEvents}</ListGroup>
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

// const mapDispatchToProps = (dispatch) => ({
//   postNewEvent(NewEventInfo) {
//     dispatch(postNewEvent(NewEventInfo));
//   }
// });

export default connect(mapStateToProps)(VolunteerSummary);
