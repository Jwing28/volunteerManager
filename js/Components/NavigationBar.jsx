import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import About from '../App/About';

const NavigationBar = () =>
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Volunteer Manager</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Brand>
      <Nav>
        <a href="#/About">Project Info</a>
      </Nav>
    </Navbar.Brand>
  </Navbar>;

export default NavigationBar;
