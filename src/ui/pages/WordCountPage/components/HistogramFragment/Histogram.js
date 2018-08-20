import React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Grid from '@material-ui/core/Grid'

const histogram = (props) => {
  return(
    <Grid item>
      <Grid  container justify='center' alignContent='center' direction='column'>
        <Grid item>
          <Grid container justify='center'>
            {!props.display ? null :
              <BarChart width={600} height={300} data={props.data}
                        margin={{right: 30}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="word"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="occurrences" fill="#8884d8" />
              </BarChart>}
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  )
}

export default histogram