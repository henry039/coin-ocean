import * as React from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";


const url = 'http://localhost:5000/api/bitcoin'

class Chart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bitcoin_data: [],
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        }
    }

    componentWillMount() {
        axios.get(url).then(res => {
            this.setState({ bitcoin_data: res.data })
        })
    }
    render() {
        return (
            <Chart
                options={this.state.options}
                series={this.state.series}
                type="line"
                width="500"
            />
        )
    }
}

export default Chart2;
