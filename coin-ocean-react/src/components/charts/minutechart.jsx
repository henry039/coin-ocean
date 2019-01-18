import * as React from 'react';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import { normalize } from 'path';

// const url = 'http://localhost:5000/api/realtime/bitcoin'
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
            series : [
                [1547628980000, 6295.45]
            ]
        }
    }

    normalizeData = (rawData)=>{
        let dataSet = []
        rawData.map(data =>{
            dataSet.push([(data.last_updated * 1000), data.price_usd])
        })
        return dataSet
    }

    updateSeries = ()=>{
        setInterval(() => {
            axios.get(url).then(res =>{
                let price = this.normalizeData(res.data)
                this.setState({series : price})
            })
        }, 1000 * 60 * 10);
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