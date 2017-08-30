import React from 'react';

const Login = () =>
  <form>
    <div><label>Name <input type="text" name="Name" /></label></div>
    <div><label>Email <input type="text" name="Email"  /></label></div>
    <input type="submit" value="Login" />
  </form>;

export default Login;
