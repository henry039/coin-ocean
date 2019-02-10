import * as React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../redux/actions';
import {createWallet, updateWallet, addTradeHistory, addComments, createWallet_DB, getWallet_DB, updateWallet_DB, getTradeHistory_DB, addTradeHistory_DB, getCoinComments_DB, getUserComments_DB, addComments_DB} from '../redux/actions';
import * as moment from 'moment'
import Loading from '../Component/Loading'

class Test extends React.Component{
    handleClick = (e) =>{
        e.preventDefault();
        // this.props.createWallet('test1', {rest : 10000})
        // this.props.updateWallet('test1', {rest : 10000, coinsName : 'bitcoin', quantity: 70})
        // this.props.addTradeHistory('test1', {action :['BTC', 'buy', 20, 4300]})
        // this.props.addComments('test1', {context : 'hey UU', tag: 'eth'})
        // console.log(this.props.comments)

        // DB
        // this.props.getWallet_DB('test1');
        this.props.getWallet_DB('ARxNf2IW6BPZJtGFP8ONSDYLPsO2');
        // this.props.updateWallet_DB('test1', {coins: [['BTC' ,49],["ETH", 500]], rest:8500})
        // this.props.createWallet_DB('test5', {rest : 2345})
        this.props.getTradeHistory_DB('test1')
        // this.props.addTradeHistory_DB('test1', {action : { 'eth' : ['sell', 40, 345]}})
        // this.props.getCoinComments_DB('BTC')
        this.props.getUserComments_DB('test1')
        // this.props.addComments_DB('test1', {context : 'hey there', tag : 'eth234'})
    }
    handleClick2 = (e) =>{
        e.preventDefault();
        console.log(this.props.wallet)
        console.log(this.props.comments)
        console.log(this.props.trade)
    }

    render() {
        let {wallet, trade, comments, actions, user} = this.props
        return (
            <div>
                <h1>this is wallet {wallet.rest}</h1>
                <h1>this is trade </h1>
                <h1>this is comment </h1>
                <button onClick={this.handleClick}>Click On Me</button>
                <button onClick={this.handleClick2}>Click On Me</button>
                <h1> {moment(1549255505000).format('llll')}</h1>
                <Loading/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    wallet : state.wallet,
    trade : state.trade_history,
    comments : state.comments,
})

export default connect(mapStateToProps, {createWallet, updateWallet, addTradeHistory, addComments, createWallet_DB, getWallet_DB, updateWallet_DB, getTradeHistory_DB, addTradeHistory_DB, getCoinComments_DB,getUserComments_DB, addComments_DB})(Test)