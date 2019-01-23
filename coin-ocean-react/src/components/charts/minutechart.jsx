import * as React from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";

const url = '/api/realtime/bitcoin'

export default class RealTimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: 'Price Graph (24hr)'
                },
                chart: {
                    id: 'price',
                },
                yaxis: {
                    title: {
                        text: 'Price'
                    },
                    labels: {
                        formatter: function (val) {
                            return `${val} USD`
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                toolbar: {
                    tools: {
                        selection: false
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                        size: 6
                    }
                },
                tooltip: {
                    followCursor: false,
                    theme: 'dark',
                    x: {
                        show: false
                    },
                    marker: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function () {
                                return ''
                            }
                        }
                    }
                },
                grid: {
                    clipMarkers: false
                },
                xaxis: {
                    type: 'datetime'
                },
            },
            series: []
        }
    }

    componentDidMount() {
        axios.get(url).then(res => {
            this.setState({ series: res.data.hourCoin })
        })
        this.interval = setInterval(() => {
            axios.get(url).then(res => {
                this.setState({ series: res.data.hourCoin })
            })
        }, 1000 * 60 * 5);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type='area'
            />
        )
    }
}