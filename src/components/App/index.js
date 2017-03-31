import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {fade} from 'material-ui/utils/colorManipulator';
import {
  cyan700,
  grey600,
  yellowA100,
  yellowA200,
  yellowA400,
  white,
  fullWhite
} from 'material-ui/styles/colors';

import styles from './App.css';
import First from '../First';
import Header from '../Header';
import Footer from '../Footer';

injectTapEventPlugin();
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#303030',
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: yellowA200,
    accent2Color: yellowA400,
    accent3Color: yellowA100,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: white,
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: 'Hello world'
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={styles.app}>
          <Header/>
          <First/>
          <Footer/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
