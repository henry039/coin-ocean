import * as React from 'react';
import openSocket from 'socket.io-client'
import ReactApexChart from "react-apexcharts";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.ws = openSocket('/')
        this.state = {
            res: 'change',
            // option : {},
            // series : []
            option_price: {
                title: {
                    text: `Bitcoin Price Movement`
                },
                chart: {
                    id: 'price',
                    group: 'cryptocurrency'
                },
                yaxis: {
                    title: {
                        text: 'Price'
                    },
                    labels: {
                        formatter: function (val) {
                            return `${val} USD`
                        },
                        minWidth: 100
                    },
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
            }

            ,
            option_vol: {
                chart: {
                    id: 'vol',
                    group: 'cryptocurrency',
                    toolbar: {
                        show: false
                    }
                },
                yaxis: {
                    tickAmount: 2,
                    title: {
                        text: 'exchangeVol(24hr)'
                    },
                    labels: {
                        formatter: function (val) {
                            const million = 100000000
                            let BillionBase = (val / million)
                            return `${BillionBase.toFixed(0)}B`
                        },
                        minWidth: 100,
                    },
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
                    hover: {
                        size: 6
                    }
                },
                tooltip: {
                    // enabled: true,
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
            price: [],
            vol: []
        }
        // this.ws.on('reply', (msg) => {
        //     this.setState({ res: msg })
        // })
        // this.ws.on('hour chart reply', (obj) =>{
        //     console.log(obj.data)
        //     this.setState({
        //         option : obj.option,
        //         series : obj.data
        //     })
        // })
        // this.ws.on('history chart reply', (obj) => {
        //     // console.log(obj)
        //     this.setState(pre => ({
        //         // option: obj.option,
        //         // series: obj.data
        //         price: obj.price,
        //         vol: obj.vol
        //     }))
        // })
        this.ws.on('realtime price', (reply)=>{
            console.log(reply)
        })
    }

    handle = () => {
        // this.ws.emit('need chart data', 'msg from client')
        this.ws.emit('history chart init', 'bitcoin')
    }

    render() {
        return (
            <div>
                <button onClick={this.handle}>Click on me</button>
                <h1>{this.state.res}</h1>
                {/* <ReactApexChart
                    options={this.state.option}
                    series={this.state.series}
                    type='area'
                /> */}
                <div style={{ width: 700, height: 550 }}>
                    <ReactApexChart
                        options={this.state.option_price}
                        series={this.state.price}
                        type='area'
                        height='70%'
                    />
                    <ReactApexChart
                        options={this.state.option_vol}
                        series={this.state.vol}
                        type='area'
                        height='30%'
                    />
                </div>
            </div>
        )
    }
}