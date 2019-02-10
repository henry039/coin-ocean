import React, { Component } from "react";
import moment from 'moment';
import WatchList from './Watchlist/Watchlist'
import Invested from './Invested/Invested'
import MyComment from './MyComment/MyComment'
import Trade from './TradeHistory/TradeHistory'
import Application from './Application/Application'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './WalletButtonfct.css'
import { 
  trade_history,
  get_coin_name, 
  comments, 
  trade_history_coinsss_cost, 
  wallet_total_coin_earn_lost, 
  wallet_total_coin_earn_lost_percent, 
  formatter, 
  latest_price, 
  trade_history_coin_earn_lost, 
  trade_history_coin_earn_lost_percent, 
  wallet_coins_name,
  wallet_coins_quantity,
  wallet_coins_asset, 
  total_asset,
  user_profile
} from '../../redux/selectors'

export default class WalletButtonfct extends Component {
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
    const { state } = this.props
    if(trade_history(state)[0] !== undefined){
      const history = trade_history(state)
      const commentsss = comments(state)
      const profile = user_profile(state)
      const wallet_coins = wallet_coins_name(state)
      const wallet_coins_on_hold = wallet_coins_quantity(state)
      const totalAsset = total_asset(state)
      const coins_asset = wallet_coins_asset(state)
      const coinsss_cost = trade_history_coinsss_cost(state)
      const coinsss_earnLost = wallet_total_coin_earn_lost(state)
      const coinsss_earnLost_percent = wallet_total_coin_earn_lost_percent(state)
      const today_earn = trade_history_coin_earn_lost(state)
      const today_earn_percent = trade_history_coin_earn_lost_percent(state)
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
              symbol='BTC'
            />
            <WatchList
              rank="rank"
              name="bitcoin"
              marketcap="marketcap"
              price="$4000"
              change="+3.78%"
              keyid="#xrp"
              re_keyid="xrp"
              symbol='XRP'
            />
            <WatchList
              rank="rank"
              name="bitcoin"
              marketcap="marketcap"
              price="$4000"
              change="+3.78%"
              keyid="#eth"
              re_keyid="eth"
              symbol='ETH'
            />
          </div>
        );
      } else if (this.state.Invested) {
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
            {wallet_coins.map((coin_id, index) => {
              return (
                <Invested
                  key={index}
                  // coin="bitcoin"
                  coin={get_coin_name(coin_id)}
                  // symbol="(BTC)"
                  symbol={coin_id}
                  // assets="$34567"
                  assets={formatter.format(coins_asset[index])}
                  // quantity="200"
                  quantity={wallet_coins_on_hold[index]}
                  // price="$567"
                  price={formatter.format(latest_price(state, coin_id))}
                  cost={formatter.format(coinsss_cost[index])}
                  tdyearn={formatter.format(today_earn[index])}
                  tdypercent={`${(today_earn_percent[index]).toFixed(2)}%`}
                  // tdyearn="$567"
                  // tdypercent="4%"
                  totearn={formatter.format(coinsss_earnLost[index])}
                  totpercent={`${(coinsss_earnLost_percent[index]).toFixed(2)}%`}
                  invest={`${(coins_asset[index]/totalAsset * 100).toFixed(2)}%`} />
              )
            })}
          </div>
        );
      } else if (this.state.Trade) {
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
            {history.map((track) => {
              return (
                <Trade
                  // coin="bitcoin"
                  // symbol="(BTC)"
                  // buy="$3000"
                  // buyquantity="200"
                  // sell="---"
                  // sellquantity="---"
                  // value="$60000"
                  // time="2018-1-12:1530"
                  // time={new Date(track.date).toDateString()}
                  time={moment(track.date).format('lll')}
                  coin={get_coin_name(track.action[0])}
                  symbol={track.action[0]}
                  buy={(track.action[1] === 'buy') ? Number(track.action[3]) : '---'}
                  buyquantity={(track.action[1] === 'buy') ? Number(track.action[2]) : '---'}
                  sell={(track.action[1] === 'sell') ? Number(track.action[3]) : '---'}
                  sellquantity={(track.action[1] === 'sell') ? Number(track.action[2]) : '---'}
                  value={track.action[2] * track.action[3]}
                />
              )
            })}
          </div>
        );
      } else if (this.state.MyComment) {
        info = (
          <div className="commentlist">
            {commentsss.map((comment) => {
              return (
                <MyComment comment={comment} profile={profile} />
              )
            })}
          </div>
        );
      } else if (this.state.Application) {
        info = (
          <div className="applist">
            <Application />
          </div>
        );
      }
    }else {
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
              symbol='BTC'
            />
            <WatchList
              rank="rank"
              name="bitcoin"
              marketcap="marketcap"
              price="$4000"
              change="+3.78%"
              keyid="#xrp"
              re_keyid="xrp"
              symbol='XRP'
            />
            <WatchList
              rank="rank"
              name="bitcoin"
              marketcap="marketcap"
              price="$4000"
              change="+3.78%"
              keyid="#eth"
              re_keyid="eth"
              symbol='ETH'
            />
          </div>
        );
      } else if (this.state.Invested) {
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
            <Invested/>
          </div>
        );
      } else if (this.state.Trade) {
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
            <Trade/>
          </div>
        );
      } else if (this.state.MyComment) {
        info = (
          <div className="commentlist">
              <MyComment />
          </div>
        );
      } else if (this.state.Application) {
        info = (
          <div className="applist">
            <Application />
          </div>
        );
      }
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