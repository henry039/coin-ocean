import Dashboard from './Dashboard/Dashboard'
import React, { Component } from 'react';
import './App.css';

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
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=10")
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
    
    if (this.state.error){
      return <div>Error: {this.state.error.message}</div>;
    } else if (this.state.coinlist) {
      coins = (
        <div className="Dashboard">
          {this.state.coin.map((coin, index) => {
            return <Dashboard
            rank={coin.rank} 
            name={coin.name} 
            marketcap={'$' + coin.market_cap_usd} 
            price={'$' + coin.price_usd} 
            change={coin.percent_change_24h + '%'}
            vol={'$' + coin['24h_volume_usd']}
            supply={coin.total_supply} /> 
          })}
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
