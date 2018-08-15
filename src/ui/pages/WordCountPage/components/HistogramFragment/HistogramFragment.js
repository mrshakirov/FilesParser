import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import Histogram from './Histogram'

const styles = theme => ({
  container: {
    height: '100%'
  },
  newReportButton: {
    marginTop: 16,
    marginRight: 16,
    marginBottom: -30 /* compensate button height & margin */
  }
})

const filesParsingFragment = (props) => {

  return(
    <React.Fragment>
      <Grid container  justify='flex-end'>
        <Button size="small" className={props.classes.newReportButton} onClick={props.returnToFileSelection}>
          Create another report
        </Button>
      </Grid>
      <Grid className={props.classes.container} container justify='center' alignContent='center' direction='column'>
        <Grid item>
          <Grid container justify='center'>
            <Histogram display={props.displayHistogram} data={props.histogramData}/>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withStyles(styles)(filesParsingFragment)