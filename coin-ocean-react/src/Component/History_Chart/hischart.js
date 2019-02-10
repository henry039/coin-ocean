import React from 'react';
import ReactApexChart from "react-apexcharts";
import Ind from "../CoinInfo/indivcoincard"
import HM from "../HourMin_Chart/HM"
import './hischart.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import openSocket from 'socket.io-client'
import { withRouter } from 'react-router-dom'
class ChartHistory extends React.Component {
    constructor(props) {
        super(props);
        this.coin_id = 'bitcoin'
        this.ws = openSocket(process.env.REACT_APP_WS)
        this.state = {
            option_price: {
                title: {
                    text: `${this.props.match.params.id} Price Movement`
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
                    tickAmount: 3,
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
            info: [],
            pageid: `${this.props.match.params.id}`,
            icon: []
            // =====================William add end=====================
        }
    }

    componentWillMount() {
        this.ws.emit('history chart init', `${this.coin_id}`)
    }

    componentDidMount() {
        this.ws.on('history chart reply', (reply) => {
            this.setState({
                price: reply.price,
                vol: reply.vol,
                history: reply
            })
        })

        // =====================William add=====================
        fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100")
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        info: result.filter(e => {return e.symbol === this.state.pageid.toUpperCase()})
                    });
                },
                error => {
                    this.setState({
                        error
                    });
                }
            )
        // =====================William add end=====================
    }
    handleClick = (e) => {
        const price = this.state.history.price[0].data
        const vol = this.state.history.vol[0].data
        const total = price.length
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
                    {this.state.info.map((info,index) => {
                        return (
                            <div className="indivcoin">
                                <Ind
                                    name={info.id}
                                    symbol={info.symbol}
                                    price_usd={Math.round((info.price_usd) * 100) / 100}
                                    price_btc={Math.round((info.price_btc) * 100000000000) / 100000000000}
                                    change={Math.round((info.percent_change_24h) * 100) / 100}
                                    marketcap={Math.round(info.market_cap_usd)}
                                    volume={Math.round(info['24h_volume_usd'])}
                                    total={Math.round(info.total_supply)}
                                    max={Math.round(info.max_supply)}
                                    iconimg={this.props.match.params.id.toLowerCase()}
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
                        <div className="chart"  style={{maxHeight : 350}}>
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
                        {/* <HM req='minute' coin_id={this.props.match.params.id}/> */}
                    </div>
                    <div className="hmchart">
                        {/* <HM req='hour' coin_id={this.props.match.params.id}/> */}
                    </div>
                </div>
            </div>
        )
    }
    // =====================William modified end=====================
}

export default withRouter(ChartHistory);