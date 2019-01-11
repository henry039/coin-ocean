import React from "react";
import "./Dashboard.css";

const Dashboard = props => {
  return (
      <div className="coinlist">
        <p>{props.rank}</p>
        <p>{props.name}</p>
        <p>{props.marketcap}</p>
        <p>{props.price}</p>
        <p>{props.change}</p>
        <p>{props.vol}</p>
        <p>{props.supply}</p>
      </div>
  );
};

export default Dashboard;
