import React, { Component } from 'react'
import { pageStatuses, allowedFileTypes } from '../../../utils/Enums'
import { countWords, parseZipFile, parseTextFile } from '../../../utils/Parsers'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import FilesSelectionFragment from './components/FilesSelectionFragment/FilesSelectionFragment'
import FilesParsingFragment from './components/FilesParsingFragment/FilesParsingFragment'
import HistogramFragment from './components/HistogramFragment/HistogramFragment'

const styles = theme => ({
  paper: {
    height: 400,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8
  }
})

class WordCountPage extends Component {
  state = {
    pageStatus: pageStatuses.FILES_SELECTION,
    displayHistogram: false,
    histogramData: []
  }

  parseFiles = async (event) => {
    if (!event.target || !event.target.files) {
      return
    }

    this.setState({pageStatus: pageStatuses.FILES_PARSING})

    /**
     *  Selecting files that we can parse — *.txt and *.zip
     */
    const files = Array.from(event.target.files)
    const suitableFiles = this.getSuitableFiles(files)

    if (suitableFiles.length === 0) {
      this.props.showMessage('No suitable files found! *.txt and *.zip allowed only', 'error')
      this.setState({pageStatus: pageStatuses.FILES_SELECTION})
      return
    }

    this.props.clearMessages()

    /**
     *  Asynchronously converting our files into {name: 'hello.txt', content: 'Hello, world!'} objects
     */
    let convertedFiles = await this.getConvertedFiles(suitableFiles)

    if (convertedFiles.length === 0) {
      this.props.showMessage('No suitable files found! *.txt allowed only', 'error')
      this.setState({pageStatus: pageStatuses.FILES_SELECTION})
      return
    }

    /**
     *  Asynchronously parsing our files into {name: 'hello.txt', wordCount: 2} objects
     */
    let parsedFiles = await this.getParsedFiles(convertedFiles)

    this.setState({displayHistogram: true, histogramData: parsedFiles})
    this.setState({pageStatus: pageStatuses.HISTOGRAM_SHOW})
  }

  getSuitableFiles = (files) => {
    return files.filter(file => allowedFileTypes.includes(file.name.split('.').pop()))
  }

  getConvertedFiles = async (suitableFiles) => {
    let convertedFiles = []

    await Promise.all(
      suitableFiles.map(async (file) => {
        if (file.name.split('.').pop() === 'zip') {
          const files = await parseZipFile(file)

          if (files.length === 0) {
            this.props.showMessage(`No *.txt files found in ${(file.name)}`, 'warning')
          }

          convertedFiles.push(...files)
        } else {
          const textFileContent = await parseTextFile(file)
          convertedFiles.push({name: file.name, content: textFileContent})
        }
      }))

    return convertedFiles
  }

  getParsedFiles = async (convertedFiles) => {
    let parsedFiles = []

    await Promise.all(
      convertedFiles.map(async file => {

        const name = file.name
        const words = countWords(file)

        parsedFiles.push({name: name, words: words})
      })
    )

    return parsedFiles
  }

  returnToFileSelection = () =>{
    this.setState({
      pageStatus: pageStatuses.FILES_SELECTION,
      displayHistogram: false
    })
  }


  render () {
    let pageFragment = null

    switch (this.state.pageStatus) {
      case pageStatuses.FILES_SELECTION:
        pageFragment = <FilesSelectionFragment parseFiles={this.parseFiles}/>
        break
      case pageStatuses.FILES_PARSING:
        pageFragment = <FilesParsingFragment/>
        break
      case pageStatuses.HISTOGRAM_SHOW:
        pageFragment = <HistogramFragment returnToFileSelection={this.returnToFileSelection}
                                          displayHistogram={this.state.displayHistogram}
                                          histogramData={this.state.histogramData}/>
        break
    }

    return (
      <Grid container justify='center'>
        <Grid item xs={12} md={8} lg={6} xl={4}>
          <Paper className={this.props.classes.paper} elevation={1}>
            {pageFragment}
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(WordCountPage)