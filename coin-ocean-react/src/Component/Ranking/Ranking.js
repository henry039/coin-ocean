import React, { Component, Fragment } from "react";
import openSocket from 'socket.io-client'
import Loading from '../Loading'
import "./Ranking.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Ranking extends Component {
    constructor(props){
        super(props)
        this.ws = openSocket(process.env.REACT_APP_WS)
        this.state = {
            ranking : []
        }
        this.ws.on('ranking update', (reply)=>{
            this.setState({ranking : reply})
        })
    }

    componentWillMount(){
        this.ws.emit('ranking init')
        this.ws.on('ranking init reply', (reply)=>{
            this.setState({ranking : reply})
        })
    }
    render() {
        if(this.state.ranking.length > 0){
            return (
                <div className="ranktocenter">
                    <div className="titlerank"> The Top 10 Investors Rank</div>
                    <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Rank #</th>
                        <th scope="col">User</th>
                        <th scope="col">Profit Earn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ranking.map((rank, index)=>{
                            return(
                            <Fragment>
                                <tr>
                                <th scope="row">{index + 1}</th>
                                <td><img src={rank.photourl} style={{height: '40px', borderRadius : '10px'}} alt='avatar'/><br/>{rank.displayname}</td>
                                <td>{`${rank.diff.toFixed(2)}%`}</td>
                                </tr>
                            </Fragment>
                            )
                        })}
                        {/* <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        </tr> */}
                    </tbody>
                    </table>
                </div>
            )
        }else{
            return <Loading/>
        }
    }
}

export default Ranking;