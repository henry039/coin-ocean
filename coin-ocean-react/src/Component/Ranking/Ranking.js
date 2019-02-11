import React, { Component, Fragment } from "react";
import "./Ranking.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Ranking extends Component {
    render() {
        return (
            <div className="ranktocenter">
                <div className="titlerank"> The top 10 Investors Rank</div>
                <table className="table">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">Rank #</th>
                    <th scope="col">User</th>
                    <th scope="col">Profit Earn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    </tr>
                </tbody>
                </table>
            </div>
        )
    }
}

export default Ranking;