import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const header = (props) => {
    return(
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
    )
}

export default header