import * as React from 'react';
import ReactApexChart from "react-apexcharts";
import { pie_data } from '../../redux/selectors'
// import { connect } from 'react-redux'
// import { cal_coin_assets } from '../../redux/selectors'

export default class RealTimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                // labels: ['Bitcoin', 'eth', 'rest', 'ripple', 'CON'],
                labels: [],
                responsive: [{
                    // breakpoint: 480,
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

    componentWillReceiveProps() {
        // console.log(pie_data(this.props.coins))
        this.setState(pre => ({
            series: pie_data(this.props.coins).series,
            options: {
                ...pre.options,
                labels: pie_data(this.props.coins).labels
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