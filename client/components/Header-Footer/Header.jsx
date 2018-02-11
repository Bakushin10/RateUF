import React from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Link, DropdownButton } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';

const Header = () => (
  <div className="container-fluid">
    <Navbar className="head">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#" className="special-text">
            RateUF
          </a>
        </Navbar.Brand>

        <Navbar.Toggle />
        <a className="head-contents" href="/#/Professor">
          Professors
        </a>
        <a className="head-contents" href="/#">
          Classes
        </a>
        <a className="head-contents" href="/#">
          Degree Outline
        </a>
      </Navbar.Header>
      <Nav />
    </Navbar>
  </div>
);

export default Header;
