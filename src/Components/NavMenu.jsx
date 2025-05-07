import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const NavMenu = () => {
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" >Student Management System</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/resultPage">Results</Nav.Link>
            <Nav.Link as={Link} to="/aboutMe">About</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
        <br/>

    </div>
  )
}

export default NavMenu