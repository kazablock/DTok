import React, { Component } from "react";
import Box from "3box";

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
  
          <div className="card col-sm-5 col-md-5 shadow mx-5" >
            {(this.state.show) && (<div style={{ padding: "20px" }}>
            <DropdownButton size="sm" className="float-right my-3"  id="dropdown-item-button" title="More">
    
    
    <CopyToClipboard text={this.state.shareUrl?this.state.shareUrl:""}
            onCopy={() => {
              toast.dark("Link Copied to clipboard!",{position:toast.POSITION.BOTTOM_LEFT})}}>
              <Dropdown.Item as="button">Share</Dropdown.Item>
              
           
          </CopyToClipboard>
    
  </DropdownButton>
  
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
state={};

    async componentDidMount() {
        const arr=[]
        // const Boxi = await Box.create(window.ethereum)
        // const conil= await Box.openBox("0xa1465130f57bC31E517A439db0364270A3513FA0",window.ethereum)
        const profile=await Box.getProfile("0xa1465130f57bC31E517A439db0364270A3513FA0")
        this.setState({posts:profile})
        Object.keys(profile).map((id,i)=>{
            console.log(profile[id])
            arr.push()

        })
        console.log(profile)



    }
    render() {
        return (
          <>
            
            
              <div className="container flex" style={{ margin: 'auto' }}>
           
    
              </div>
    
    
              
    
    
              <h1 style={{textAlign : "center",margin: 'auto'}}>My Posts</h1>
                {this.state.posts &&
                  Object.keys(this.state.posts).map((postId, i) => {
                    return (
    
                      <AppCard
                        postcontent={this.state.posts[postId]}
                        postId={postId}
    
                        key={i}
    
                        space={this.props.space}
                        box={this.props.box}
                        usersAddress={this.props.accounts ?
                          this.props.accounts[0] : null
                        }
                        i={i} />
                    );
                  })}
    
    
    
              
            
          </>);
      }
    }