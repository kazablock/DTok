import React, { Component } from "react";

import { HashLoader } from "react-spinners";

import AppCard from './../components/AppCard'



export default class Home extends Component {
 
  render() {
    
    return (
     
      <div className="container" style={{ textAlign: "center" }} >
       
        <h1 className="brand-font" style={{ fontSize: "5rem" }}>
          DTok
        </h1>
        <p>The Decentralised Social Network.</p>
        <div className="mx-auto" style={{ margin: 'auto' }}>
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
