import React, { Component } from 'react';
import WordCountPage from './pages/WordCountPage/WordCountPage'
import AppBar from './SimpleAppBar'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar/>
        <WordCountPage/>
      </React.Fragment>
    );
  }
}

export default App;
