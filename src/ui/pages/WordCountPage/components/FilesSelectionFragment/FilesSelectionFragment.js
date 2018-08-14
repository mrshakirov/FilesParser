import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import UploadButton from './UploadButton'

const styles = theme => ({
  container: {
    height: '100%'
  }
})

const filesSelectionFragment = (props) => {
  return(
    <Grid className={props.classes.container} container justify='center' alignContent='center' direction='column'>
      <Grid item>
        <Typography variant='title' align='center' gutterBottom>
          Upload your text files to get word count report
        </Typography>
        <Grid container justify='center'>
          <UploadButton parseFiles={props.parseFiles}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(filesSelectionFragment)