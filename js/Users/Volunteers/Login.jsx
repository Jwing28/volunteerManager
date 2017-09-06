import React from 'react';
import { connect } from 'react-redux';
import { existingUser } from '../../App/actions'; //since state and db are synced don't need this atm.

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = { name:'', email:'', valid:false }

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
      name:this.state.name,
      email:this.state.email
    };

    var userExist = this.props.volunteers.filter(function(volunteerObj) {
      var email = volunteerObj.email;
      return email === UserData.email;
    });

    if(userExist.length) {
      console.log('user does exist')
      this.setState({ valid: !this.state.valid });
    }
    console.log('now what', this.props.volunteers);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div><label>Name: <input type="text" name="Name" value={this.state.name} onChange={this.handleNameChange} required /></label></div>
          <div><label>Email: <input type="text" name="Email"  value={this.state.email} onChange={this.handleEmailChange} required /></label></div>
          <input type="submit" value="Login" />
          <CheckUser userInfo={this.state} />
        </form>
    )
  }
}

const CheckUser = (props) => {
  const validUser = props.userInfo.valid;

  if(validUser) {
    return <h3>Welcome! {props.userInfo.name} </h3>;
  }else {
    return <h3>User was not found. Try again or register as new user.</h3>
  }
}

//this way you dont ping the server!
//you just check if they exist. if so, we will render their info and grab their
//email and store it in localstorage
const mapStateToProps = (state) => {
  return {
    volunteers: state.volunteers
  }
};

export default connect(mapStateToProps)(Login);
