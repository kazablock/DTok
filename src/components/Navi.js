import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import {NavLink} from 'react-router-dom'

export default class Navi extends Component {
  state={show:false,}
  async componentDidMount() {
    this.setState({url:"/profile/"+this.props.usersAddress})
    this.setState({show:true})


  }
 
  render() {
    
    return (
      <>

      {this.state.show&&(<Navbar collapseOnSelect sticky="top" className="flex-md-nowrap shadow" expand="sm" bg={{color:"#f0f2f5"}} variant="light">
      <NavLink to="/" style={{color:"#000000",fontWeight:'bold'}}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg></NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
          <Nav>
            <NavLink to={this.state.url} style={{color:"#000000",fontWeight:'bold',marginRight:'9px'}}>Profile</NavLink>
            <NavLink to="/allgroups" style={{color:"#000000",fontWeight:'bold',marginRight:'9px'}}>Groups</NavLink>
            <NavLink to="/add-post" style={{color:"#000000",fontWeight:'bold',marginRight:'9px'}}>+Add Post</NavLink>
            <a style={{color:"#000000",fontWeight:'bold'}} onClick={async()=>await this.props.box.logout().then(()=>console.log("loggedout"))}>Logout</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>)}

</>
    )
  }
}
