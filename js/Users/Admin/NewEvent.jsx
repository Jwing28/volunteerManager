import React from 'react';
import { connect } from 'react-redux';
import { postNewEvent } from '../../App/actions';

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', date: '', maxVolunteers: 0 }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMaxVolunteers = this.handleMaxVolunteers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidMount() {
  //   if(!this.props.events) {
  //     this.props.postNewEvent();
  //   }
  // }

  handleNameChange (e) {
    this.setState({ name: e.target.value });
  }

  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }

  handleMaxVolunteers(e) {
    this.setState({ maxVolunteers: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var EventData = {
      name:this.state.name,
      date:this.state.date,
      maxVolunteers:this.state.maxVolunteers
    }
    this.props.postNewEvent(EventData);
    // this.props.postNewEvent(EventData);
  }

  render() {
    return(
      <div>
        <div className={"title"}>Create A New Event</div>
        <form className={"newEventContainer"} onSubmit={this.handleSubmit}>
          <div><label>Name <input type="text" name="Name" value={this.state.name} onChange={this.handleNameChange} /></label></div>
          <div><label>Date <input type="date" name="Date" value={this.state.date} onChange={this.handleDateChange} /></label></div>
          <div><label>Maximum # of Volunteers <input type="text" name="Max Volunteers" value={this.state.maxVolunteers} onChange={this.handleMaxVolunteers}/></label></div>
          <input type="submit" value="Create Event" />
        </form>
        <h3>Admins: Please don't create duplicate events.</h3>
        <ul>{this.props.data.events}</ul>
      </div>
    );
  }
}
//YOUR ISSUE WAS /app.. it should be /App!!!!
const mapStateToProps = (state) => {
  return {
    data:state.data
  }
}

const mapDispatchToProps = (dispatch) => ({
  postNewEvent(stuff) {
    dispatch(postNewEvent(stuff));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
