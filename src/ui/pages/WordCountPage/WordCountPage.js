import React, {Component} from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    height: 400,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8
  }
})

class WordCountPage extends Component{
  render() {
    return(
      <Grid container justify='center'>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <div>FilesSelectionFragment -> FilesParsingFragment -> HistogramFragment</div>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(WordCountPage)