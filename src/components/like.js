import React, { Component } from "react";

import {FaRegHeart} from "react-icons/fa";

import {FaHeart} from "react-icons/fa";
export default class Like extends Component {
  state={
    liked:false
  }
  async componentDidMount()
  {
  

    const l=await this.props.space.public.get(this.props.likeid+"like")
    if(!l)
    {
      await this.props.space.public.set(this.props.likeid+"like","false")

    }
    if(l=="true")
    {
      this.setState({liked:true})
    }
    this.setState({show:true})
  }
    render() {
      const likehandle = async () => {
        
        await this.props.space.public.set(this.props.likeid+"like",(!this.state.liked).toString())
        this.setState({liked:!this.state.liked})


      }
      return (
        <>
          {this.state.show&&!this.state.liked&&(<button className="btn btn-light" onClick={likehandle}> <FaRegHeart color="red" /></button>) }
          {this.state.show&&this.state.liked&&(<button className="btn btn-light" onClick={likehandle}> <FaHeart color="red" /></button>)}
      {/* // <p className="font-weight-light">{this.state.likes}</p> */}
        

         

        </>
      );
    }
  }