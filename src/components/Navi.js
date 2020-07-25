import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

export default class Navi extends Component {
  render() {
    return (

      <Navbar collapseOnSelect sticky="top" expand="sm" bg={{color:"#f0f2f5"}} variant="light">
        <Navbar.Brand style={{color:"#000000",fontWeight:'bold'}} href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link style={{color:"#000000",fontWeight:'bold'}}  href="/profile">Profile</Nav.Link>
            <Nav.Link style={{color:"#000000",fontWeight:'bold'}} eventKey={2} href="/add-post">
              +Add Post
      </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    );
  }
}
