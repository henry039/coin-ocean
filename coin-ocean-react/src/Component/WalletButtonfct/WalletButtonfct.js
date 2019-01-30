import React, { Component } from "react";
import WatchList from './Watchlist/Watchlist'
import Invested from './Invested/Invested'
import MyComment from './MyComment/MyComment'
import Trade from './TradeHistory/TradeHistory'
import Application from './Application/Application'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './WalletButtonfct.css'
import {cal_coin_assets} from '../../redux/selectors'

class WalletButtonfct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WatchList: true,
      Invested: false,
      Trade: false,
      MyComment: false,
      Application: false,
    };
  }

  buttonwatchClick = () => {
    this.setState({
        WatchList: true,
        Invested: false,
        Trade: false,
        MyComment: false,
        Application: false,
    });
  };

  buttoninvestClick = () => {
    this.setState({
        WatchList: false,
        Invested: true,
        Trade: false,
        MyComment: false,
        Application: false,
    });
  };

  buttontradeClick = () => {
    this.setState({
        WatchList: false,
        Invested: false,
        Trade: true,
        MyComment: false,
        Application: false,
    });
  };

  buttoncommnetClick = () => {
    this.setState({
        WatchList: false,
        Invested: false,
        Trade: false,
        MyComment: true,
        Application: false,
    });
  };

  buttonsettingClick = () => {
    this.setState({
        WatchList: false,
        Invested: false,
        Trade: false,
        MyComment: false,
        Application: true,
    });
  };

  render() {
    let info = null;

    if (this.state.WatchList) {
      info = (
        <div>
          <div className="yeswatchlist">
            <div className="watchlistbar">
                  <p>Rank</p>
                  <p>Name</p>
                  <p>MarketCap</p>
                  <p>Price</p>
                  <p>Change(24h)</p>
            </div>
          </div>
          <WatchList 
          rank="rank"
          name="bitcoin"
          marketcap="marketcap"
          price="$4000"
          change="+3.78%"
          keyid="#btc"
          re_keyid="btc"
          />
          <WatchList 
          rank="rank"
          name="bitcoin"
          marketcap="marketcap"
          price="$4000"
          change="+3.78%"
          keyid="#xrp"
          re_keyid="xrp"
          />
          <WatchList 
          rank="rank"
          name="bitcoin"
          marketcap="marketcap"
          price="$4000"
          change="+3.78%"
          keyid="#eth"
          re_keyid="eth"
          />
        </div>
      );
    }else if (this.state.Invested) {
      info = (
        <div className="investlist">
          <div className="yesinvestlist">
            <div className="listbar">
                  <p>Coin</p>
                  <p>Assets/Quantity</p>
                  <p>Price/Cost</p>
                  <p>Today Earn</p>
                  <p>Total Earn</p>
                  <p>Invest %</p>
            </div>
          </div>
         <Invested 
         coin="bitcoin"
         symbol="(BTC)"
         assets="$34567"
         quantity="200"
         price="$567"
         cost="$345"
         tdyearn="$567"
         tdypercent="4%"
         totearn="$5678"
         totpercent="5%"
         invest="40%"/>
         <Invested 
         coin="bitcoin"
         symbol="(BTC)"
         assets="$34567"
         quantity="200"
         price="$567"
         cost="$345"
         tdyearn="$567"
         tdypercent="4%"
         totearn="$5678"
         totpercent="5%"
         invest="40%"/>
         <Invested 
         coin="bitcoin"
         symbol="(BTC)"
         assets="$34567"
         quantity="200"
         price="$567"
         cost="$345"
         tdyearn="$567"
         tdypercent="4%"
         totearn="$5678"
         totpercent="5%"
         invest="40%"/>
        </div>
      );
    }else if (this.state.Trade) {
        info = (
          <div className="tradelist">
          <div className="yesinvestlist">
            <div className="listbar">
                  <p>Coin</p>
                  <p>Buy/Quantity</p>
                  <p>Sell/Quantity</p>
                  <p>Value</p>
                  <p>Time</p>
            </div>
          </div>
           <Trade 
           coin="bitcoin"
           symbol="(BTC)"
           buy="$3000"
           buyquantity="200"
           sell="---"
           sellquantity="---"
           value="$60000"
           time="2018-1-12:1530"
           />
          </div>
        );
    }else if (this.state.MyComment) {
        info = (
          <div className="commentlist">
           <MyComment />
          </div>
        );
    }else if (this.state.Application) {
        info = (
          <div className="applist">
           <Application />
          </div>
        );
    }

    return (
      <div>
        <div className="profileboard">
          <button className="btn btn-outline-success infoboardbtn" onClick={this.buttonwatchClick}>WatchList</button>
          <button className="btn btn-outline-info infoboardbtn" onClick={this.buttoninvestClick}>Investing</button>
          <button className="btn btn-outline-danger infoboardbtn" onClick={this.buttontradeClick}>TradeHistory</button>
          <button className="btn btn-outline-primary infoboardbtn" onClick={this.buttoncommnetClick}>MyComment</button>
          <button className="btn btn-outline-warning infoboardbtn" onClick={this.buttonsettingClick}>Setting</button>
        </div>
        <div className="putintomiddle">
          {info}
        </div>
      </div>
    );
  }
}

export default WalletButtonfct