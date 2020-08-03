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
import Like from '../components/Likee';
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
    // console.log(this.props.postId)
    try {
      if (this.props.postId !== "memberSince" && this.props.postId !== "proof_did" && this.props.postId !== "name"&&this.props.postId!=="isImage"&&this.props.postId!="thread-/orbitdb/zdpuAszmNQXNpkFR14mMV8Fr55CxL5yLXJQhkiTwG7Vm5HTX2/3box.thread.dtok-mainmnnn.application_list") {
        this.setState({ con: JSON.parse(this.props.postcontent) })
        const base="https://dtok.on.fleek.co/#/share/"
        const shareurl=base+this.props.postId
        this.setState({shareUrl:shareurl})
        this.setState({ show: true })
  
      }
    } catch (error) {
      
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



              <span className="card-title h-100">
              <Like 
                  likeid={this.props.postId}
                  space={this.props.space}
                  />
              <CommentBox
                spaceName={process.env.REACT_APP_SPACE_NAME}
                threadName={this.props.postId}
                box={this.props.box}
                currentUserAddr={this.props.usersAddress}
                useHovers={true}

                adminEthAddr={"0xa1465130f57bC31E517A439db0364270A3513FA0"}
                style={{ width: "100%" }}
              />
              </span>
            </div>


          </div>)}
        </div>
      </>)
  }
}

export default class MyProfile extends Component {
  state = {
    hideEdit: false,
    owner:false,
    
    
  }

  async componentDidMount() {
    try {
      const p=await Box.getProfile(this.props.id)
      console.log(p)
      this.setState({pro:p})
     
    if((this.props.id).toLowerCase()===this.props.usersAddress)
    {
      // console.log(this.props.id)
      // console.log(this.props.threeBoxProfile)
      const p = await this.props.space.public.all()
      this.setState({owner:true})
      this.setState({ selfposts: p })
      
    }else{
      // console.log(this.props.usersAddress)
      // console.log(this.props.id)
      this.setState({ selfposts: p })
    }
    
      
    } catch (error) {
     console.log(error) 
    }
    
    
   
  }



  render() {
    return (
      <>
        
        
        {this.state.owner&& ( <div className="container flex" style={{ margin: 'auto' }}>
         <h1 style={{textAlign : "center"}}>Edit your Profile</h1>

            {!this.state.hideEdit && <EditProfile
              box={this.props.box}
              space={this.props.space}
              currentUserAddr={this.props.usersAddress}
              currentUser3BoxProfile={this.props.threeBoxProfile}
              redirectFn={() => (this.setState({ hideEdit: true }))}
            />}
            {this.state.hideEdit && (
              <div>
                
                <button className="btn-rounded float-right" onClick={() => (this.setState({ hideEdit: false }))}>edit</button>

              </div>
            )}
          </div>)}


          

             {this.state.selfposts&&(<div><div className="card mx-auto my-4 shadow" style={{
  backgroundImage: "url(" + this.state.pro.coverPhoto?"https://gateway.temporal.cloud/ipfs/"+this.state.pro.coverPhoto[0].contentUrl['/']:"https://via.placeholder.com/468*60" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
 width:"75%",
  borderRadius: "4%"  }}>
              {/* {this.state.pro.name} */}
              {/* <img className="card-img-top" style={{width:"50%"}} src={"https://gateway.temporal.cloud/ipfs/"+this.state.pro.coverPhoto[0].contentUrl['/']} alt="Card image cap"/> */}
              <div className="container">
              <img className="rounded-circle float-left my-2" style={{width:"25%"}} src={this.state.pro.image?"https://gateway.temporal.cloud/ipfs/"+this.state.pro.image[0].contentUrl['/']:"https://via.placeholder.com/150"} alt="Card image cap"/>

              </div>
              

              <div className="card-body">
              

              </div>
              
              </div>
              <h5 className="card-title">
              {this.state.pro.name}
            </h5>
            <p className="card-text">{this.state.pro.description}</p>
            </div>)
            }
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
