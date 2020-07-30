import EditProfile from "3box-profile-edit-react";
import React, { Component } from "react";
import ProfileHover from "profile-hover";
import CommentBox from "3box-comments-react";
import {Dropdown,DropdownButton} from 'react-bootstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactPlayer from 'react-player/lazy';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from "3box";
import { HashLoader } from 'react-spinners';
// import AppCard from './../components/Appcard'

toast.configure()
class AppCard extends Component {
  // async componentDidUpdate(){
  //   this.setState({content:JSON.parse(this.props.post)})
  //   console.log(this.state.content)
  // }
  state = {
    show: false,

  };
  componentWillUnmount() {
    this.props.space.unsubscribeThread(this.props.postId)
  }
  async componentDidMount() {
    if (this.props.postId !== "memberSince" && this.props.postId !== "proof_did" && this.props.postId !== "name"&&this.props.postId!=="isImage") {
      this.setState({ con: JSON.parse(this.props.postcontent) })
      const base="https://dtok.on.fleek.co/#/share/"
      const shareurl=base+this.props.postId
      this.setState({shareUrl:shareurl})
      this.setState({ show: true })

    }
  }
  render() {





    return (
      <>
        
        <div className="card col-sm-5 col-md-5 my-5 shadow" style={{ borderRadius: "4%", background: "#ffffff" }} >
          {(this.state.show) && (<div style={{ padding: "20px" }}>
          <span className="my-3">

<ProfileHover
  address={this.props.owner==="true"?this.props.usersAddress:this.props.id}
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

            {this.state.con.isImage==="true" &&   (<img className="card-img-top"
              src={this.state.con.appImage}
            />)}

            <div className="card-body">
            <div className="embed-responsive embed-responsive-4by3">
            {this.state.con.isImage==="false"&&(<ReactPlayer url={this.state.con.appImage} controls={true} />)}</div>
              <pre className="text-justify text-center">{this.state.con.description}</pre>




              <CommentBox
                spaceName={process.env.REACT_APP_SPACE_NAME}
                threadName={this.props.postId}
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

export default class MyProfile extends Component {
  state = {
    hideEdit: false,
    owner:false
  }

  async componentDidMount() {
    
    if((this.props.id).toLowerCase()===this.props.usersAddress)
    {
      console.log(this.props.id)
      const p = await this.props.space.public.all()
      this.setState({owner:true})
      this.setState({ selfposts: p })
      
    }else{
      console.log(this.props.usersAddress)
      console.log(this.props.id)
      
      const p=await Box.getProfile(this.props.id)
      this.setState({ selfposts: p })
    }
    
    
    // Object.keys(this.state.selfposts).map((post, i) => {


    // )}
    // Object.keys(p).map((a, b) => {
    //   console.log(p[a]);
    // })
  }



  render() {
    return (
      <>
        
        
        {this.state.owner&& ( <div className="container flex" style={{ margin: 'auto' }}>
         <h1 style={{textAlign : "center"}}>Edit your 3Box Profile</h1>

            {!this.state.hideEdit && <EditProfile
              box={this.props.box}
              space={this.props.space}
              currentUserAddr={this.props.usersAddress}
              currentUser3BoxProfile={this.props.threeBoxProfile}
              redirectFn={() => (this.setState({ hideEdit: true }))}
            />}
            {this.state.hideEdit && (
              <div>
                <h2>{this.props.threeBoxProfile.name}</h2>
                <img src={this.props.threeBoxProfile.image.contentUrl['/']} />
                <p>{this.props.threeBoxProfile.description}</p>
                <p>{this.props.threeBoxProfile.emoji}</p>
                <button onClick={() => (this.setState({ hideEdit: false }))}>edit</button>

              </div>
            )}
          </div>)}


          


          <h1 style={{textAlign : "center",margin: 'auto'}}>My Posts</h1>
          <div className="container">
            {this.state.selfposts &&
              Object.keys(this.state.selfposts).map((postId, i) => {
                return (

                  <AppCard
                    postcontent={this.state.selfposts[postId]}
                    postId={postId}

                    key={i}

                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.usersAddress
                    }
                    owner={(this.state.owner).toString()}
                    id={this.props.id}

                    i={i} />
                );
              })}
              </div>


             {!this.state.selfposts&& (
             <div style={{ width: "60px", margin: "auto" }}>
            <HashLoader color={"blue"} />
          </div>)
          }
          
        
      </>);
  }
}
