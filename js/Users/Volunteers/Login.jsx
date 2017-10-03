import React from 'react';
import { connect } from 'react-redux';
import { existingUser } from '../../App/actions'; //since state and db are synced don't need this atm.
import { Table, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', valid: false };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var UserData = {
      name: this.state.name,
      email: this.state.email
    };

    var userExist = this.props.volunteers.filter(function(volunteerObj) {
      var email = volunteerObj.email;
      return email === UserData.email;
    });

    if (userExist.length) {
      this.setState({ valid: !this.state.valid });
      //check if someone is already logged in
      localStorage.setItem('email', UserData.email); //no one is logged in, ok to login
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
        <input style={formStyles.button} type="submit" value="Login" />
        <CheckUser userInfo={this.state} />
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

const CheckUser = props => {
  const validUser = props.userInfo.valid;

  if (validUser) {
    return <div>Welcome! {props.userInfo.name} </div>;
  } else {
    return <div>User was not found. Try again or register as new user.</div>;
  }
};

const mapStateToProps = state => {
  return {
    volunteers: state.volunteers
  };
};

export default connect(mapStateToProps)(Login);
