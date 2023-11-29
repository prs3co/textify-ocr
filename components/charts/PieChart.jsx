import dynamic from 'next/dynamic'
import React from 'react'
import { isWindowAvailable } from 'utils/navigation'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

class PieChart extends React.Component {
  state = {
    chartData: [],
    chartOptions: {}
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions
    })
  }

  render () {
    if (!isWindowAvailable()) return <></>
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='pie'
        width='100%'
        height='55%'
      />
    )
  }
}

export default PieChart
