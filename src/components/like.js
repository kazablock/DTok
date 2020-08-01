import React, { Component } from "react";
// import { SPACE_NAME } from "../Constants";
import Box from "3box";
import {FaRegHeart} from "react-icons/fa";
import {FaHeart} from "react-icons/fa";
export default class Like extends Component {
  state={
    liketoggle:false
  }
  async componentDidMount()
  {
  // const rach = "0xa1465130f57bC31E517A439db0364270A3513FA0";
  // const thread = await space.joinThread(this.props.name, {
  //   firstModerator: rach,
  //   members: false
  // });
  // this.setState({ thread }, ()=>(this.getAppsThread()));
  // }
  // async getAppsThread() {
   
  //   if (!this.state.thread) {
  //     console.error("apps thread not in react state");
  //     return;
  //   }

  //   const likes = await this.state.thread.getPosts();
  //   this.setState({likes});

  //   await this.state.thread.onUpdate(async()=> {
  //     const likes = await this.state.thread.getPosts({limit:1});
  //     this.setState({likes});
  //   })
  // const id=this.props.likeid+"like"
  // const profile = await Box.getProfile(this.props.address)
  // const likes=profile.id


  }
    render() {
      const likehandle = () => {
        


      }
      return (
        <>
           <button className="btn btn-light" onClick={likehandle}> <FaRegHeart color="red" /></button>
      <p className="font-weight-light">{this.state.likes}</p>


        </>
      );
    }
  }