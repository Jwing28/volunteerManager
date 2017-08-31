import React from 'react';

const Register = () =>
  <form>
    <div><label>Name: <input type="text" name="Name" /></label></div>
    <div><label>Email: <input type="text" name="Email"  /></label></div>
    <div><label>Age: <input type="text" name="Age"  /></label></div>
    <input type="submit" value="Register" />
  </form>;

export default Register;
