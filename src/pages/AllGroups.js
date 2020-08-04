import React, { Component } from "react";
import AppForm from '../components/NewGroupForm';
import { HashLoader } from "react-spinners";
import {NavLink} from 'react-router-dom'
class GroupCard extends Component {
    state={
        followed:false,
       
    }
    async componentDidMount()
    {

        console.log(this.props)
        
       const followed=await this.props.space.public.get(this.props.post.message.name+"follow")
       if(!followed)
       {
        await this.props.space.public.set(this.props.post.message.name+"follow","false")
       }
       if(followed=="true")
       {
           this.setState({followed:true})
       }
       
    }
    render() {

      const followhandle=async()=>{
        await this.props.space.public.set(this.props.post.message.name+"follow",(!this.state.followed).toString())
        this.setState({followed:!this.state.followed})

      }
   
        return (
            <>
                
                <div className="card w-100 my-4 shadow" style={{ width:"75%", borderRadius: "4%", background: "#ffffff" }}>
                
                    {this.props.post.message.account && (
                        
                        <div className="container my-3">
                            {/* <h2>Bootstrap Horizontal Card</h2> */}
                           
                            <div className="card" >
                                <div className="row">
                                   
                                    <div className="col-sm-5">
                                        <img className="card-img float-left" style={{width:"70%"}} src={this.props.post.message.Image} alt="Dtok" />
                                    </div>
                                    <div className="col-sm-7">

                                        <div className="card-body">
                                        {this.state.followed&&<button className="btn btn-warning float-right" onClick={followhandle}>
                                   Unfollow</button>}
                                   {!this.state.followed&&<button className="btn btn-success float-right" onClick={followhandle}>
                                   Follow</button>}

                                            <h5 className="card-title">{this.props.post.message.name}</h5>
                                            <p className="card-text">{this.props.post.message.description}</p>
                                            <NavLink to={"/groups/"+this.props.post.message.name} className="btn btn-dark">Goto➽</NavLink>
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
    state={noposts:false,
    show:false}

    async componentDidMount() {
        const rach = "0xB45De892584c55f07d7377fB02Ee1A49364CbBa1";
        const thread = await this.props.space.joinThread("dtok_groups_list", {
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
          
            {!this.state.show && (
                            
                            <div style={{ width: "60px", margin: "auto" }}>
                                <HashLoader color={"blue"} />
                            </div>
                        )}
            {(this.state.noposts) && (
          
          <h5 className="brand-font" style={{ fontSize: "5rem" }}>Please Create Your First Group!</h5>
         
       )}
            
              {this.state.show&&  (<div className="container" style={{ textAlign: "center" }} >
                    <div className="row" style={{ margin: 'auto' }}>
                        
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
        )}

            </>


        )




    }


}