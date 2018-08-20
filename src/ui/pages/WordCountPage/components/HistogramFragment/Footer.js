import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '../../../../../../node_modules/@material-ui/icons/ArrowBackIosOutlined'
import ArrowForward from '../../../../../../node_modules/@material-ui/icons/ArrowForwardIosOutlined'

const footer = (props) => {
    return(
      <Grid item >
        <Grid container  justify='flex-end' alignItems='center' style={{marginTop: 8}}>
          <Typography variant="caption">
            {props.numeration}
          </Typography>
          <IconButton component="span" disabled={false} style={{marginLeft: 16}} onClick={props.onPageBackClick}>
            <ArrowBack style={{fontSize: '16px'}}/>
          </IconButton >
          <IconButton component="span" disabled={false} style={{marginRight: 16}} onClick={props.onPageForwardClick}>
            <ArrowForward style={{fontSize: '16px'}}/>
          </IconButton>
        </Grid>
      </Grid>
    )
}

export default footer