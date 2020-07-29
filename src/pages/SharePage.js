import React, { Component } from "react";
import CommentBox from "3box-comments-react";
import {Dropdown,DropdownButton} from 'react-bootstrap'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ReactPlayer from 'react-player/lazy';
import { toast } from 'react-toastify';
import ProfileHover from "profile-hover";
import 'react-toastify/dist/ReactToastify.css';



toast.configure()
export default class SharePage extends Component {
    state={
        show:false,
    };
    async componentDidMount() {
        
        try {
            console.log(this.props)
        const base = "https://dtok.on.fleek.co/#/share/"
        
       const conil= await this.props.space.public.get(this.props.id)
        const shareurl = base + this.props.id
       
        this.setState({ shareUrl: shareurl })
        
        this.setState({content : JSON.parse(conil)})
        console.log(JSON.parse(conil).createdBy)
        console.log(this.state.content.appImage)
        console.log(conil.createdBy)
        this.setState({ show: true })
       
        } 
        catch (error) {
            // console.log(params)
            console.log(await this.props.space.public.get(this.props.id))
        }
      

        }
    render() {
        
      return (
          <>
          <div className="card col-sm-5 col-md-5 shadow mx-5 my-5" >
          {(this.state.show) && (<div >
          <span className="my-3">
          <ProfileHover
                  address={this.state.content.createdBy}
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

            {this.state.content.isImage==="true" &&   (<img className="card-img-top"
              src={this.state.content.appImage}
            />)}

            <div className="card-body">
            <div className="embed-responsive embed-responsive-4by3">
            {this.state.content.isImage==="false"&&(<ReactPlayer url={this.state.content.appImage} controls={true} />)}</div>
              <pre>{this.state.content.description}</pre>




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