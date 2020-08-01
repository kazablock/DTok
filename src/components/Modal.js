import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";
import CommentBox from "3box-comments-react";


export default class Example extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true })
  };

  componentWillUnmount(){
    this.props.space.unsubscribeThread(this.props.app.name)
  }

  render() {
    return (
      <>
       
        <Button variant="primary" onClick={this.state.handleShow}  className="btn-rounded">
          Comments
        </Button>

        <Modal show={this.state.show} onHide={this.state.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className="text-justify text-center">{this.props.app.name}</Modal.Title>
            
          </Modal.Header>
         
          <Modal.Body>{this.props.app.description}
          <div>
          <CommentBox
            spaceName={process.env.REACT_APP_SPACE_NAME}
            threadName={this.props.app.name}
            box={this.props.box}
            currentUserAddr={this.props.usersAddress}
            useHovers={true}
            // currentUser3BoxProfile={this.props.threeBox}
            adminEthAddr={"0xa1465130f57bC31E517A439db0364270A3513FA0"}
            
          />
         
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.state.handleClose} >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
