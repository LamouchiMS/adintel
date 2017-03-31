import React from 'react';
import ReactDOM from 'react-dom';
import styles from './main.css';

import {AppContainer} from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer styles={styles.root}>
    <Component/>
  </AppContainer>, document.getElementById('root'));
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}
