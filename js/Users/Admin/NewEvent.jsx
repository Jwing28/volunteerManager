import React from 'react';
import { connect } from 'react-redux';
import { postNewEvent } from '../../App/actions';
import NavigationBar from '../../Components/NavigationBar';
import Footer from '../../Components/Footer';

class NewEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', date: '', currentVolunteers: 0, maxVolunteers: 0 };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMaxVolunteers = this.handleMaxVolunteers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleDateChange(e) {
    this.setState({ date: e.target.value });
  }

  handleMaxVolunteers(e) {
    this.setState({ maxVolunteers: e.target.value });
  }

  handleSubmit(e) {
    //e.preventDefault();
    var EventData = {
      name: this.state.name,
      date: this.state.date,
      currentVolunteers: [],
      maxVolunteers: this.state.maxVolunteers
    };
    this.props.postNewEvent(EventData);
  }

  render() {
    // const listEvents = this.props.events.map(event =>
    //   <li key={event._id}>
    //     {'Name: ' +
    //       event.name +
    //       ' - ' +
    //       event.date +
    //       '\n' +
    //       'Volunteers: ' +
    //       event.currentVolunteers.length +
    //       ' / ' +
    //       event.maxVolunteers}
    //   </li>
    // );

    return (
      <div>
        <NavigationBar />
        <h2 style={{ textAlign: 'center' }} className={'title'}>Create A New Event</h2>
        <form style={formStyles.form} className={'newEventContainer'} onSubmit={this.handleSubmit}>
          <div>
            <label style={formStyles.contents}>
              Name{' '}
              <input
                style={formStyles.contents}
                type="text"
                name="Name"
                value={this.state.name}
                onChange={this.handleNameChange}
                required
              />
            </label>
          </div>
          <div>
            <label style={formStyles.contents}>
              Date{' '}
              <input
                style={formStyles.contents}
                type="date"
                name="Date"
                value={this.state.date}
                onChange={this.handleDateChange}
                required
              />
            </label>
          </div>
          <div>
            <label style={formStyles.contents}>
              Maximum # of Volunteers{' '}
              <input
                style={formStyles.contents}
                type="text"
                name="Max Volunteers"
                value={this.state.maxVolunteers}
                onChange={this.handleMaxVolunteers}
              />
            </label>
          </div>
          <input style={formStyles.button} type="submit" value="Create Event" />
        </form>
        <Footer />
      </div>
    );
  }
}

//put this in css file
const formStyles = {
  form: {
    border: '2px solid black',
    borderImage: 'linear-gradient(to right, red, blue) 1',
    padding: '10px',
    width: '350px',
    borderRadius: '5px',
    textAlign: 'left',
    margin: '5% auto'
  },
  contents: {
    display: 'block',
    margin: '10px 0px'
  },
  button: {
    backgroundColor: 'lightblue',
    border: '1px solid black',
    borderRadius: '5px',
    fontSize: '15px',
    marginBottom: '10px'
  }
};

const mapStateToProps = state => {
  return {
    events: state.events,
    volunteers: state.volunteers
  };
};

const mapDispatchToProps = dispatch => ({
  postNewEvent(NewEventInfo) {
    dispatch(postNewEvent(NewEventInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewEvent);
