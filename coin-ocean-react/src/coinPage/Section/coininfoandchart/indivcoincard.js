import React from "react";
import "./indivcoincard.css";

const Ind = props => {
  return (
    <div>
      <div className="cointitle">
        <h2 className="coinname">(--icon--) {props.name}</h2>
        <p className="coinsymbol">({props.symbol})</p>
      </div>
      <p className="time">Time</p>
      <p className="font-weight">Latest Price:</p>
      <p className="priceusd">{'$' + props.price_usd} {props.change + '%'}</p>
      <p className="pricebtc">{props.price_btc} BTC</p>
      <div className="infoset">
        <p className="font-weight">MarketCap :</p>
        <p>{'$' + props.marketcap}</p>
      </div>
      <div className="infoset">
        <p className="font-weight">(24h)Volume :</p>
        <p> {'$' + props.volume} </p>
      </div>
      <div className="infoset">
        <p className="font-weight">Current Supply :</p>
        <p> {props.total}{props.symbol}</p>
      </div>
      <div className="infoset">
        <p className="font-weight">Total Supply :</p>
        <p>{props.max}{props.symbol}</p>
      </div>
    </div>
  );
};

export default Ind;
