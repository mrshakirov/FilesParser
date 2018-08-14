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
  let folderInput;

  const setInputRef = input => folderInput = input
  const selectFolder = () => folderInput.click()

  return (
    <React.Fragment>
      <input type="file" accept="text" webkitdirectory="true" multiple style={{display: 'none'}}
             ref={setInputRef} onChange={props.parseFiles} />

      <Button variant="contained" color="default" className={props.classes.button} onClick={selectFolder}>
        Upload Folder
        <CloudUploadIcon className={props.classes.rightIcon}/>
      </Button>
    </React.Fragment>
  )
}

export default withStyles(styles)(uploadButton)