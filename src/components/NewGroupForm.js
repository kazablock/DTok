import React, { Component } from "react";
import { HashLoader } from "react-spinners";
import {Redirect} from 'react-router-dom';
import fleekStorage from '@fleekhq/fleek-storage-js';


export default class NewGroupForm extends Component {

    state={}
    savePost = async formData => {
        formData.account = this.props.usersAddress;
        await this.props.thread.post(formData);
        // this.props.getAppsThread();
      };

    handleChange = event => {
        // console.log(event.target.files[0],event.target.value)
        console.log(event.target.value)
        this.setState(Object.assign({ [event.target.name]: event.target.value }));
      };
    
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ submitting: true });
        try {
            //console.log(process.env.API_KEY);
            const uploadedFile = await fleekStorage.upload({
              apiKey: process.env.REACT_APP_API_KEY,
              apiSecret: process.env.REACT_APP_API_SECRET,
              key: this.props.usersAddress + "/" + this.state.selectedFileName,
              data: this.state.selectedFileData,
            }).then((er) => {
                this.setState({ "appImage": er.publicUrl })})
        
        this.savePost({
            name: this.state.groupname,
            Image: this.state.appImage,
            description: this.state.description,
            
          });

          this.setState( { submitted: true });
          this.setState( { submitting: false });
        }
        catch{

        }
    }

    handleChange2 = event => {

        const file = event.target.files[0];
        console.log(file.type.split("/").includes("image"))
        
       
        
        console.log(file, file.name)
        // console.log(process.env.REACT_APP_API_KEY);
        const reader = new FileReader()
        // console.log(this.state.image)
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          console.log(reader.result)
          
          
          this.setState({ "selectedFileData": reader.result })
          this.setState({ "selectedFileName": file.name })
    
    
    
        }
    
    }

    render()
    {

        return(
            <>

            <div className="container">
          {/* <h1 style={{ textAlign: "center" }}>Create your Group</h1> */}
                <div style={{ maxWidth: "500px", margin: "auto" }}>
         {this.state.submitting && <div style={{ width: "60px", margin: "auto" }}>
          <HashLoader color={"blue"} />
        </div>}
        {/* <button onClick={this.test} >kk</button> */}
        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit}>

        <div className="form-group">
            {/* <label htmlFor="exampleFormControlInput1">Name of the group</label> */}
            <input type="text" className="form-control" id="exampleFormControlInput1" name="groupname" placeholder="Name of the group" onChange={this.handleChange}/>
        </div>


            <div className="form-group">
              
              <textarea  style={{whiteSpace:'pre-wrap'}} id="exampleFormControlTextarea1" rows="3" name="description"
                className="form-control"
                aria-describedby="description"
                placeholder="Awesome group description"
                value={this.state.description}
                onChange={this.handleChange}>

              </textarea>
              <div className="form-group">
                <label htmlFor="uploadFile">Add Group Logo</label>
                <input type="file" name="uploadFile" accept="image/*" className="form-control-file" onChange={this.handleChange2} />
              </div>



            </div>

            <input type="submit" value="Create Group" className="btn btn-primary btn-block" />
          </form>
        )}
        </div>
        {this.state.submitted && <Redirect to="/allgroups" />}
        
      </div>


            </>



        )



        
    }



}