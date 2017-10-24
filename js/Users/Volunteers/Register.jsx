import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { createNewVolunteer } from '../../App/actions';
import VolunteerSummary from './VolunteerSummary';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', age: 0, valid: false };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
    //resets message since user is trying again or trying for first time to register
    if (this.state.valid) {
      this.setState({ valid: !this.state.valid });
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var UserData = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      eventsJoined: 0,
      futureEvents: []
    };

    var userExist = this.props.volunteers.filter(function(volunteerObj) {
      var email = volunteerObj.email;
      return email === UserData.email;
    });

    if (userExist.length) {
      console.log('user does exist');
      this.setState({ valid: !this.state.valid });
    } else {
      //user does not exist - save user to database
      this.props.createNewVolunteer(UserData);
    }
  }

  render() {
    return (
      <form style={formStyles.form} onSubmit={this.handleSubmit}>
        <label style={formStyles.contents}>
          Name:{' '}
          <input
            style={formStyles.contents}
            type="text"
            name="Name"
            value={this.state.name}
            onChange={this.handleNameChange}
            required
          />
        </label>
        <label style={formStyles.contents}>
          Email:{' '}
          <input
            style={formStyles.contents}
            type="text"
            name="Email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            required
          />
        </label>
        <label style={formStyles.contents}>
          Age:{' '}
          <input
            style={formStyles.contents}
            type="text"
            name="Age"
            value={this.state.age}
            onChange={this.handleAgeChange}
            required
          />
        </label>
        <input style={formStyles.button} type="submit" value="Register" />
        <CheckUserRegistration userInfo={this.state} />
      </form>
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

//need to have case to notify user they have successfully registered
export const CheckUserRegistration = props => {
  const validUser = props.userInfo.valid;

  if (!validUser) {
    return <div>Welcome! {props.userInfo.name} Please sign up for an event(s). </div>;
  } else {
    return (
      <div>Sorry, {props.userInfo.name}, user already exists. Please login as existing user or retry registering.</div>
    );
  }
};

const mapStateToProps = state => {
  return {
    volunteers: state.volunteers
  };
};

const mapDispatchToProps = dispatch => ({
  createNewVolunteer(UserInfo) {
    dispatch(createNewVolunteer(UserInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

/*
dont forget new user also has

events Attended
upcoming events
*/
