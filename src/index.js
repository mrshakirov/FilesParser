import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './ui/App';
import registerServiceWorker from './utils/registerServiceWorker';
import 'core-js' // for legacy browsers

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
