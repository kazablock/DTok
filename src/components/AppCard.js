import React, { Component } from "react";
import ProfileHover from "profile-hover";
// import { HashLoader } from "react-spinners";
import Modal from "./../components/Modal";
import Like from "./Likee";
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactPlayer from 'react-player/lazy';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



toast.configure()
export default class AppCard extends Component {
    state = {
      show: false,
  
    };
    async componentDidMount() {
      let base = ""
      console.log(this.props)
      if(this.props.gid)
      {
        base="https://dtok.on.fleek.co/#/"+"groups/"+this.props.gid+"/"
      }
      else{
        base = "https://dtok.on.fleek.co/#/share/"
      }
      // let base = "https://dtok.on.fleek.co/#/share/"
      const shareurl = base + this.props.post.message.name
      this.setState({ shareUrl: shareurl })
      console.log(this.props.post.message.appImage)
    }
    render() {
      
      return (
        <>
  
          <div className="card col-sm-5 col-md-5 my-5 shadow" style={{ borderRadius: "4%", background: "#ffffff" }}>
            <div style={{ padding: "20px" }}>
  
              {this.props.post.message.account && (
                <span className="my-3">
  
                  <ProfileHover
                    address={this.props.post.message.account}
                    style={{ width: "100%" }}
                    showName={true}
                  />
                  <DropdownButton size="sm" className="float-right" id="dropdown-item-button" title="More">
  
  
                    <CopyToClipboard text={this.state.shareUrl}
                      onCopy={() => {
                        toast.dark("Link Copied to clipboard!", { position: toast.POSITION.BOTTOM_LEFT })
                      }}>
                      <Dropdown.Item as="button">Share</Dropdown.Item>
  
  
                    </CopyToClipboard>
  
                  </DropdownButton>
                </span>
  
              )}
              {this.props.post.message.isImage==="true" && (<img className="card-img-top mt-5"
  
                src={
                  this.props.post.message.appImage
                    ? this.props.post.message.appImage
                    : "https://via.placeholder.com/200"
                }
                onError={ev =>
                  (ev.target.src =
                    "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
                }
              />
              )
              }
             
              <div className="card-body">
              
  <div className="embed-responsive embed-responsive-21by9">
              {this.props.post.message.isImage==="false"&&(<ReactPlayer url={this.props.post.message.appImage} controls={true} pip={true} volume={null} stopOnUnmount={false} />)}</div>
                <pre className="text-justify text-center">{this.props.post.message.description}</pre>
  
  
  
                <span className="card-title h-100">
                    
                  <Like address={this.props.post.message.account}
                  likeid={this.props.post.message.name}
                  space={this.props.space}
                  />
                  {/* <button className="btn btn-light" onClick={like}> <FaRegHeart color="red" /></button> */}
  
                  <Modal
                    app={this.props.post.message}
                    threeBox={this.props.threeBox}
                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.usersAddress}
                    acc={this.props.acc}
                  />
                </span>
              </div>
            </div>
          </div>
  
          {(this.props.i + 1) % 3 === 0 && <div className="w-100 rounded-pill"></div>}
  
        </>)
    }
  
  }