
import React, { Component } from "react";
import sha256 from 'crypto-js/sha256';
// import {API_KEY} from '../Constants';
// import {API_SECRET} from '../Constants';
import Hex from 'crypto-js/enc-hex';


// import ReactPlayer from 'react-player/lazy';

import fleekStorage from '@fleekhq/fleek-storage-js'

const blankState = { name: "", url: "", appImage: "", description: "" };
export default class AppForm extends Component {
  state = blankState;

  handleChange = event => {
    // console.log(event.target.files[0],event.target.value)
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };
 

  handleChange2 = event => {

    const file = event.target.files[0];

    console.log(event.target.files[0], file.name)
    // console.log(process.env.REACT_APP_API_KEY);
    const reader = new FileReader()
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      console.log(reader.result)
      this.setState({ "selectedFileData": reader.result })
      this.setState({ "selectedFileName": file.name })



    }

  };


  async validateFormFields() {
    console.log("to do - validiate form");
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.validateFormFields();
    try {
      console.log(process.env.API_KEY);
      const uploadedFile = await fleekStorage.upload({
        apiKey: process.env.REACT_APP_API_KEY,
        apiSecret: process.env.REACT_APP_API_SECRET,  
        key: this.props.usersAddress + "/" + this.state.selectedFileName,
        data: this.state.selectedFileData,
      }).then((er) =>{
        this.setState({ "appImage": er.publicUrl });
        const ha=sha256(this.state.description+this.state.appImage).toString(Hex);
        console.log(ha);
        this.setState({"name":ha});


    
    
    } );
      // console.log(uploadedFile)

    } catch (error) {
      console.log(error)
    }
    this.props.savePost({
      name:this.state.name,
      appImage: this.state.appImage,
      description: this.state.description
    });

    this.setState(Object.assign({}, blankState, { submitted: true }));
  };

  render() {
    return (

      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {/* <button onClick={this.test} >kk</button> */}
        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit}>




            <div className="form-group">
              {/* <label htmlFor="exampleFormControlTextarea1">Example textarea</label> */}
              <textarea id="exampleFormControlTextarea1" rows="3" name="description"
                className="form-control"
                aria-describedby="description"
                placeholder="what's on your mind?"
                value={this.state.description}
                onChange={this.handleChange}>

              </textarea>
              <div className="form-group">
                <label htmlFor="uploadFile">Add to your post</label>
                <input type="file" name="uploadFile" accept="image/*,video/*" className="form-control-file" onChange={this.handleChange2} />
              </div>



            </div>

            <input type="submit" value="Post" className="btn btn-primary btn-block" />
          </form>
        )}
        {this.state.submitted && <div className="jumbotron">
          <h1>Thank you for submiting</h1>
          <button className="btn btn-secondary" onClick={() => (this.setState({ submitted: false }))}>Add another application </button>
        </div>}
      </div>
    );
  }
}


