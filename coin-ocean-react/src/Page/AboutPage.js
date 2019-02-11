import React, { Component } from "react";
import Titlebar from "../Component/General/Titlebar/Titlebar"
import '../Component/About/about.css'
import icon from '../picture/easymoney_name.png'
import icon2 from '../picture/easymoney_icon.png'


class AboutPage extends Component {
  render() {
      return (
        <div>
            <Titlebar />
            <div className="aboutpage">
            <img src={icon} alt="title" href="/" className="aboutimgone" />
            <p>Welcome to EasyCoin. This website mainly provides the good platform to the user who want to trade or realise the world of crytocurrencies.</p>
            <p>We Provide the trading demonstration system for the demonstrated investment, all the profit and loss will be counted and stored in the wallet</p>
            <p>Comparing with other crytocurrencies website, we have more detailed investment tracking</p>
            <p>If you have any problem please contact us: <a href = "mailto: easymoney@gmail.com">easymoney@gmail.com</a></p>
            <img src={icon2} alt="title" href="/" className="aboutimgtwo" />
            </div>
        </div>
      )
  }
}

export default AboutPage;

