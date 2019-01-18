import Comment from './comment'
import CryptoNewsApi from 'crypto-news-api'
import React, { Component } from "react";
import "./NC.css";
import News from './news'

class NC extends Component {
  constructor(props){
    super(props);
    this.state ={
      news: [],
      comment: [],
      newsShow: true,
      commentShow: false
    }
  }

  componentDidMount(){
    const Api = new CryptoNewsApi('40d4452688001be85d8a40dd3fd5de35')
    Api.getTopNewsByCoin('bitcoin')
  .then(articles => {
    this.setState({
      news: articles
    })
    console.log(this.state.news)
  })
  .catch(error => console.error(error))

    // axios.get('https://cryptocontrol.io/api/v1/public/news/coin/bitcoin?key=40d4452688001be85d8a40dd3fd5de35')
    //     .then(response => {
    //         console.log(response.data);
    //         this.setState({
    //           news: response
    //         })
    //     }).catch(() => console.log('Someting going wrong'));
}

  buttonnewsClick = () => {
    this.setState({
      newsShow: true,
      commentShow: false
    })
  }

  buttoncommentClick = () => {
    this.setState({
      newsShow: false,
      commentShow: true
    })
  }

  render() {
    let info  = null;
    if (this.state.newsShow){
      info = (
        <div>
          {this.state.news.map((news, index) => {
            return(
              <News
              key={news._id} 
              image={news.originalImageUrl}
              title={news.title}
              source={news.sourceDomain}
              publishtime={news.publishedAt}
              link={news.url}
              description={news.description}
              />
            )
            })}
        </div>
      )
    }else if(this.state.commentShow){
      info = (
        <div>
          <Comment />
        </div>
      )
    }

    return (
      <div className="infoboard">
        <button onClick={this.buttonnewsClick}>News</button>
        <button onClick={this.buttoncommentClick}>Comment</button>
        {info}
      </div>
    )
  }
}

export default NC;
