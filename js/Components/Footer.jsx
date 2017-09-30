import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const Footer = () =>
  <div style={footerStyle}>
    <div>Created by <a href="https://www.github.com/jwing28">Jonathan Lee</a></div>
  </div>;

export default Footer;

const footerStyle = {
  position: 'absolute',
  right: '0',
  bottom: '0',
  left: '0',
  padding: '1.5rem',
  backgroundColor: 'black',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '18px'
};
