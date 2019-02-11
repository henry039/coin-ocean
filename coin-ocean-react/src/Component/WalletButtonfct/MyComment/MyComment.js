import * as React from 'react';
import moment from 'moment';
import "./mycomment.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class MyComment extends React.Component {
    render() {
        if(this.props.comment !== undefined){
            const {comment, profile} = this.props
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div className="combackground" key={Math.random()}>
                        <div className="commentheader">
                            <img src={profile.photourl} alt="userimg" />
                            <div>
                                <h3>{profile.displayname}</h3>
                                <h6>{moment(comment.date).format('llll')}</h6>
                            </div>
                        </div>
    
                        <div className="comcontext">
                            <p>{`#${comment.tag}`}</p>
                            <p>{comment.context}</p>
                        </div>
                    </div>
                </div>
            );
        }else {
            return (
                <div className="noliststate">
                    <div className="nolist">
                        <h3>You have not leave any comment yet!</h3>
                    </div>
                    <small><a href='/'>Learn more</a></small>
                </div>
            )
        }
    }
}

export default MyComment;