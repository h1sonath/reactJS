import React, { Component } from "react";
class GirlImage extends Component {

  render() {
    const comments = this.props.img.comment
      ? this.props.img.comment.map(comment => (
          <p>
            <span className="font-weight-bold">{comment.createdBy.username}</span>:{" "}
            {comment.content}
          </p>
          
        ))
      : "";

    return (
      <div className="girl_image">
        <img
          style={{ width: "100%" }}
          className="img-fluid"
          src={"http://localhost:6969" + this.props.img.imageUrl}
          alt={this.props.img.title}
        />
        <h5>{this.props.img.title}</h5>
        <p>{this.props.img.description}</p>
        
        {comments}
        
      </div>
      
    );
  }
}

export default GirlImage;