import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

const NavigationBar = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Volunteer Manager</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">About</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar> 
);

export default NavigationBar;


  