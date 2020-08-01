import React, { Component } from "react";
import AppCard from './../components/AppCard';
import { HashLoader } from "react-spinners";
import AddPost from './AddPost'


export default class GroupsPage extends Component {
    state={noposts:false,show:false
    }

   async componentWillUnmount(){
        await this.props.space.unsubscribeThread(this.props.id)
      }
    async componentDidMount(){
        const rach = "0xa1465130f57bC31E517A439db0364270A3513FA0";
        const thread = await this.props.space.joinThread(this.props.id, {
            firstModerator: rach,
            members: false
          });
          this.setState({ thread }, ()=>(this.getAppsThread()));
          this.setState({show:true})
        }
    async getAppsThread() {
          // const rach = "0xa1465130f57bC31E517A439db0364270A3513FA0";
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
          if (posts.length<1) {
              this.setState({noposts:true})
            console.error("apps thread not in react state");
            return;
          }
          this.setState({posts});
      
          await this.state.thread.onUpdate(async()=> {
            const posts = await this.state.thread.getPosts();
            this.setState({posts});
          })
        

    }

    render(){
        return(
            <>

<div className="container" style={{ textAlign: "center" }} >
       
       {/* <h1 className="brand-font" style={{ fontSize: "5rem" }}> */}
       {(this.state.noposts) && (
          
            <h4 className="brand-font" style={{ fontSize: "5rem" }}>Please Add first Post!</h4>
           
         )}
       {/* </h1> */}
       {/* <p>The Decentralised Social Network.</p> */}
       <div className="container text-center">
       
       </div>
      
       <div className="row" style={{ margin: 'auto' }}>
         {(!this.state.show ) && (
           <div style={{ width: "60px", margin: "auto" }}>
             <HashLoader color={"blue"} />
           </div>
         )}
          <div className="container">
                      <AddPost
                        accounts={this.props.accounts}
                        usersAddress={this.props.usersAddress}
                        thread={this.state.thread}
                        box={this.props.box}
                        space={this.props.space}
                        posts={this.state.posts}
                       
                        getAppsThread={this.getAppsThread.bind(this)}
                        redirecturl={this.props.id}
                        
                        
                        />
                        </div>
         <div className="container">
           {/* <div className="row"> */}
           {this.state.posts &&
             this.state.posts.map((post, i) => {
               return (
                 <AppCard
                   post={post}
                   key={i}
                   gid={this.props.id}
                //    threeBox={this.props.threeBox}
                   space={this.props.space}
                   box={this.props.box}
                   usersAddress={this.props.usersAddress}
                   i={i} />
               );
             })}
           {/* </div> */}
         </div>
       </div>
     </div>
   

            </>



        )


    }




}