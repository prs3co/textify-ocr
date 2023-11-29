import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function LineChart ({
  chartOptions,
  chartData
}) {
  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type='line'
      width='100%'
      height='100%'
    />
  )
}
