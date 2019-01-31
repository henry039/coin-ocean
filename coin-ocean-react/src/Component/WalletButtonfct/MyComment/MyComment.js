// import React,{Component} from 'react';
import * as React from 'react';
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Reply from "@material-ui/icons/Reply";
import "./comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class MyComment extends React.Component {
    render() {
        const {comment, user} = this.props
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div className="combackground" key={Math.random()}>
                    <div className="commentheader">
                        <img src={user.profile.photourl} alt="userimg" />
                        <div>
                            <h3>{user.profile.displayname}</h3>
                            <h6>{new Date(comment.date).toDateString()}</h6>
                        </div>
                    </div>

                    <div className="comcontext">
                        <p>{`#${comment.tag}`}</p>
                        <p>{comment.context}</p>
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
            </div>
        );
    }
}

export default MyComment;