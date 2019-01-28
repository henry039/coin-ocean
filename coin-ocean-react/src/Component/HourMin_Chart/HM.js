import React from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const url = "http://localhost:5000/api/bitcoin";

class Hourandmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: {
          text: "Bitcoin Price Movement"
        },
        xaxis: {
          type: "datetime"
        },
        tooltip: {
          shared: true
        },
        chart: {
          stacked: false
        },
        stroke: {
          // width: [1, 1, 1],
          curve: "smooth"
        },
        plotOptions: {
          bar: {
            columnWidth: "50%"
          }
        },
        markers: {
          size: 0
        },
        yaxis: [
          {
            title: {
              text: "Price"
            },
            labels: {
              formatter: function(val) {
                return `${val}USD`;
              }
            }
          },
          {
            show: false,
            // min: 0,
            max: 163942095652,
            title: {
              text: "txVol(24hr)"
            },
            labels: {
              formatter: function(val) {
                const million = 100000000;
                let BillionBase = val / million;
                return `${BillionBase.toFixed(2)}M`;
              }
            }
          }
        ]
      },
      series: [
        {
          type: "line",
          data: [{ x: "2017-11-12", y: 6295.45 }]
        },
        {
          type: "column",
          data: [{ x: "2017-11-12", y: 6295.45 }]
        }
      ]
      // series: [],
    };
  }

  updateSeries = rawData => {
    let updateData = this.normalizedData(rawData);
    // console.log(updateData)
    this.setState({ series: updateData });
  };

  extractPrice = rawData => {
    // arr of { x: '05/06/2014', y: 54 }
    // x(date) y(price)
    let dataSet = [];
    for (let i in rawData) {
      dataSet.push(
        Object.assign(
          {},
          {
            x: rawData[i].date,
            y: Number(rawData[i].price)
          }
        )
      );
    }
    return Object.assign(
      {},
      {
        name: "Price",
        type: "line",
        data: dataSet
      }
    );
  };

  extractTxVol = rawData => {
    // arr of { x: '05/06/2014', y: 54 }
    // x(date) y(price)
    let dataSet = [];
    for (let i in rawData) {
      dataSet.push(
        Object.assign(
          {},
          {
            x: rawData[i].date,
            y: Number(rawData[i].txVol)
          }
        )
      );
    }
    return Object.assign(
      {},
      {
        name: "TxVol",
        type: "column",
        data: dataSet
      }
    );
  };

  normalizedData = input => {
    let price = this.extractPrice(input);
    let txVol = this.extractTxVol(input);
    return [price, txVol];
  };

  componentDidMount() {
    axios.get(url).then(res => {
      this.setState({ history: res.data });
      this.updateSeries(res.data.slice(res.data.length - 365 * 5));
    });
  }

  render() {
    return (
      <div className="flex">
        <div className="hmchart">
            <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            />
        </div>
      </div>
    );
  }
}

export default Hourandmin;
