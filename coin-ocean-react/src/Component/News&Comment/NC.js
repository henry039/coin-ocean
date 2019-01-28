import {RecipeReviewCard, CommentInput} from "../Comment/comment";
import CryptoNewsApi from "crypto-news-api";
import React, { Component } from "react";
import "./NC.css";
import News from "../News/news";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { withRouter } from 'react-router-dom';

class NC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      comment: [],
      newsShow: true,
      commentShow: false,
      info : [],
      pageid2 : `${this.props.match.params.id}`
    };
  }

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100")
        .then(res => res.json())
        .then(
            result => {
            this.setState({
                info: result.filter(e => {return e.symbol === this.state.pageid2.toUpperCase()}),
            });
            
            let getname = this.state.info[0].id.toString()
            const Api = new CryptoNewsApi("40d4452688001be85d8a40dd3fd5de35");
            Api.getTopNewsByCoin(getname)
              .then(articles => {
                this.setState({
                  news: articles
                });
                console.log(this.state.news);
              })
              .catch(error => console.error(error));
          
            },
            error => {
            this.setState({
                error
            });
            }
        );

      
  }


  buttonnewsClick = () => {
    this.setState({
      newsShow: true,
      commentShow: false
    });
  };

  buttoncommentClick = () => {
    this.setState({
      newsShow: false,
      commentShow: true
    });
  };

  render() {
    let info = null;
    if (this.state.newsShow) {
      info = (
        <div>
          {this.state.news.map((news, index) => {
            return (
              <News
                key={news._id}
                image={news.originalImageUrl}
                title={news.title}
                source={news.sourceDomain}
                publishtime={news.publishedAt}
                link={news.url}
                description={news.description}
              />
            );
          })}
        </div>
      );
    } else if (this.state.commentShow) {
      info = (
        <div className="comment">
          <CommentInput />
          <div className="flextocenter">
            <RecipeReviewCard />
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="infoboard">
          <button className="btn btn-outline-warning infoboardbtn" onClick={this.buttonnewsClick}>News</button>
          <button className="btn btn-outline-warning infoboardbtn" onClick={this.buttoncommentClick}>Comment</button>
        </div>
      {info}
      </div>
    );
  }
}

export default withRouter(NC);
