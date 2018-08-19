import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBackIosOutlined'
import ArrowForward from '@material-ui/icons/ArrowForwardIosOutlined'
import { withStyles } from '@material-ui/core/styles'

import Histogram from './Histogram'

const styles = theme => ({
  container: {
    height: '100%'
  },
  newReportButton: {
    margin: 16
  }
})

const filesParsingFragment = (props) => {

  return(
    <Grid container direction='column' className={props.classes.container}>
      <Grid item>
        <Grid container  justify='space-between' alignItems='center'>
          <Typography variant="title" style={{margin: 16}}>
            Word Frequency
          </Typography>
          <Button size="small" style={{margin: 16}} onClick={props.returnToFileSelection}>
            Create another report
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Grid  container justify='center' alignContent='center' direction='column'>
          <Grid item>
            <Grid container justify='center'>
              <Histogram display={props.displayHistogram} data={props.histogramData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item >
        <Grid container  justify='flex-end' alignItems='center' style={{marginTop: 8}}>
          <Typography variant="caption">
            {`1-5 of 15`}
          </Typography>
          <IconButton component="span" disabled={false} style={{marginLeft: 16}}>
            <ArrowBack style={{fontSize: '16px'}}/>
          </IconButton >
          <IconButton component="span" disabled={false} style={{marginRight: 16}}>
            <ArrowForward style={{fontSize: '16px'}}/>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(filesParsingFragment)