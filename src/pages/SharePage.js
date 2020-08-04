import React, { Component } from "react";
import AppCard from './../components/AppCard'

export default class SharePage extends Component {
    state={
        show:false,
    };
    async componentWillUnmount()
    {
      await this.props.space.unsubscribeThread(this.props.gid)


    }
    async componentDidMount() {
        
        try {
            console.log(this.props)
            let posts=null
            let base=""
            
            if(!this.props.posts)
            {
              const rach = "0xB45De892584c55f07d7377fB02Ee1A49364CbBa1";
              const thread = await this.props.space.joinThread(this.props.gid, {
                  firstModerator: rach,
                  members: false
                });
              posts = await thread.getPosts();
              // base="https://dtok.on.fleek.co/#/groups"+this.props.gid+"/";
            }else
            {
              // base = "https://dtok.on.fleek.co/#/share/"
              posts=this.props.posts

            }
                // this.setState({ thread }, ()=>(this.getAppsThread()));}
        // const base = "https://dtok.on.fleek.co/#/share/"
          posts.map((post,i)=>{
            console.log(post)
          if(post.message.name==this.props.id)
          {
          //  const shareurl= base + this.props.id
            this.setState({content:post})
            // this.setState({ shareUrl: shareurl })
            this.setState({ show: true })
          }
          else{
            console.log(post.message.name)
          }
       

        })

        
    
        
       
        } 
        catch (error) {
            // console.log(params)
            console.log(error)
            // console.log(await this.props.space.public.get(this.props.id))
        }
      }
    
    

        
    render() {
        
      return (
          <>
        

{this.state.show&&(<AppCard
                  post={this.state.content}
                
                  // threeBox={this.props.threeBox}
                  gid={this.props.gid}
                  space={this.props.space}
                  box={this.props.box}
                  usersAddress={this.props.usersAddress}
                   />)}



      </>)


    
    
    
    
    
    
    
    
    }
}