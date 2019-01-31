import React from "react";
import "./indivcoincard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



const Ind = props => {
  return (
    <div>
      <div className="cointitle">
        <h2 className="coinname"><img src={require(`../../picture/color/${props.iconimg}.png`)} alt="coinimg"/>{props.name}</h2>
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

      <button class="btn btn-outline-info" type="button" data-toggle="modal" data-target="#trader">Trade</button>
      
      <div class="modal fade" id="trader" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <form>
            <div class="modal-header">
              <h5 class="modal-title" id="trader">Coin Trading: {props.name}</h5>
            </div>
            <div class="modal-body">
              Price: ${props.price_usd}
              <div>
              <input placeholder="Enter quantity, e.g 10"></input>
              </div>
            </div>
            <div class="modal-footer">   
              <button type="button" class="btn btn-success">Buy</button>         
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger">Sell</button>
            </div>
          </form>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ind;
