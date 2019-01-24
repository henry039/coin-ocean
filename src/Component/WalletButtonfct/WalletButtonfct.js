import React, { Component } from "react";
import WatchList from './Watchlist/Watchlist'
import Invested from './Invested/Invested'
import MyComment from './MyComment/MyComment'
import Trade from './TradeHistory/TradeHistory'
import Setting from './Setting/Setting'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './WalletButtonfct.css'

class WalletButtonfct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WatchList: true,
      Invested: false,
      Trade: false,
      MyComment: false,
      Setting: false,
    };
  }

  buttonwatchClick = () => {
    this.setState({
        WatchList: true,
        Invested: false,
        Trade: false,
        MyComment: false,
        Setting: false,
    });
  };

  buttoninvestClick = () => {
    this.setState({
        WatchList: false,
        Invested: true,
        Trade: false,
        MyComment: false,
        Setting: false,
    });
  };

  buttontradeClick = () => {
    this.setState({
        WatchList: false,
        Invested: false,
        Trade: true,
        MyComment: false,
        Setting: false,
    });
  };

  buttoncommnetClick = () => {
    this.setState({
        WatchList: false,
        Invested: false,
        Trade: false,
        MyComment: true,
        Setting: false,
    });
  };

  buttonsettingClick = () => {
    this.setState({
        WatchList: false,
        Invested: false,
        Trade: false,
        MyComment: false,
        Setting: true,
    });
  };

  render() {
    let info = null;

    if (this.state.WatchList) {
      info = (
        <div>
          <WatchList />
        </div>
      );
    }else if (this.state.Invested) {
      info = (
        <div className="comment">
         <Invested />
        </div>
      );
    }else if (this.state.Trade) {
        info = (
          <div className="comment">
           <Trade />
          </div>
        );
    }else if (this.state.MyComment) {
        info = (
          <div className="comment">
           <MyComment />
          </div>
        );
    }else if (this.state.Setting) {
        info = (
          <div className="comment">
           <Setting />
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