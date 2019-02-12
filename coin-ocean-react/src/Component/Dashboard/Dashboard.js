import React, { Component } from "react";
import "./DashboardPage.css";
import {Link} from 'react-router-dom';
import axios from 'axios';

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
    axios.get(process.env.REACT_APP_API_MARKET)
      .then((res) => this.setState({ coin : res.data, coinlist : true}))
      .catch((error) => this.setState({error, coinlist: false}))
  }


  render() {
    let coins = null;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })


    const Dashboard = props => {
      return (
          <div className="coinlist">
            <p className='rank'>{props.rank}</p>
            <Link to={`/coinpage/${props.symbol}`}><p className='name'>{props.name}</p></Link>
            <p className='marketcap'>{props.marketcap}</p>
            <p className='price' style={{color: props.change >= '0' ? "#4dff4d" : "#ff3333"}}>{props.price}</p>
            <p className='change' style={{backgroundColor: props.change >= '0' ? "#00e600" : "#ff3333"}}>{props.change}</p>
            <p className='vol'>{props.vol}</p>
            <p className='supply'>{props.supply}</p>
            <p className="maxsupply">{props.maxsupply}</p>
          </div>
      );
    };

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (this.state.coinlist) {
      coins = (
        <div>
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
                  symbol ={coin.symbol}
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
