import React, { Component } from "react";
import axios from "axios";

import NavBar from "../components/NavBar";
import GirlImage from "../components/GirlImage";
import Comment from "../components/Comment";
class DetailScreen extends Component {
  state = {
    comment: "",
    imageId: this.props.match.params.imageId



  };
  onCommentChanged = text => this.setState({ comment: text });
  componentDidMount() {



    axios
      .get(`http://localhost:6969/api/images/${this.props.match.params.imageId}`)
      .then(data => {
        this.setState({
          image: data.data

        });
        console.log(data.data);
      })
      .catch(err => console.error(err));


  }


  render() {


    return (
      <div>
        <NavBar
          onSearchChanged={this._onSearchChanged}
          username={this.props.username}
          onLogin={this.props.onLogin}
        />
        <div className="main_content container">
          <div className="row">
            <div className="col-8 mr-auto ml-auto">
              {this.state.image ? <GirlImage img={this.state.image} /> : ""}
              <Comment username={this.props.username}
                userId = {this.props.userId}
                onLogin={this.props.onLogin}
                onCommentChanged={this.onCommentChanged}
                imageId={this.state.imageId}
                comment={this.state.comment} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailScreen;