import React from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import './HM.css'

// const url = "http://localhost:5000/api/bitcoin";
const url = "/api/realtime/bitcoin";

class Hourandmin extends React.Component {
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
          },
          tickAmount: 4
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
          type: 'datetime',
          tickAmount: 6,
        },
      },
      series_hour: [],
      series_minute: []
    }
  }

  componentDidMount() {
    axios.get(url).then(res => {
      this.setState({ 
        series_hour: res.data.hourCoin,
        series_minute: res.data.minuteCoin
      })
    })
    this.interval = setInterval(() => {
      axios.get(url).then(res => {
        this.setState({ 
          series_hour: res.data.hourCoin,
          series_minute: res.data.minuteCoin
        })
      })
    }, 1000 * 60 * 5);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="flex">
        <div className="hmchart">
          {/* hour */}
          <ReactApexChart
            options={this.state.options}
            series={this.state.series_hour}
            type='area'
          />
        </div>
        <div className="hmchart">
          {/* minute */}
          <ReactApexChart
            options={this.state.options}
            series={this.state.series_minute}
            type='area'
          />
        </div>
      </div>
    );
  }
}

export default Hourandmin;
