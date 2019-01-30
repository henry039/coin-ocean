import React from "react";
import CardActions from "@material-ui/core/CardActions";
// import Form from 'react-router-form'
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Reply from "@material-ui/icons/Reply";
import "./comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export class RecipeReviewCard extends React.Component {

  // state = {
  //   open: false,
  // };

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };
  
  // madalout() {
    
  // }

  render() {
    return (
      <div className="combackground">
        <div className="commentheader">
          <img src="" alt="userimg" />
          <div>
            <h3>username</h3>
            <h6>Time</h6>
          </div>
        </div>

        <div className="comcontext">
          <p>#BTC</p>
          <p>===============context============</p>
        </div>

        <div>
          <CardActions className="actions felxtoright" disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>

            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>

            <IconButton aria-label="Reply">
              <Reply />
            </IconButton>
          </CardActions>
        </div>
      </div>
    );
  }
}


export class CommentInput extends React.Component {
  // handleAddPost= (nextState, replaceState) => {
  //   console.log(nextState.location.state.method) // 'POST'
  //   console.log(nextState.location.state.body) // {comment: '...'}
  // }

  render() {
    return (
      <div className="commentwrite">
        <button type="button" className="btn commentwritebutton" data-toggle="modal" data-target="#exampleModalCenter">
          <p>Click to write down your comment..........</p>
        </button>
          {/* <Form to={"/coinpage/:id"} method="POST">
            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">==========Users_name=======</h5>        
                    <h6>==========Time:=======</h6>
                  </div>
                  <div className="modal-body">
                  <textarea name="comments" id="comments" className="commenttextarea" placeholder="write down your comment here"></textarea>
                  </div>
                  <div className="modal-footer">
                    <input type="button" className="btn btn-secondary" data-dismiss="modal" value="Close" />
                    <input type="submit" className="btn btn-success" value="POST" onClick={this.handleAddPost}/>
                  </div>
                </div>
              </div>
            </div>
          </Form> */}
      </div>
    );
  }
}


