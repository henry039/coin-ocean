import React from "react";
import "./news.css";

const news = props => {
    
  return (
      <div className="movetocenter">
        <section className="gettingflex">
            <div>
            <img src={props.image} alt="news" />
            </div>
            <div className="newscontext">
                <h6>{props.publishtime}</h6>
                <h3>{props.title}</h3>
                <h4>{props.description}</h4>
                <h5>( sources: {props.source})<button><a href={props.link}>Learn more</a></button></h5>
            </div>
        </section>
    </div>
  );
};

export default news;
