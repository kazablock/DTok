import React, {Component} from 'react';
import AppForm from '../components/PostForm';
import { HashLoader } from 'react-spinners';

export default class AddApp extends Component {
    state = {
      thread: null
    };
  
    savePost = async formData => {
      formData.account = this.props.accounts[0];
      await this.props.thread.post(formData);
      // this.props.getAppsThread();
    };
    savePost2=async formData=>{
      formData.account = this.props.accounts[0];
      const rach = "0xB45De892584c55f07d7377fB02Ee1A49364CbBa1";
      const thread = await this.props.space.joinThread(this.props.usersAddress, {
        firstModerator: rach,
        members: false
      });
      await thread.post(formData);
    }
    render() {
      return (
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Add your Post!</h1>
          {!this.props.thread && (
            <div style={{ width: "100px", margin: "auto" }}>
              <HashLoader color={"blue"} />
            </div>
          )}
          {this.props.thread && <AppForm savePost={this.savePost}
          savePost2={this.savePost2}
          
          usersAddress={
                 this.props.usersAddress
                } box={this.props.box} space={this.props.space}
                redirecturl={this.props.redirecturl}
                
                />}
        </div>
      );
    }
  }