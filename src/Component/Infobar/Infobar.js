import React, { Component } from "react";
import axios from 'axios';
import "./Infobar.css";

class Infobar extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            coin: []
        };
    }

    componentDidMount(){
        var api_key = process.env.API_KEY;
        axios.get(`https://min-api.cryptocompare.com/data/top/volumes?tsym=BTC&api_key=${api_key}`)
            .then(response => {
                console.log(response);
                this.setState({
                    coin: response.data.Data[0]
                })
            }).catch(() => console.log('Someting going wrong'));
    }

    render(){
        let storing = this.state.coin.SYMBOL;
        return(
            <div className="infobar">
            {storing}
            </div>
        )
    }
}

export default Infobar;
