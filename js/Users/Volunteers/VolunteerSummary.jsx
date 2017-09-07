import React from 'react';
import { connect } from 'react-redux';
import { postNewEvent } from '../../App/actions';

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
    const listEvents = this.props.events.map((event) =>
      <li key={event._id}>
       {'Name: ' +  event.name + ' - ' + event.date + '\n' +
       'Volunteers: ' + event.currentVolunteers + ' / ' + event.maxVolunteers}
      </li>
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
        <div className="volunteerInfo">
          <h3>Your Account Info: </h3>
          <div>{accountInfo}</div>
        </div>
        <div className="eventTable">
          <h3>Volunteering Events:</h3>
          <div>{listEvents}</div>
        </div>
        <button onClick={this.handleLogout}>Logout</button>
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
