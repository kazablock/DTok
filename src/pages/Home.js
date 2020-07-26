import React, { Component } from "react";
import ProfileHover from "profile-hover";
import { HashLoader } from "react-spinners";
import Modal from "./../components/Modal";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa";


class AppCard extends Component {
  render(){
    const like=()=>{

    }
    return (                    
    <>
   
      <div className="card col-sm-5 col-md-5 m-2 shadow " sytle={{borderRadius: "25%",background:"#ffffff"}}>
        <div style={{ padding: "20px" }}>
         
          {this.props.post.message.account && (
            <div style={{ marginBottom: "25px" }}>
             
              <ProfileHover
                address={this.props.post.message.account}
                style={{ width: "100%" }}
                showName={true}
              />
            </div>
           
          )}
          <img className="card-img-top"
            
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
          <div className="card-body">
          <p>{this.props.post.message.description}</p>
        
          
          
          <span className="card-title h-100">
           <button className="btn btn-light" onClick={like}> <FaRegHeart color="red"/></button> 
            
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

export default class Home extends Component {
  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          DTok
        </h1>
        <p>The Decentralised Social Network.</p>
        <div className="row" style={{ marginTop: "10%" }}>
          {(!this.props.posts || this.props.posts.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <HashLoader color={"blue"} />
            </div>
          )}
          <div className="container">
            {/* <div className="row"> */}
              {this.props.posts &&
                this.props.posts.map((post, i) => {
                  return (
                      <AppCard 
                        post={post} 
                        key={i}
                        threeBox={this.props.threeBox}
                        space={this.props.space}
                        box={this.props.box}
                        usersAddress={this.props.usersAddress}
                        i={i} />
                  );
                })}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}
