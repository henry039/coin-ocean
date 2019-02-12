import React from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import Ind from "../CoinInfo/indivcoincard"
import HM from "../HourMin_Chart/HM"
import './hischart.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { withRouter } from 'react-router-dom';


// const url = 'http://localhost:5000/api/bitcoin'

class ChartHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                title: {
                    text: 'Bitcoin Price Movement'
                },
                xaxis: {
                    type: 'datetime'
                },
                tooltip: {
                    shared: true,
                },
                chart: {
                    stacked: false,
                },
                stroke: {
                    // width: [1, 1, 1],
                    curve: 'smooth'
                },
                plotOptions: {
                    bar: {
                        columnWidth: '50%'
                    }
                },
                markers: {
                    size: 0,
                },
                yaxis: [
                    {   
                        title: {
                            text: 'Price',
                        },
                        labels: {
                            formatter: function (val) {
                                return `${val}USD`
                            }
                        }
                    },
                    {
                        show: false,
                        // min: 0,
                        max: 163942095652,
                        title: {
                            text: 'txVol(24hr)'
                        },
                        labels: {
                            formatter: function (val) {
                                const million = 100000000
                                let BillionBase = (val / million)
                                return `${BillionBase.toFixed(2)}M`
                            }
                        }
                    }
                ]
            },
            series: [
                {
                    type: 'line', data: [
                        { x: "2017-11-12", y: 6295.45 },
                    ]
                }, {
                    type: 'column', data: [
                        { x: "2017-11-12", y: 6295.45 },
                    ]
                }
            ],
            // =====================William add=====================
            info: [],
            pageid : `${this.props.match.params.id}`
            // =====================William add end=====================
        }
    }

    updateSeries = (rawData) => {
        let updateData = this.normalizedData(rawData)
        // console.log(updateData)
        this.setState({ series: updateData })
    }

    extractPrice = (rawData) => {
        // arr of { x: '05/06/2014', y: 54 }
        // x(date) y(price)
        let dataSet = []
        for (let i in rawData) {
            dataSet.push(Object.assign({}, {
                x: rawData[i].date,
                y: Number(rawData[i].price)
            }))
        }
        return Object.assign({}, {
            name: 'Price',
            type: 'line',
            data: dataSet
        })
    }

    extractTxVol = (rawData) => {
        // arr of { x: '05/06/2014', y: 54 }
        // x(date) y(price)
        let dataSet = []
        for (let i in rawData) {
            dataSet.push(Object.assign({}, {
                x: rawData[i].date,
                y: Number(rawData[i].txVol)
            }))
        }
        return Object.assign({}, {
            name: 'TxVol',
            type: 'column',
            data: dataSet
        })
    }

    normalizedData = (input) => {
        let price = this.extractPrice(input)
        let txVol = this.extractTxVol(input)
        return [price, txVol]
    }

    componentDidMount() {
        // axios.get(url).then(res => {
        //     this.setState({history : res.data})
        //     this.updateSeries(res.data.slice(res.data.length -365 * 5))
        // })

        // =====================William add=====================
        fetch("https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100")
        .then(res => res.json())
        .then(
            result => {
            this.setState({
                info: result.filter(e => {return e.symbol === this.state.pageid.toUpperCase()}),
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

    handleClick = (e)=>{
        const history = this.state.history
        const total = history.length
        switch(e.target.value){
            case '7d':
                this.updateSeries(history.slice((total-7)))
                break;
            case '1m':
                this.updateSeries(history.slice((total-30)))
                break;
            case '3m':
                this.updateSeries(history.slice((total-90)))
                break;
            case '1y':
                this.updateSeries(history.slice((total-365)))
                break;
            case '5y':
                this.updateSeries(history.slice((total - 365 * 5)))
                break;
            default:
                this.updateSeries(history)
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
                            name={info.id}
                            symbol={info.symbol}
                            price_usd={Math.round((info.price_usd)*100)/100}
                            price_btc={Math.round((info.price_btc)*100)/100}
                            change={Math.round((info.percent_change_24h)*100)/100}
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
                            <button className="btn btn-outline-danger" onClick={this.handleClick} value='5y'>5y</button>
                        </div>
                        <div className="chart">
                            <ReactApexChart
                                options={this.state.options}
                                series={this.state.series}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="hmchart">
                        <HM/>
                    </div>
                    <div className="hmchart">
                        <HM/>
                    </div>
                </div>
            </div>
        )
    }
    // =====================William modified end=====================
}

export default withRouter(ChartHistory);