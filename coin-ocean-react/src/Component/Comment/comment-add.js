import * as React from 'react';
import "./comment.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import moment from 'moment'
import { connect } from 'react-redux'
import { addComments_DB } from '../../redux/actions'
import { user_profile, user_uid } from '../../redux/selectors'
import { withRouter } from "react-router-dom";

export class CommentInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            context: '',
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { uid, addComments_DB } = this.props
        addComments_DB(uid, {context : this.state.context, tag : this.props.coin})
        this.Close.click()
    }

    handleChange = (e) => {
        this.setState({
            context: e.target.value
        })
    }

    render() {
        const { profile } = this.props
        return (
            <div className="commentwrite">
                <button type="button" className="btn commentwritebutton" data-toggle="modal" data-target="#exampleModalCenter">
                    <p>Click to write down your comment..........</p>
                </button>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalCenterTitle">{`${profile.displayname}`}</h5>
                                    <h6>{moment(new Date()).format('lll')}</h6>
                                </div>
                                <div className="modal-body">
                                    <textarea name="comments" id="comments" className="commenttextarea" placeholder="write down your comment here" onChange={this.handleChange}></textarea>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" className="btn btn-secondary" data-dismiss="modal" value="Close" ref={input => {this.Close = input}}/>
                                    <input type="submit" className="btn btn-success" value="POST" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(connect((state) => ({ profile: user_profile(state), uid :user_uid(state)}), { addComments_DB })(CommentInput))