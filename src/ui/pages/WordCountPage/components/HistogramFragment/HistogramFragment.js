import React from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './Header'
import Footer from './Footer'
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
      <Header returnToFileSelection={props.returnToFileSelection}/>
      <Histogram display={props.displayHistogram} data={props.histogramData}/>
      <Footer/>
    </Grid>
  )
}

export default withStyles(styles)(filesParsingFragment)