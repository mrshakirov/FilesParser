import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Header from './Header'
import Footer from './Footer'
import { withStyles } from '@material-ui/core/styles'

import Histogram from './Histogram'

const ELEMENTS_PER_PAGE = 5

const styles = theme => ({
  container: {
    height: '100%'
  },
  newReportButton: {
    margin: 16
  }
})
const splitDataOnPages = (data) => {
  let paginatedData = []
  const getEnd = (start) => start + ELEMENTS_PER_PAGE > data.length ? data.length : start + ELEMENTS_PER_PAGE

  for (let i=0,j=data.length; i<j; i+=ELEMENTS_PER_PAGE) {
    paginatedData.push({
      numeration: `${i === 0 ? 1 : i}-${getEnd(i)} of ${data.length}`, // "i === 0 ?" to see 1-5, not 0-5
      data: data.slice(i, getEnd(i))
    })
  }

  return paginatedData
}

class filesParsingFragment extends Component {
  constructor (props) {
    super(props)
    const paginatedData = splitDataOnPages(props.histogramData)
    this.state = {
      paginatedData,
      currentPage: 0,
      displayedData: paginatedData[0]
    }
  }

  onPageBackClick = () => {
    const newPage = this.state.currentPage - 1;
    const newDisplayedData = this.state.paginatedData[newPage]

    this.updateChart(newDisplayedData, newPage)
  }

  onPageForwardClick = () => {
    const newPage = this.state.currentPage + 1;
    const newDisplayedData = this.state.paginatedData[newPage]

    this.updateChart(newDisplayedData, newPage)
  }

  updateChart(newDisplayedData, newPage) {
    if (newDisplayedData){ // if page exists
      this.setState({
        currentPage: newPage,
        displayedData: this.state.paginatedData[newPage]
      })
    }
  }

  render () {
    return (
      <Grid container direction='column' className={this.props.classes.container}>
        <Header returnToFileSelection={this.props.returnToFileSelection}/>
        <Histogram display={this.props.displayHistogram} data={this.state.displayedData.data}/>
        <Footer numeration={this.state.displayedData.numeration} onPageBackClick={this.onPageBackClick} onPageForwardClick={this.onPageForwardClick}/>
      </Grid>
    )
  }
}

export default withStyles(styles)(filesParsingFragment)