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
    render() {
      return (
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Add your Post!</h1>
          {!this.props.thread && (
            <div style={{ width: "100px", margin: "auto" }}>
              <HashLoader color={"blue"} />
            </div>
          )}
          {this.props.thread && <AppForm savePost={this.savePost} usersAddress={
                 this.props.usersAddress
                } box={this.props.box} space={this.props.space}
                redirecturl={this.props.redirecturl}
                
                />}
        </div>
      );
    }
  }