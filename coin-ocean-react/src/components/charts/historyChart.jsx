// pure display component
import * as React from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";

// const url = 'http://localhost:5000/api/history/bitcoin'
const url = '/api/history/bitcoin'

class ChartHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options_price: {
                title: {
                    text: 'Bitcoin Price Movement'
                },
                chart: {
                    id: 'price',
                    group: 'bitcoin'
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
            options_vol: {
                chart: {
                    id: 'vol',
                    group: 'bitcoin',
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
                            return `${BillionBase.toFixed(2)}M`
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
                    hover: {
                        size: 6
                    }
                },
                tooltip: {
                    enabled: true,
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
            series_price: [{
                // type: 'line', data: [
                //     { x: "2017-11-12", y: 6295.45 },
                // ]
                data: [
                    { x: "2017-11-12", y: 6295.45 },
                ]
            }],
            series_vol: [{
                type: 'column', data: [
                    { x: "2017-11-12", y: 6295.45 },
                ]
                // data: [
                //     { x: "2017-11-12", y: 6295.45 },
                // ]
            }]
        }
    }

    updateSeries = (rawData) => {
        let updatePrice = this.extractPrice(rawData)
        let updateExchange = this.extractExchange(rawData)
        // console.log(updatePrice)
        // console.log(updateExchange)
        this.setState({
            series_price: [updatePrice],
            series_vol: [updateExchange]
        })
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
            // dataSet.push([new Date(rawData[i].date).getTime(), Number(rawData[i].price)])
        }
        return Object.assign({}, {
            name: 'Price',
            // type: 'line',
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
            // dataSet.push([new Date(rawData[i].date).getTime(), Number(rawData[i].txVol)])
        }
        return Object.assign({}, {
            name: 'TxVol',
            type: 'column',
            data: dataSet
        })
    }

    componentDidMount() {
        axios.get(url).then(res => {
            this.setState({ history: res.data })
            this.updateSeries(res.data.slice(res.data.length - 365))
        })
    }

    handleClick = (e) => {
        const history = this.state.history
        const total = history.length
        switch (e.target.value) {
            case '7d':
                this.updateSeries(history.slice((total - 7)))
                break;
            case '1m':
                this.updateSeries(history.slice((total - 30)))
                break;
            case '3m':
                this.updateSeries(history.slice((total - 90)))
                break;
            case '1y':
                this.updateSeries(history.slice((total - 365)))
                break;
            case '3y':
                this.updateSeries(history.slice((total - 365 * 3)))
                break;
            default:
                this.updateSeries(history)
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button onClick={this.handleClick} value="7d">7d</button>
                <button onClick={this.handleClick} value='1m'>1m</button>
                <button onClick={this.handleClick} value='3m'>3m</button>
                <button onClick={this.handleClick} value='1y'>1y</button>
                <button onClick={this.handleClick} value='3y'>3y</button>
                <div style={{ width: '1000px', height: '500px' }}>
                    < ReactApexChart
                        options={this.state.options_price}
                        series={this.state.series_price}
                        height='70%'
                        type='area'
                    />
                    <ReactApexChart
                        options={this.state.options_vol}
                        series={this.state.series_vol}
                        height='30%'
                        type='line'
                    />
                </div>
            </div>
        )
    }
}

export default ChartHistory;
