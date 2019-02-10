import * as React from 'react';
import ReactApexChart from "react-apexcharts";
import openSocket from 'socket.io-client'
import { connect } from 'react-redux'
export class RealTimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.ws = openSocket(process.env.REACT_APP_WS)
        this.state = {
            options: {
                title: {
                    text: `${this.props.coin}`
                },
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
        this.ws.emit('hour chart init', `${this.props.coin}`)
    }

    componentWillMount() {
        const {prices} = this.props
        if(prices[this.props.coin] !== undefined){
            this.ws.on('hour chart reply', (reply)=>{
                this.setState((pre)=>({
                    series : reply.data,
                    })
                )
                this.setState((pre)=>({
                    options: {
                        ...pre.options,
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
                                        text: `${Number(prices[this.props.coin].price).toFixed(2)}`,
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
                )
            })
        }
    }

    render() {
        return (
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type='line'
            />
        )
    }
}

export default connect((state)=> ({prices: state.prices}))(RealTimeChart)