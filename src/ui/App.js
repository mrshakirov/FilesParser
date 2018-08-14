import React, { Component } from 'react';
import WordCountPage from './pages/WordCountPage/WordCountPage'
import AppBar from './SimpleAppBar'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar/>
        <WordCountPage/>
          - Paper
            - FilesSelectionFragment then FilesParsingFragment then HistogramFragment
      </div>
    );
  }
}

export default App;
