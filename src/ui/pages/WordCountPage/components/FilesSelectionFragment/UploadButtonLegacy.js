import React from 'react'
import Button from '@material-ui/core/Button/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

const uploadButton = (props) => {
  let filesInput;

  const setInputRef = input => filesInput = input
  const selectFiles = () => filesInput.click()

  return (
    <React.Fragment>
      <input type="file"
             accept=".txt, text/plain
             .zip, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip"
             multiple
             style={{display: 'none'}}
             ref={setInputRef} onChange={props.parseFiles} />

      <Button variant="contained" color="default" className={props.classes.button} onClick={selectFiles}>
        Upload Files
        <CloudUploadIcon className={props.classes.rightIcon}/>
      </Button>
    </React.Fragment>
  )
}

export default withStyles(styles)(uploadButton)