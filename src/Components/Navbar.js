import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">MR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tvshows">TV Shows</Nav.Link>
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/new">New & Popular</Nav.Link>
            <Nav.Link as={Link} to="/mylist">My List</Nav.Link>
          </Nav>
          <Form className="d-flex">
          <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navigation;