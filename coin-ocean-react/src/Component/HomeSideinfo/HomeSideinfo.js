import React, { Component } from "react";
import "../HomeSideinfo/HomeSideinfo.css";
import axios from 'axios';

class HomeSideinfo extends Component {
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
      .then((res) => this.setState({ coin : res.data.slice(0, 10), coinlist : true }))
      .catch((error) => this.setState({error, coinlist : false}))
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
          <div className="hscoinlist" style={{backgroundColor: props.change > '0' ? "rgba(77, 255, 77,0.8)" : "rgba(255, 51, 51, 0.6)"}}>
            <p className='hsname'>{props.name}</p>
            <p className='hsprice'>{props.price}</p>
            <p className='hschange'>{props.change}</p>
          </div>
      );
    };

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (this.state.coinlist) {
      coins = (
        <div>
          <section className="hsDashboard">
          <h6>Real Time Top {this.state.coin.length} Cryptocurrencies List</h6>      
            {this.state.coin.map((coin, index) => {
              return (
                <Dashboard
                  key={coin.id}
                  name={coin.symbol}
                  price={"$" + Math.round((coin.price_usd)*100)/100}
                  change={coin.percent_change_24h + "%"}
                  vol={formatter.format(Math.round(coin["24h_volume_usd"]))}
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

export default HomeSideinfo;
