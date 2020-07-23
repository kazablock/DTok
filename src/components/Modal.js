import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";
import CommentBox from "3box-comments-react";
import { SPACE_NAME } from "../Constants";
import Like from "./Like";
import ChatBox from '3box-chatbox-react';
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
            <Modal.Title>{this.props.app.name}</Modal.Title>
            
          </Modal.Header>
          <img
            style={{
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px"
            }}
            src={
              this.props.app.appImage
                ? this.props.app.appImage
                : "https://via.placeholder.com/200"
            }
            onError={ev =>
              (ev.target.src =
                "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
            }
          />
          <Modal.Body>{this.props.app.description}
          <div>
          <CommentBox
            spaceName={SPACE_NAME}
            threadName={this.props.app.name}
            box={this.props.box}
            currentUserAddr={this.props.usersAddress}
            // currentUser3BoxProfile={this.props.threeBox}
            adminEthAddr={"0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386"}
            
          />
           <ChatBox
              spaceName="demochat"
              threadName="testthread"
              box={this.props.box}
              ethereum={window.ethereum}
              currentUserAddr={this.props.acc}
              currentUser3BoxProfile={this.props.threeBoxProfile}
              popupChat={true}
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
