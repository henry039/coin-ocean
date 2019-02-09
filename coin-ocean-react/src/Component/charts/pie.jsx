import * as React from 'react';
import ReactApexChart from "react-apexcharts";

export default class RealTimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                // labels: ['Bitcoin', 'eth', 'rest', 'ripple', 'CON'],
                labels: [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                plotOptions: {
                    pie: {
                        expandOnClick: false
                    }
                }
            },
            // series: [44, 55, 13, 43, 22],
            series: [],
        }
    }

    componentWillMount() {
        const {labels, series} = this.props.pie
        this.setState(pre => ({
            series: series,
            options: {
                ...pre.options,
                labels: labels
            }
        }))
    }

    render() {
        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type='pie'
                width="380"
            />
        )
    }
}