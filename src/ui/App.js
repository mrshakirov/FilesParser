import React, { Component } from 'react';
import WordCountPage from './pages/WordCountPage/WordCountPage'
import AppBar from './SimpleAppBar'
import CustomizedSnackbar from './utils/CustomizedSnackbar'

class App extends Component {
  state = {
    snackbarShow: false,
    snackbarMessage: '',
    snackbarVariant: 'error'
  }

  showMessage = (message, variant) => {
    this.setState({
      snackbarShow: true,
      snackbarMessage: message,
      snackbarVariant: variant
    })
  }

  clearMessages = () => {
    this.setState({
      snackbarShow: false
    })
  }

  onSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ snackbarShow: false });
  }

  render() {
    return (
      <React.Fragment>
        <AppBar/>
        <WordCountPage showMessage={this.showMessage} clearMessages={this.clearMessages}/>
        <CustomizedSnackbar open={this.state.snackbarShow}
                            message={this.state.snackbarMessage}
                            variant={this.state.snackbarVariant}
                            onClose={this.onSnackbarClose}/>
      </React.Fragment>
    );
  }
}

export default App;
