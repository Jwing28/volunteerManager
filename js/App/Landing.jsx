import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar';
import Footer from '../Components/Footer';

const Landing = () =>
  <div>
    <NavigationBar />
    <div style={LandingStyles.container}>
      <div style={LandingStyles.containerChildren}>
        Volunteer Management Services
        <hr />
      </div>
      <div>
        <button style={LandingStyles.containerChildren}>
          <Link to="/admin">
            Administrators
          </Link>
        </button>
        <button style={LandingStyles.containerChildren}>
          <Link to="/volunteer">
            Volunteers
          </Link>
        </button>
      </div>
    </div>
    <Footer />
  </div>;

const LandingStyles = {
  container: {
    margin: 'auto',
    width: '500px',
    border: '1px solid black',
    padding: '20px 10px',
    textAlign: 'center',
    borderImage: 'linear-gradient(to right, red, blue) 1',
    borderImageWidth: '5px',
    fontSize: '1.5em',
    position: 'relative',
    top: '50%',
    webkitTransform: 'translateY(150%)'
  },
  containerChildren: {
    margin: '5px'
  }
};

export default Landing;
