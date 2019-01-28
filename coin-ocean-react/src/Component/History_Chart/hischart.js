import React from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import Ind from "../CoinInfo/indivcoincard"
import HM from "../HourMin_Chart/HM"
import './hischart.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import openSocket from 'socket.io-client'

// const url = '/api/history/bitcoin'

class ChartHistory extends React.Component {
    constructor(props) {
        super(props);
        this.coin_id = 'bitcoin'
        this.ws = openSocket('/')
        this.state = {
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
            },
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
            vol: [],
            // =====================William add=====================
            info: []
            // =====================William add end=====================
        }
    }

    // updateSeries = (rawData) => {
    //     let updateData = this.normalizedData(rawData)
    //     // console.log(updateData)
    //     this.setState({ series: updateData })
    // }

    // extractPrice = (rawData) => {
    //     // arr of { x: '05/06/2014', y: 54 }
    //     // x(date) y(price)
    //     let dataSet = []
    //     for (let i in rawData) {
    //         dataSet.push(Object.assign({}, {
    //             x: rawData[i].date,
    //             y: Number(rawData[i].price)
    //         }))
    //     }
    //     return Object.assign({}, {
    //         name: 'Price',
    //         type: 'line',
    //         data: dataSet
    //     })
    // }

    // extractTxVol = (rawData) => {
    //     // arr of { x: '05/06/2014', y: 54 }
    //     // x(date) y(price)
    //     let dataSet = []
    //     for (let i in rawData) {
    //         dataSet.push(Object.assign({}, {
    //             x: rawData[i].date,
    //             y: Number(rawData[i].txVol)
    //         }))
    //     }
    //     return Object.assign({}, {
    //         name: 'TxVol',
    //         type: 'column',
    //         data: dataSet
    //     })
    // }

    // normalizedData = (input) => {
    //     let price = this.extractPrice(input)
    //     let txVol = this.extractTxVol(input)
    //     return [price, txVol]
    // }

    componentWillMount() {
        this.ws.emit('history chart init', `${this.coin_id}`)
    }

    componentDidMount() {
        // axios.get(url).then(res => {
        //     this.setState({ history: res.data })
        //     this.updateSeries(res.data.slice(res.data.length - 365 * 5))
        // })
        this.ws.on('history chart reply', (reply) => {
            this.setState({
                price: reply.price,
                vol: reply.vol,
                history: reply
            })
        })

        // =====================William add=====================
        fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=1")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        info: result,
                    });
                },
                error => {
                    this.setState({
                        error
                    });
                }
            );
        // =====================William add end=====================
    }

    handleClick = (e) => {
        const price = this.state.history.price[0].data
        const vol = this.state.history.vol[0].data
        const total = price.length
        // console.log(total)
        switch (e.target.value) {
            case '7d':
                this.setState((pre) => ({
                    price: [{
                        ...pre.price.name,
                        data: (price.slice((total - 7)))
                    }],
                    vol: [{
                        ...pre.vol.name,
                        data: (vol.slice((total - 7)))
                    }],
                }))
                break;
            case '1m':
                this.setState((pre) => ({
                    price: [{
                        ...pre.price.name,
                        data: (price.slice((total - 30)))
                    }],
                    vol: [{
                        ...pre.vol.name,
                        data: (vol.slice((total - 30)))
                    }],
                }))
                break;
            case '3m':
                this.setState((pre) => ({
                    price: [{
                        ...pre.price.name,
                        data: (price.slice((total - 90)))
                    }],
                    vol: [{
                        ...pre.vol.name,
                        data: (vol.slice((total - 90)))
                    }],
                }))
                break;
            case '1y':
                this.setState((pre) => ({
                    price: [{
                        ...pre.price.name,
                        data: (price.slice((total - 365)))
                    }],
                    vol: [{
                        ...pre.vol.name,
                        data: (vol.slice((total - 365)))
                    }],
                }))
                break;
            // case '5y':
            //     this.updateSeries(history.slice((total - 365 * 5)))
            //     this.updateSeries(history.slice((total - 365 * 5)))
            //     break;
            default:
            // this.updateSeries(history)
        }
    }
    // =====================William modified=====================
    render() {
        return (
            <div>
                <div className="coininfo">
                    {this.state.info.map((info, index) => {
                        return (
                            <div className="indivcoin">
                                <Ind
                                    name={info.name}
                                    symbol={info.symbol}
                                    price_usd={Math.round((info.price_usd) * 100) / 100}
                                    price_btc={Math.round((info.price_btc) * 100) / 100}
                                    change={Math.round((info.percent_change_24h) * 100) / 100}
                                    marketcap={Math.round(info.market_cap_usd)}
                                    volume={Math.round(info['24h_volume_usd'])}
                                    total={Math.round(info.total_supply)}
                                    max={Math.round(info.max_supply)}
                                />
                            </div>
                        );
                    })}

                    <div>
                        <div className="chartbutton">
                            <button className="btn btn-outline-danger" onClick={this.handleClick} value="7d">7d</button>
                            <button className="btn btn-outline-danger" onClick={this.handleClick} value='1m'>1m</button>
                            <button className="btn btn-outline-danger" onClick={this.handleClick} value='3m'>3m</button>
                            <button className="btn btn-outline-danger" onClick={this.handleClick} value='1y'>1y</button>
                            {/* <button className="btn btn-outline-danger" onClick={this.handleClick} value='5y'>5y</button> */}
                        </div>
                        <div className="chart">
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
                </div>

                <div className="flex">
                    <div className="hmchart">
                        <HM req='minute' />
                    </div>
                    <div className="hmchart">
                        <HM req='hour' />
                    </div>
                </div>
            </div>
        )
    }
    // =====================William modified end=====================
}

export default ChartHistory;