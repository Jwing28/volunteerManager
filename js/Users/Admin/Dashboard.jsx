import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPIData } from '../../App/actions';
import { deleteEvent } from '../../App/actions';
import { Table, Button, OverlayTrigger } from 'react-bootstrap';
import { Tooltip as TooltipBS }  from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// import '../../../css/users/admin.css';

const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class AdminDashboard extends React.Component {
  componentDidMount() {
    if(!this.props.events.length) {
      this.props.getAPIData();
    }
  }

  handleRemoveEvent(eventId) {
    //right way
    //dispatch id
    this.props.deleteEvent(eventId);
  }

  render() { //render method comes before componentDidMount!
    if(!this.props.events.length || !this.props.volunteers.length) {
      return <div>Loading....</div>
    } else {

      const tooltipBootStrap = (
        <TooltipBS id="tooltip">Are you sure?</TooltipBS>
      );      

      const listEvents = this.props.events
      .sort((currentEvent,nextEvent) =>
        currentEvent.name.split("")[0] > nextEvent.name.split("")[0]
      )
      .map((event, index) =>
        <tr key={event._id}>
          <td>{index + 1}</td>        
          <td>{event.name}</td>
          <td>{event.date}</td>
          <td>
          <OverlayTrigger placement="right" overlay={tooltipBootStrap}>
            <Button bsStyle="danger" onClick={() => this.handleRemoveEvent(event._id)}>Delete</Button>
          </OverlayTrigger>
          </td>
        </tr>
      );

      const listVolunteers = this.props.volunteers
      .map((volunteer, index) =>
        <tr key={event._id}>
          <td>{index + 1}</td>        
          <td>{volunteer.name}</td>
          <td>{volunteer.email}</td>
          <td>{volunteer.age}</td>
          <td>{volunteer.eventsAttended}</td>
          <td>
            <OverlayTrigger placement="right" overlay={tooltipBootStrap}>
              <Button bsStyle="danger">Remove</Button>
            </OverlayTrigger>          
          </td>
        </tr>        
      );

      return (
        <div>
          <h1 style={{textAlign:'center'}}>Administrator Dashboard</h1>          
          <h3 style={{textAlign:'center'}}><Link to="/newEvent">Create New Event</Link></h3>
          <hr />
          <BarChart style={{float:'left', marginTop:'5%'}} width={800} height={500} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="name"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar dataKey="pv" fill="#8884d8" />
           <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>    
          <h4 style={{textAlign:'center'}}>Upcoming Events</h4>
          <Table striped bordered hover responsive>
            <tHead>
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Date</th> 
              <th>Delete Event</th> 
            </tr>           
            </tHead>
            <tbody>
              {listEvents}
            </tbody>
          </Table>
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAPIData:() => {
      dispatch(getAPIData);
    },
    deleteEvent:(id) => {
      dispatch(deleteEvent(id));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminDashboard);
