import * as React from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";

const url = '/api/realtime/bitcoin'

export default class RealTimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                // title: {
                //     text: 'Price Graph (24hr)'
                // },
                chart: {
                    id: 'price',
                    toolbar: {
                        show: false,
                        selection: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                yaxis: {
                    show: false,
                    tickAmount: 4,
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
                    clipMarkers: false,
                    show: false
                },
                xaxis: {
                    show: false,
                    type: 'datetime',
                    tooltip: {
                        enabled: false
                    }
                },
            },
            series: [],
        }
    }

    componentDidMount() {
        axios.get(url).then(res => {
            this.setState({ series: res.data.hourCoin })
            this.setState({
                options: {
                    annotations: {
                        yaxis: [
                            {
                                y: this.state.series[0].data[0].y,
                                label: {
                                    borderColor: "#00E396",
                                    offsetY: -30,
                                    style: {
                                        color: "#fff",
                                        fontSize: '20px',
                                        background: "#00E396"
                                    },
                                    text: this.state.series[0].data[0].y,
                                }
                            }
                        ],
                        points: [
                            {
                                x: this.state.series[0].data[0].x,
                                y: this.state.series[0].data[0].y,
                                marker: {
                                    size: 6,
                                    fillColor: "#fff",
                                    strokeColor: "#00E396",
                                    strokeWidth: 3,
                                    shape: "circle",
                                    radius: 2,
                                    OffsetX: 0,
                                    OffsetY: 0,
                                },
                            }
                        ]
                    }
                }
            })
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
            <div style={{ width: 300, height: 170 }}>
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type='line'
                />
            </div>

        )
    }
}