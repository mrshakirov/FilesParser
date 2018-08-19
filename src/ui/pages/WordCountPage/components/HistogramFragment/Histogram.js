import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const histogram = (props) => {
  return(
    !props.display ? null :
    <BarChart width={600} height={300} data={props.data}
              margin={{right: 30}}>
      <CartesianGrid strokeDasharray="3 3"/>
      <XAxis dataKey="word"/>
      <YAxis/>
      <Tooltip/>
      <Bar dataKey="occurrences" fill="#8884d8" />
    </BarChart>
  )
}

export default histogram