
import React, { Component } from "react";
import sha256 from 'crypto-js/sha256';
// import {API_KEY} from '../Constants';
// import {API_SECRET} from '../Constants';
import Hex from 'crypto-js/enc-hex';
import { HashLoader } from "react-spinners";
import {Redirect} from 'react-router-dom'


// import ReactPlayer from 'react-player/lazy';

import fleekStorage from '@fleekhq/fleek-storage-js'

const blankState = { name: "", url: "", appImage: "", description: "", submitting: false,isimage:"false"};
export default class AppForm extends Component {
  state = blankState;

  handleChange = event => {
    // console.log(event.target.files[0],event.target.value)
    console.log(event.target.value)
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  
  handleChange2 = event => {

    const file = event.target.files[0];
    console.log(file.type.split("/").includes("image"))
    
   
    
    console.log(file, file.name)
    // console.log(process.env.REACT_APP_API_KEY);
    const reader = new FileReader()
    console.log(this.state.image)
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      console.log(reader.result)
      if(file.type.split("/").includes("image"))
      {
        console.log("hi")
        this.setState({"isimage":"true"})
      }
      console.log(this.state.isimage)
      this.setState({ "selectedFileData": reader.result })
      this.setState({ "selectedFileName": file.name })



    }

  };


  async validateFormFields() {
    console.log("to do - validiate form");
    console.log(this.state.description)

  }
  test = () => {
   
    // await this.props.box.public.remove("74f6fdbb567cb1befdf8a552a23520b7826568d91c45aed475255d28f1ecca43")  
    // await this.props.box.public.remove("103c3209ee0f2ccb96ea1f3d60689c5d106d546c9bbd264b96a8ce94cd1e973f")
    console.log(this.state.description)
   


   
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    this.validateFormFields();
    try {
      //console.log(process.env.API_KEY);
      const uploadedFile = await fleekStorage.upload({
        apiKey: process.env.REACT_APP_API_KEY,
        apiSecret: process.env.REACT_APP_API_SECRET,
        key: this.props.usersAddress + "/" + this.state.selectedFileName,
        data: this.state.selectedFileData,
      }).then((er) => {
        this.setState({ "appImage": er.publicUrl });
        const ha = sha256(this.state.description + this.state.appImage).toString(Hex);
        console.log(ha);
        this.setState({ "name": ha });


        this.props.savePost({
          name: this.state.name,
          appImage: this.state.appImage,
          description: this.state.description,
          isImage:this.state.isimage
        });



      });
      // console.log(uploadedFile)
      const tempjson = {
        description: this.state.description,
        appImage: this.state.appImage,
        isImage:this.state.isimage

      }
      const tempjson2={
        description: this.state.description,
        appImage: this.state.appImage,
        isImage:this.state.isimage,
        createdBy:this.props.usersAddress

      }
      await this.props.box.public.set(this.state.name, JSON.stringify(tempjson));
      await this.props.space.public.set(this.state.name, JSON.stringify(tempjson2)).then(() => this.setState({ submitting: false }));
    } catch (error) {
      console.log(error)
    }


    this.setState(Object.assign({}, blankState, { submitted: true }));
  };

  render() {
    return (

      <div style={{ maxWidth: "500px", margin: "auto" }}>
         {this.state.submitting && <div style={{ width: "60px", margin: "auto" }}>
          <HashLoader color={"blue"} />
        </div>}
        {/* <button onClick={this.test} >kk</button> */}
        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit}>




            <div className="form-group">
              {/* <label htmlFor="exampleFormControlTextarea1">Example textarea</label> */}
              <textarea  style={{whiteSpace:'pre-wrap'}} id="exampleFormControlTextarea1" rows="3" name="description"
                className="form-control"
                aria-describedby="description"
                placeholder="what's on your mind?"
                value={this.state.description}
                onChange={this.handleChange}>

              </textarea>
              <div className="form-group">
                <label htmlFor="uploadFile">Add Image/Audio/Video to your post</label>
                <input type="file" name="uploadFile" accept="image/*,video/*,audio/*" className="form-control-file" onChange={this.handleChange2} />
              </div>



            </div>

            <input type="submit" value="Post" className="btn btn-primary btn-block" />
          </form>
        )}
        {this.state.submitted &&!this.props.redirecturl&& <Redirect to="/" />}
        
      </div>

    );
  }
}


