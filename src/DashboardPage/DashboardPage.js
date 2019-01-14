import Dashboard from "./Section/Dashboard/Dashboard";
import Infobar from "./Section/infobar/Infobar";
import React, { Component } from "react";
import Title from "./Section/titlebar/Titlebar";
import "./DashboardPage.css";

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      coin: [],
      error: null,
      coinlist: true
    };
  }

  componentDidMount() {
    fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=15")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            coin: result,
            coinlist: true
          });
        },

        error => {
          this.setState({
            error,
            coinlist: false
          });
        }
      );
  }


  render() {
    let coins = null;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (this.state.coinlist) {
      coins = (
        <div>
          <section className="titlebar">
          <Title />
          </section>
          <section className="infobar">
            <Infobar />
          </section>
          <section className="Dashboard">
          <h1>Real Time Top {this.state.coin.length} Cryptocurrencies List</h1>
            <section className="apptitle">
              <p className="apprank">Rank</p>
              <p className="appname">Name</p>
              <p className="appmarketcap">Marketcap</p>
              <p className="appprice">Price</p>
              <p className="appchange">(24h) Change</p>
              <p className="appvol">(24h) Volume</p>
              <p className="appsupply">Current Supply</p>
              <p className="appmaxsupply">Max Supply</p>
            </section>

          
            {this.state.coin.map((coin, index) => {
              return (
                <Dashboard
                  key={coin.id}
                  rank={coin.rank}
                  name={coin.name}
                  marketcap={formatter.format(Math.round(coin.market_cap_usd))}
                  price={"$" + Math.round((coin.price_usd)*100)/100}
                  change={coin.percent_change_24h + "%"}
                  vol={formatter.format(Math.round(coin["24h_volume_usd"]))}
                  supply={Math.round(coin.total_supply) + coin.symbol}
                  maxsupply={Math.round(coin.max_supply) + coin.symbol}
                />
              );
            })}
            
          </section>
        </div>
      );
    }

    return <div className="App">
    {coins}
    </div>;
  }
}

export default DashboardPage;
