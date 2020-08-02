import React, { Component } from "react";
import CommentBox from "3box-comments-react";
import {Dropdown,DropdownButton} from 'react-bootstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactPlayer from 'react-player/lazy';
import { toast } from 'react-toastify';
import ProfileHover from "profile-hover";
import 'react-toastify/dist/ReactToastify.css';

import Like from './../components/Like';

toast.configure()
export default class SharePage extends Component {
    state={
        show:false,
    };
    async componentWillUnmount()
    {
      await this.props.space.unsubscribeThread(this.props.gid)


    }
    async componentDidMount() {
        
        try {
            console.log(this.props)
            let posts=null
            let base=""
            
            if(!this.props.posts)
            {
              const rach = "0xa1465130f57bC31E517A439db0364270A3513FA0";
              const thread = await this.props.space.joinThread(this.props.gid, {
                  firstModerator: rach,
                  members: false
                });
              posts = await thread.getPosts();
              base="https://dtok.on.fleek.co/#/groups"+this.props.gid+"/";
            }else
            {
              base = "https://dtok.on.fleek.co/#/share/"
              posts=this.props.posts

            }
                // this.setState({ thread }, ()=>(this.getAppsThread()));}
        // const base = "https://dtok.on.fleek.co/#/share/"
          posts.map((post,i)=>{
            console.log(post)
          if(post.message.name==this.props.id)
          {
           const shareurl= base + this.props.id
            this.setState({content:post})
            this.setState({ shareUrl: shareurl })
            this.setState({ show: true })
          }
          else{
            console.log(post.message.name)
          }
        

        })

        
    
        
       
        } 
        catch (error) {
            // console.log(params)
            console.log(error)
            console.log(await this.props.space.public.get(this.props.id))
        }
      }
    
    

        
    render() {
        
      return (
          <>
          <div className="card col-sm-5 col-md-5 shadow mx-2 my-5 py-4" style={{ borderRadius: "4%", background: "#ffffff" }} >
          {(this.state.show) && (<div >
          <span className="my-3">
          <ProfileHover
                  address={this.state.content.message.account}
                  style={{ width: "100%" }}
                  showName={true}
                />
          <DropdownButton size="sm" className="float-right my-3"  id="dropdown-item-button" title="More">
  
  
  <CopyToClipboard text={this.state.shareUrl?this.state.shareUrl:""}
          onCopy={() => {
            toast.dark("Link Copied to clipboard!",{position:toast.POSITION.BOTTOM_LEFT})}}>
            <Dropdown.Item as="button">Share</Dropdown.Item>
            
         
        </CopyToClipboard>
  
</DropdownButton>
</span>

            {/* <div style={{ marginBottom: "10px" }}></div> */}

            {this.state.content.message.isImage==="true" &&   (<img className="card-img-top"
              src={this.state.content.message.appImage}
            />)}

            <div className="card-body">
            <div className="embed-responsive embed-responsive-4by3">
            {this.state.content.message.isImage==="false"&&(<ReactPlayer url={this.state.content.message.appImage} controls={true} />)}</div>
              <pre className="text-justify text-center">{this.state.content.message.description}</pre>


             
              <Like 
                  likeid={this.props.id}
                  space={this.props.space}
                  />

              <CommentBox
                spaceName={process.env.REACT_APP_SPACE_NAME}
                threadName={this.props.id}
                box={this.props.box}
                currentUserAddr={this.props.usersAddress}
                useHovers={true}

                adminEthAddr={"0xa1465130f57bC31E517A439db0364270A3513FA0"}
                style={{ width: "100%" }}
              />
            
            </div>


          </div>)}
        </div>
      </>)


    
    
    
    
    
    
    
    
    }
}