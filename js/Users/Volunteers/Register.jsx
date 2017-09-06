import React from 'react';
import { connect } from 'react-redux';

// const Register = () =>
//   <form>
//     <div><label>Name: <input type="text" name="Name" /></label></div>
//     <div><label>Email: <input type="text" name="Email"  /></label></div>
//     <div><label>Age: <input type="text" name="Age"  /></label></div>
//     <input type="submit" value="Register" />
//   </form>;
//
// export default Register;


class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = { name:'', email:'', age: 0, valid:false }

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

  handleAgeChange(e) {
    this.setState({ age: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var UserData = {
      name:this.state.name,
      email:this.state.email,
      age:this.state.age
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
          <div><label>Name: <input type="text" name="Name" value={this.state.name} onChange={this.handleNameChange} /></label></div>
          <div><label>Email: <input type="text" name="Email"  value={this.state.email} onChange={this.handleEmailChange} /></label></div>
          <div><label>Age: <input type="text" name="Age" value={this.state.age} onChange={this.handleAgeChange} /></label></div>
          <input type="submit" value="Register" />
          <CheckUser userInfo={this.state} />
        </form>
    )
  }
}
//need to have case to notify user they have successfully registered
const CheckUser = (props) => {
  const validUser = props.userInfo.valid;

  if(!validUser) {
    return <h3>Welcome! {props.userInfo.name} Please sign up for an event(s). </h3>;
  }else {
    return <h3>User already exists. Please login or retry.</h3>
  }
}

const mapStateToProps = (state) => {
  return {
    volunteers: state.volunteers
  }
};

const mapDispatchToProps = (dispatch) => ({
  createNewVolunteer() {
    dispatch(createNewVolunteer());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

/*
dont forget new user also has

events Attended
upcoming events
*/
