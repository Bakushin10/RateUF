import React from 'react';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

const Header = () => (
  <div className="container">

    <Navbar className="head">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#" className="special-text">
            RateUF
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Nav>
        <NavDropdown className="head-contents" eventKey={1} title="Professors" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1} href="#/professor">
            Find Professor
          </MenuItem>
          <MenuItem eventKey={1.2} href="#">
            Rate Professor
          </MenuItem>
        </NavDropdown>

        <NavDropdown className="head-contents" eventKey={2} title="Classes" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1} href="#">
            Find Class
          </MenuItem>
          <MenuItem eventKey={2.2} href="#">
            Rate Class
          </MenuItem>
        </NavDropdown>

        <NavDropdown className="head-contents" eventKey={3} title="Degree Outline" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} href="#">
            CSC
          </MenuItem>
          <MenuItem eventKey={3.2} href="#">
            CSE
          </MenuItem>
          <MenuItem eventKey={3.3} href="#">
            CE
          </MenuItem>
          <MenuItem eventKey={3.4} href="#">
            EE
          </MenuItem>
          <MenuItem eventKey={3.5} href="#">
            DAS
          </MenuItem>
          <MenuItem eventKey={3.2} href="#">
            MATH
          </MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  </div>
);

export default Header;
