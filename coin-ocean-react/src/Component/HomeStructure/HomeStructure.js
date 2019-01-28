import React, { Component } from "react";
import HomeSideinfo from "../HomeSideinfo/HomeSideinfo"
// import HM from '../HourMin_Chart/HM'
import './HomeStructure.css'
import homeimg1 from '../../picture/homepage1.png'
import homeimg2 from '../../picture/homepage2.png'
import homeimg3 from '../../picture/homepage3.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class HomeStructure extends Component {

    
  render() {
    return (
       <div className="flexalltofit">
            <div className="hssidecontainer" >
               <HomeSideinfo />
               <button className=" btn routingtolist " href="/">Cryptocurrencies List</button>
               <div className="hsabout">
               <h5>What is EasyMoney?</h5>
               <h6>VIP members can use the full set of powerful
                    EasyCoin function including demonstration
                    trading, wallet tracking, investment report</h6>
                <h6>We all accept the donation: BTC, ETH, EZH</h6>
                <h6>If you have any problem, please contact us</h6>
                <a href="/">easymoney@gmail.com</a>
               </div>
               <div className="hscontact">
               <h2>Earn more EYN
                    in higher rank of
                    demonstration
                trade</h2>
               </div>
            </div>

            <div className="hsmaincontainer">
                <div className="hsflex">
                    <div className="justdemo"></div>
                    <div className="justdemo"></div>
                    <div className="justdemo"></div>
                </div>

                <div>
                    <img className="homeimg" src={homeimg1} alt="homeimgone" />
                </div>

                <div>
                    <img className="homeimg" src={homeimg2} alt="homeimgtwo" />
                </div>

                <div>
                    <img className="homeimg" src={homeimg3} alt="homeimthree" />
                </div>
            </div>
       </div>
    );
  }
}

export default HomeStructure;







