import React from "react";
import ReactApexChart from "react-apexcharts";
import openSocket from 'socket.io-client'

class Hourandmin extends React.Component {
  constructor(props) {
    super(props);
    // this.coin_id = 'bitcoin'
    this.ws = openSocket(process.env.REACT_APP_WS)
    this.state = {
      options: {
        title: {
          text: `Price Graph (24hr) ${this.props.req}`
        },
        chart: {
          id: 'price',
          toolbar: {
            show: false
          }
        },
        yaxis: {
          title: {
            text: 'Price'
          },
          labels: {
            formatter: function (val) {
              return `${val.toFixed(2)} USD`
            }
          },
          // tickAmount: 4
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
          // tickAmount: 6,
        },
      },
      series: [],
    };
  }

  componentWillMount() {
    const { req } = this.props
    this.ws.emit(`${req} chart init`, `${this.props.coin_id}`)
  }

  componentDidMount() {
    const { req } = this.props
    this.ws.on(`${req} chart reply`, (reply) => {
      this.setState({
        series: reply.data
      })
    })
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
