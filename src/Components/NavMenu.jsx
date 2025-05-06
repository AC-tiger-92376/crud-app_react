import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavMenu = () => {
  return (
    <div>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" >Student Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="resultPage">Results</Nav.Link>
            <Nav.Link href="aboutMe">About</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
        <br/>

    </div>
  )
}

export default NavMenu