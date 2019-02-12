import React, { Component, Fragment } from "react";
import { formatter } from '../../redux/selectors'
import Loading from '../Loading'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class Reminder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reminder : []
        }
    }

    componentWillMount() {
        const { uid } = this.props
        axios.post(`${process.env.REACT_APP_HTTP}/api/get/reminder`, { uid })
            .then((res) => this.setState({ reminder: res.data }))
    }
    handleRemove = (index) => {
        const {reminder} = this.state
        const {uid} = this.props
        // const updated = reminder.splice(e.target.key, 1)
        reminder.splice(index, 1)
        axios.post(`${process.env.REACT_APP_HTTP}/api/update/reminder`, {uid, reminder}).then(() => this.setState({reminder}))
    }

    render() {
        if(this.state.reminder.length > 0){
            return (
                <div className="ranktocenter" style={{textAlign : 'center'}}>
                    <div className="titlerank" style={{margin : '30px', fontSize : '30px', fontWeight:'bold'}}> Reminder</div>
                    <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Coin</th>
                        <th scope="col">Action</th>
                        <th scope="col">Target Price</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reminder.map((remind, index)=>{
                            return(
                            <Fragment>
                                <tr>
                                <th scope="row">{remind[0]}</th>
                                <td>{remind[1]}</td>
                                <td>{`${formatter.format(remind[2])}`}</td>
                                <td key={index} onClick={() => this.handleRemove(index)} style={{cursor : 'pointer'}}>&#128465;</td>
                                </tr>
                            </Fragment>
                            )
                        })}
                    </tbody>
                    </table>
                </div>
            )
        }else{
            return <Loading/>
        }
    }
}

export default Reminder;