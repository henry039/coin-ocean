import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { connect } from 'react-redux'
import { getCoinComments_DB } from '../../redux/actions'
import moment from 'moment';

export class RecipeReviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentWillMount() {
        this.props.getCoinComments_DB(`${this.props.coin}`)
    }

    render() {
        return (
            <div>
                {this.props.comments.map((comment) => {
                    return (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <div className="combackground" key={Math.random()}>
                                <div className="commentheader">
                                    <img src={comment.photourl} alt="userimg" />
                                    <div>
                                        <h3>{comment.displayname}</h3>
                                        <h6>{moment(comment.date).format('lll')}</h6>
                                    </div>
                                </div>

                                <div className="comcontext">
                                    <p>{`#${comment.tag}`}</p>
                                    <p>{comment.context}</p>
                                </div>

                                {/* <div>
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
                                </div> */}
                            </div>
                        </div>
                    )
                })}
                {/* <div className="combackground" >
                    <div className="commentheader">
                        <img src="" alt="userimg" />
                        <div>
                            <h3>username</h3>
                            <h6>Time</h6>
                        </div>
                    </div>

                    <div className="comcontext">
                        <p>{`#${this.props.coin}`}</p>
                        <p>===============context============ {this.state.comments}</p>
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
                </div> */}
            </div>
        );
    }
}

export default connect((state) => ({ comments: state.comments }), { getCoinComments_DB })(RecipeReviewCard)