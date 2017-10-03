import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../Components/NavigationBar';
import Footer from '../Components/Footer';

class About extends React.Component {
  componentDidMount() {
    var script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.type = 'text/javascript';

    document.querySelector('head').appendChild(script);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div style={aboutStyles.container}>
          <h3>Fun facts about me:</h3>
          <p>I am Left handed</p>
          <p>Hobbies: Hiking, sports, movies</p>
          <div
            style={aboutStyles.linkedin}
            className="LI-profile-badge"
            data-version="v1"
            data-size="medium"
            data-locale="en_US"
            data-type="horizontal"
            data-theme="dark"
            data-vanity="jwingz"
          />
          <hr />
          <p>
            The goal of this project is to provide a simple way for small organizations to keep track of their
            volunteers and events.
          </p>
          <p>
            For example, a non-profit could use this application as a way to keep track of their
            volunteers and events, with a little bit of insight into the success of their events.
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

const aboutStyles = {
  container: {
    position: 'absolute',
    margin: 'auto',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    width: '50%',
    height: '50%',
    padding: '15px',
    border: '1px solid black',
    borderImage: 'linear-gradient(to right, red, blue) 1',
    borderImageWidth: '5px',
    fontSize: '1.5em',
    position: 'relative',
    WebkitTransform: 'translateY(10%)',
    listStyle: 'none'
  },
  linkedin: {
    width: '350px',
    marginLeft: '30%'
  }
};

export default About;
