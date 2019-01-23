import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Reply from '@material-ui/icons/Reply';
import './demo.css';


class RecipeReviewCard extends React.Component {
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

          <div className="commenticons">
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

export default RecipeReviewCard;



