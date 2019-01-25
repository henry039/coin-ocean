import * as React from 'react';
import openSocket from 'socket.io-client'

export default class extends React.Component {
    constructor(props){
        super(props)
        this.ws = openSocket('/')
        this.state = {
            res : 'change'
        }
        this.ws.on('reply', (msg)=>{
            this.setState({res : msg})
        })
    }

    handle = ()=>{
        this.ws.emit('need chart data', 'msg from client')
    }

    render(){
        return(
            <div>
                <button onClick={this.handle}>Click on me</button>
                <h1>{this.state.res}</h1>
            </div>
        )
    }
}