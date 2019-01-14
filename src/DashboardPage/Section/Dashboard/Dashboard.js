import React from "react";
import "./Dashboard.css";

const Dashboard = props => {
  return (
      <div className="coinlist">
        <p className='rank'>{props.rank}</p>
        <p className='name'>{props.name}</p>
        <p className='marketcap'>{props.marketcap}</p>
        <p className='price'>{props.price}</p>
        <p className='change'>{props.change}</p>
        <p className='vol'>{props.vol}</p>
        <p className='supply'>{props.supply}</p>
        <p className="maxsupply">{props.maxsupply}</p>
      </div>
  );
};

export default Dashboard;
