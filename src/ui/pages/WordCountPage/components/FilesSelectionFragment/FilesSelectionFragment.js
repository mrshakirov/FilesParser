import React from 'react'
import {isInputDirSupported} from '../../../../../utils/Verification'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import UploadButton from './UploadButton'
import UploadButtonLegacy from './UploadButtonLegacy'

const styles = theme => ({
  container: {
    height: '100%'
  }
})

const filesSelectionFragment = (props) => {
  /**
   *  Check if browser supports directory selection and set appropriate control
   */
  let uploadButton = null
  if (isInputDirSupported()) {
    uploadButton = <UploadButton parseFiles={props.parseFiles}/>
  } else {
    uploadButton = <UploadButtonLegacy parseFiles={props.parseFiles}/>
  }

  return(
    <Grid className={props.classes.container} container justify='center' alignContent='center' direction='column'>
      <Grid item>
        <Typography variant='title' align='center' gutterBottom>
          Upload your text files to get word count report
        </Typography>
        <Grid container justify='center'>
          {uploadButton}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(filesSelectionFragment)