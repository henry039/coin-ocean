import Dashboard from './Dashboard/Dashboard'
import Infobar from './infobar/Infobar'
import React, { Component } from 'react';
import './App.css';
import Dacss from './Dashboard/Dashboard.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      coin: [],
      error: null,
      coinlist: true
    }
  }

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=5")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            coin: result,
            coinlist: true
          });
        },

        (error) => {
          this.setState({
            error,
            coinlist: false
          });
        }
      )
  }

  render() {
    let coins = null;
    let dacss = Dacss;

    if (this.state.error){
      return <div>Error: {this.state.error.message}</div>;
    } else if (this.state.coinlist) {
      coins = (
        <div>
          <section className="infobar">
          <Infobar />
          </section>
        <section  className="Dashboard">
        <section className={dacss.coinlist}>
        <p>Rank</p>
        <p>Name</p>
        <p>Marketcap</p>
        <p>Price</p>
        <p>(24h) Change</p>
        <p>(24h) Volume</p>
        <p>Totle Supply</p>
        </section>
          {this.state.coin.map((coin, index) => {
            return <Dashboard
            key={coin.id}
            rank={coin.rank} 
            name={coin.name} 
            marketcap={'$' + coin.market_cap_usd} 
            price={'$' + Math.round(coin.price_usd)} 
            change={coin.percent_change_24h + '%'}
            vol={'$' + Math.round(coin['24h_volume_usd'])}
            supply={Math.round(coin.total_supply) + coin.symbol} /> 
          })}
          </section>
        </div>
      );
    }
    
    return (
      <div className="App">
      {coins}
      </div>
    );
  }
}

export default App;
