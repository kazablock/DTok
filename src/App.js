import React, { Component } from "react";
import "./App.css";
import Box from "3box";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navi from "./components/Navi";
import { HashLoader } from "react-spinners";
import Groups from "./pages/AllGroups";
// import NewGroupForm from "./components/NewGroupForm"
import GroupsPage from "./pages/Groups"

import Home from "./pages/Home";
import AddApp from "./pages/AddPost";
import MyProfile from "./pages/MyProfile";
// import Profile from "./pages/Profile";
import SharePage from "./pages/SharePage"
import ChatBox from '3box-chatbox-react';
// import { SPACE_NAME } from "./Constants";

const getThreeBox = async address => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class App extends Component {
  state = {
    needToAWeb3Browser: false,
    
  };
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }

  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      console.log(typeof(this.state.accounts[0]))
      // const acc=this.state.accounts[0]
    
      const threeBoxProfile = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBoxProfile });
    }
    const rach = "0xB45De892584c55f07d7377fB02Ee1A49364CbBa1";
    const box = await Box.openBox(this.state.accounts[0], window.ethereum);
    this.setState({ box });
    const space = await this.state.box.openSpace(process.env.REACT_APP_SPACE_NAME);
    
    this.setState({ space });
    

    const thread = await space.joinThread("dtok_main_page", {
      firstModerator: rach,
      members: false
    });
    this.setState({ thread }, ()=>(this.getAppsThread()));
   
  }
  async getAppsThread() {
    // const rach = "0xB45De892584c55f07d7377fB02Ee1A49364CbBa1";
    // const space=this.state.space
    // const thread = await space.joinThread("application_list", {
    //   firstModerator: rach,
    //   members: false
    // });
    // this.setState({ thread }, ()=>(this.getAppsThread()));
    if (!this.state.thread) {
      console.error("apps thread not in react state");
      return;
    }

    const posts = await this.state.thread.getPosts();
    this.setState({posts});
   

    await this.state.thread.onUpdate(async()=> {
      const posts = await this.state.thread.getPosts();
      this.setState({posts});
    })
  }

  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }


    return (
      <Router>
        <div>
        
        {this.state.accounts &&this.state.box&& (
          <Navi 
          usersAddress={
            this.state.accounts ? this.state.accounts[0] : null
            }
            box={this.state.box}
          />)}
           
          <Switch>
            
            <Route path="/add-post">
              {this.state.accounts && (
                <AddApp
                  usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                  }
                  accounts={this.state.accounts}
                  thread={this.state.thread}
                  box={this.state.box}
                  space={this.state.space}
                  threadMembers={this.state.threadMembers}
                  posts={this.state.posts}
                  threeBoxProfile={this.state.threeBoxProfile}
                  getAppsThread={this.getAppsThread.bind(this)}
                />
              )}
              {!this.state.accounts && <h1>Login with metamask</h1>}
            </Route>
            
            <Route path="/allgroups">
                  {this.state.space &&this.state.accounts&&(
                <Groups
                // getAppsThread={this.getAppsThread.bind(this)}
                // thread={this.state.thread}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                  }
                box={this.state.box}
                space={this.state.space}
                threeBoxProfile={this.state.threeBoxProfile}

                />)}
                {!this.state.space&&(<div style={{ width: "60px", margin: "auto" }}>
            <HashLoader color={"blue"} />
          </div>)}
            </Route>
           
            <Route path='/share/:id' render={({match}) => (
            this.state.posts?
            <div style={{ background: "#f0f2f5",justifyContent:"center",textAlign:"center" }}>
            <SharePage id={match.params.id}
            box={this.state.box}
            space={this.state.space}
            usersAddress={
              this.state.accounts ? this.state.accounts[0] : null
              }
            posts={this.state.posts}
            getAppsThread={this.getAppsThread}
            
            />
            </div>:<div style={{ width: "60px", margin: "auto" }}>
            <HashLoader color={"blue"} />
          </div>)
            }/>


              <Route path='/profile/:address' render={({match}) => (
            this.state.space&&this.state.accounts?
            <div style={{ background: "#f0f2f5",justifyContent:"center",textAlign:"center" }}>
            <MyProfile id={match.params.address}
            box={this.state.box}
            space={this.state.space}
            threeBoxProfile={this.state.threeBoxProfile}
            usersAddress={
              this.state.accounts ? this.state.accounts[0] : null
              }
            
            />
            </div>:<div style={{ width: "60px", margin: "auto" }}>
            <HashLoader color={"blue"} />
          </div>
           )
            }/>
              <Route path="/groups/:gid/:pid?" render={({match}) => (
            this.state.space&&this.state.accounts?match.params.pid?<SharePage box={this.state.box}
            space={this.state.space}
            id={match.params.pid}
            gid ={match.params.gid}
            usersAddress={
              this.state.accounts ? this.state.accounts[0] : null
              }/>:
            <div style={{ background: "#f0f2f5",justifyContent:"center",textAlign:"center" }}>
            <GroupsPage id={match.params.gid}
  
                // posts={this.state.posts}
                accounts={this.state.accounts}
                space={this.state.space}
                box={this.state.box}
                // getAppsThread={this.getAppsThread}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }             
              />
              
              </div>:
         
           
           <div style={{ width: "60px", margin: "auto" }}>
           <HashLoader color={"blue"} />
         </div>)}
         />

          
            <Route path="/" >
              
            <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         background: "#f0f2f5" }}>
              <Home
                posts={this.state.posts}
                space={this.state.space}
                box={this.state.box}
                getAppsThread={this.getAppsThread}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                // noposts={this.state.noposts}

              />
              </div>
            </Route>
           
          </Switch>
        </div>
        {this.state.space&&this.state.accounts&&(<ChatBox
      spaceName={process.env.REACT_APP_SPACE_NAME}
      threadName="dtok_main_chat_thread"
      box={this.state.box}
      ethereum={window.ethereum}
      currentUserAddr={
        this.state.accounts ? this.state.accounts[0] : null
        }
      currentUser3BoxProfile={this.state.threeBoxProfile}
      popupChat={true}
      />)}
      </Router>
    );
  }
}
