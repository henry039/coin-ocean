import React, { Component } from "react";
import './Titlebar.css'

class Titlebar extends Component{
    constructor(prop){
        super(prop);
        this.state = {
            coin: []
        };
    }

    render(){
        return(
            <div className="header">
            <p className="websitename">EasyMoney</p>
            </div>
        )
    }
}

export default Titlebar;
