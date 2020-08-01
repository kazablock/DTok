import React, { Component } from "react";
import AppForm from '../components/NewGroupForm';
import { HashLoader } from "react-spinners";
import {NavLink} from 'react-router-dom'
class GroupCard extends Component {
    async componentDidMount()
    {

        console.log(this.props)
    }
    render() {
        // const url="/groups/"+this.props.post.message.name
        return (
            <>
                {/* <a href className="btn btn-primary float-right">Goto</a> */}

                {/* <AppForm thread={this.props.thread}      
             
             usersAddress={
                this.props.usersAddress
               }
               /> */}

                <div className="card w-100 my-4 shadow" style={{ borderRadius: "4%", background: "#ffffff" }}>

                    {this.props.post.message.account && (
                        //     <div className="card-title">
                        //         <img className="card-img-top rounded-circle"
                        //     src={
                        //         this.props.post.message.Image
                        //           ? this.props.post.message.Image
                        //           : "https://via.placeholder.com/200"
                        //       }
                        //       />
                        // </div>
                        <div className="container my-3">
                            {/* <h2>Bootstrap Horizontal Card</h2> */}
                            <hr />
                            <div className="card" >
                                <div className="row no-gutters">
                                    <div className="col-sm-5">
                                        <img className="card-img" src={this.props.post.message.Image} alt="Dtok" />
                                    </div>
                                    <div className="col-sm-7">
                                        <div className="card-body">
                                            <h5 className="card-title">{this.props.post.message.name}</h5>
                                            <p className="card-text">{this.props.post.message.description}</p>
                                            <NavLink to={"/groups/"+this.props.post.message.name} className="btn btn-primary">Goto</NavLink>
                                            {/* <a href={"/groups/"+this.props.post.message.name} className="btn btn-primary">Goto</a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>







                    )}



                </div>

            </>


        )

    }

}

export default class Groups extends Component {
    state={noposts:false}

    async componentDidMount() {
        const rach = "0xa1465130f57bC31E517A439db0364270A3513FA0";
        const thread = await this.props.space.joinThread("dtok_groupss_list", {
            firstModerator: rach,
            members: false
        });
        this.setState({ thread }, () => (this.getAppsThread()));
        this.setState({show:true})

    }
    async getAppsThread() {

        if (!this.state.thread) {
            console.error("apps thread not in react state");
            return;
        }

        const posts = await this.state.thread.getPosts();
        if (posts.length<1) {
            this.setState({noposts:true})
          console.error("apps thread not in react state");
          return;
        }
        this.setState({ posts });
        console.log(posts)

        await this.state.thread.onUpdate(async () => {
            const posts = await this.state.thread.getPosts();
            this.setState({ posts });
            console.log(posts)
        })
    }


    render() {

        return (
            <>
            {(this.state.noposts) && (
          
          <h5 className="brand-font" style={{ fontSize: "5rem" }}>Please Create Your First Group!</h5>
         
       )}
            
                <div className="container" style={{ textAlign: "center" }} >
                    <div className="row" style={{ margin: 'auto' }}>
                        {!this.state.show && (
                            
                            <div style={{ width: "60px", margin: "auto" }}>
                                <HashLoader color={"blue"} />
                            </div>
                        )}
                        <div className="container">
                         <AppForm thread={this.state.thread}      
             
             usersAddress={
                this.props.usersAddress
               }
               />
                        </div>
                        <div className="container w-100">
                            {/* <div className="row"> */}
                            {this.state.posts &&

                                this.state.posts.map((post, i) => {
                                    return (
                                        <GroupCard
                                            post={post}
                                            key={i}
                                            thread={this.state.thread}
                                            getAppsThread={this.getAppsThread.bind(this)}
                                            threeBox={this.props.threeBox}
                                            space={this.props.space}
                                            box={this.props.box}
                                            usersAddress={this.props.usersAddress}
                                            i={i} />
                                    );
                                })}
                        </div>
                    </div>
                </div>


            </>


        )




    }


}