import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../App/actions';
import { deleteEvent } from '../../App/actions';
import { deleteVolunteer } from '../../App/actions';
import { Table, Button, OverlayTrigger, Tooltip as TooltipBS } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import EventTable from '../../Components/EventTable';
import { ListEvents, ListVolunteers } from '../../Components/RenderLists';

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
    if(!this.props.events.length || !this.props.volunteers.length) {
      return <div>Loading....</div>
    } else {

      const barData = this.props.volunteers.map((volunteer) => ({ name: volunteer.name, joined: volunteer.eventsJoined } ));

      return (
        <div>
          <h1 style={{textAlign:'center'}}>Administrator Dashboard</h1>          
          <h3 style={{textAlign:'center'}}><Link to="/newEvent">Create New Event</Link></h3>
          <hr />
          <BarChart style={{float:'left', marginTop:'5%'}} width={800} height={500} data={barData}
                margin={{top: 0, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar name="Most Active Volunteers" dataKey="joined" fill="#82ca9d" />
          </BarChart>    
          
          <h4 style={{textAlign:'center'}}>Upcoming Events</h4>
          <EventTable data={{action: 'Delete Event', tableData: ListEvents(this.props.events)}} />

          <h4 style={{textAlign:'center'}}>Current Volunteers</h4>
          <Table striped bordered condensed hover responsive>
            <tHead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Events Attended</th>  
              <th>Remove Volunteer</th> 
            </tr>          
            </tHead>
              <ListVolunteers data={this.props.volunteers} />
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
