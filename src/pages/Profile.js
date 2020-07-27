import EditProfile from "3box-profile-edit-react";
import React, { Component } from "react";
import CommentBox from "3box-comments-react";
// import AppCard from './../components/Appcard'


class AppCard extends Component {
  // async componentDidUpdate(){
  //   this.setState({content:JSON.parse(this.props.post)})
  //   console.log(this.state.content)
  // }
  state = {
    show: false,

  };
  componentWillUnmount() {
    this.props.space.unsubscribeThread(this.props.postId)
  }
  async componentDidMount() {
    if (this.props.postId !== "memberSince" && this.props.postId !== "proof_did" && this.props.postId !== "name") {
      this.setState({ con: JSON.parse(this.props.postcontent) })

      this.setState({ show: true })

    }
  }
  render() {





    return (
      <>

        <div className="card col-sm-5 col-md-5 shadow m-2" sytle={{ borderRadius: "25%", background: "#ffffff" }}>
          {(this.state.show) && (<div style={{ padding: "20px" }}>

            {/* <div style={{ marginBottom: "10px" }}></div> */}

            <img className="card-img-top"
              src={this.state.con.appImage}
            />

            <div className="card-body">
              <p>{this.state.con.description}</p>




              <CommentBox
                spaceName={process.env.REACT_APP_SPACE_NAME}
                threadName={this.props.postId}
                box={this.props.box}
                currentUserAddr={this.props.usersAddress}
                useHovers={true}

                adminEthAddr={"0xa1465130f57bC31E517A439db0364270A3513FA0"}
                style={{ width: "100%" }}
              />
            </div>


          </div>)}
        </div>
      </>)
  }
}

export default class Profile extends Component {
  state = {
    hideEdit: false
  }

  async componentDidMount() {

    const p = await this.props.box.public.all()
    this.setState({ selfposts: p })
    console.log(p)
    // Object.keys(this.state.selfposts).map((post, i) => {


    // )}
    Object.keys(p).map((a, b) => {
      console.log(p[a]);
    })
  }



  render() {
    return (
      <>
        <div className="container">
        
          <div style={{ margin: 'auto' }}>
          <h1 style={{textAlign : "center"}}>Edit your 3Box Profile here 👇</h1>

            {!this.state.hideEdit && <EditProfile
              box={this.props.box}
              space={this.props.space}
              currentUserAddr={this.props.accounts[0]}
              currentUser3BoxProfile={this.props.threeBoxProfile}
              redirectFn={() => (this.setState({ hideEdit: true }))}
            />}
            {this.state.hideEdit && (
              <div>
                <h2>{this.props.threeBoxProfile.name}</h2>
                <img src={this.props.threeBoxProfile.image.contentUrl['/']} />
                <p>{this.props.threeBoxProfile.description}</p>
                <p>{this.props.threeBoxProfile.emoji}</p>
                <button onClick={() => (this.setState({ hideEdit: false }))}>edit</button>

              </div>
            )}
          </div>


          <div className="container-fluid">


          <h1 style={{textAlign : "center",margin: 'auto'}}>My Posts</h1>
            {this.state.selfposts &&
              Object.keys(this.state.selfposts).map((postId, i) => {
                return (

                  <AppCard
                    postcontent={this.state.selfposts[postId]}
                    postId={postId}

                    key={i}

                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.accounts ?
                      this.props.accounts[0] : null
                    }
                    i={i} />
                );
              })}



          </div>
        </div>
      </>);
  }
}
