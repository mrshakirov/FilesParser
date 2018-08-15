import React from 'react'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    height: '100%'
  },
  progressTitle: {
    marginTop: 16
  }
})

const filesParsingFragment = (props) => {

  return(
    <Grid className={props.classes.container} container justify='center' alignContent='center' direction='column'>
      <Grid item>
        <Grid container justify='center'>
          <CircularProgress color='primary'/>
        </Grid>
        <Typography className={props.classes.progressTitle} variant='subheading' align='center' gutterBottom>
          Forming report...
        </Typography>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(filesParsingFragment)