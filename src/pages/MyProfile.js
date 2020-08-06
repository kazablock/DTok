import EditProfile from "3box-profile-edit-react";
import React, { Component } from "react";

import 'react-toastify/dist/ReactToastify.css';
import Box from "3box";
import { HashLoader } from 'react-spinners';

import AppCard from '../components/AppCard';


export default class MyProfile extends Component {
  state = {
    hideEdit: false,
    owner:false,
    show:false
    
    
  }

  async componentDidMount() {
    try {
      if((this.props.id).toLowerCase()===this.props.usersAddress)
      {
        
        this.setState({owner:true})
        
        
      }
      const p=await Box.getProfile(this.props.id)
      const rach = "0xB45De892584c55f07d7377fB02Ee1A49364CbBa1";
      const thread = await this.props.space.joinThread(this.props.id, {
        firstModerator: rach,
        members: false
      });
      console.log(p)
      this.setState({pro:p})
      this.setState({ thread }, ()=>(this.getAppsThread()));
      this.setState({show:true})
      
     
   
      // console.log(this.props.usersAddress)
      // console.log(this.props.id)
      
    
    
      
    } catch (error) {
     console.log(error) 
    }
    
    
   
  }
  async getAppsThread() {

    if (!this.state.thread) {
      console.error("apps thread not in react state");
      return;
    }

    const selfposts = await this.state.thread.getPosts();
    console.log(selfposts)
    this.setState({ selfposts })
   
   
    await this.state.thread.onUpdate(async()=> {
      const selfposts = await this.state.thread.getPosts();
      this.setState({ selfposts })
    })
  }



  render() {
    return (
      <>
        
        
        {this.state.owner&&this.state.show&& ( <div className="container flex" style={{ margin: 'auto' }}>
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


          

             {this.state.selfposts&&this.state.show&&(<div><div className="card mx-auto my-4 shadow" style={{
  // backgroundImage: "url(" + this.state.pro.coverPhoto?"https://gateway.temporal.cloud/ipfs/"+this.state.pro.coverPhoto[0].contentUrl['/']:"https://via.placeholder.com/468*60" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
 width:"75%",
  borderRadius: "4%"  }}>
              {/* {this.state.pro.name} */}
              {/* <img className="card-img-top" style={{width:"50%"}} src={"https://gateway.temporal.cloud/ipfs/"+this.state.pro.coverPhoto[0].contentUrl['/']} alt="Card image cap"/> */}
              <div className="container">
              <img className="float-left my-2" style={{height:"50%",width:"50%"}} src={this.state.pro.image?"https://gateway.temporal.cloud/ipfs/"+this.state.pro.image[0].contentUrl['/']:"https://via.placeholder.com/150"} alt="Card image cap"/>

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
            {this.state.selfposts &&this.state.show&&
              this.state.selfposts.map((post, i) => {
                return (

                  <AppCard
                  post={post}
                  key={i}
                  // threeBox={this.props.threeBox}
                  space={this.props.space}
                  box={this.props.box}
                  usersAddress={this.props.usersAddress}
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
