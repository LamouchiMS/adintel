import React from 'react';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import styles from './Scraper.css';

class Scraper extends React.Component {
  constructor(props) {
    super(props);
  }
  getEstimation() {
    return 50;
  }
  formatTime() {
    let seconds = 456321;
    let res = {};
    res.day = Math.floor(seconds / (60 * 60 * 24));
    res.hour = Math.floor((seconds / (60 * 60)) % 24);
    res.minute = Math.floor((seconds / 60) % 60);
    res.second = Math.floor(seconds % 60);
    let chain = '';
    let keys = Object.keys(res);
    keys.forEach((key, i) => {
      if (res[key] > 0) {
        let pref = res[key] === 1
          ? ''
          : 's';
        let suff = i < keys.length - 1
          ? ' | '
          : '';
        chain += res[key] + ' ' + key + pref + suff;
      }
    });
    return chain;
  }
  render() {
    return (
      <div className={styles.scraper}>
        <Paper className={styles.paper}>
          <div className={styles.estmContainer}>
            <h2>Estimated Duration</h2>
            <h2>{this.formatTime()}</h2>
          </div>
          <div className={styles.filtersRow}>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
          </div>
          <div className={styles.filtersRow}>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
          </div>
          <div className={styles.filtersRow}>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
            <SelectField floatingLabelText="Project" value="All">
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Nanny' primaryText="Nanny"/>
              <MenuItem value='Cleaner' primaryText="Cleaner"/>
              <MenuItem value='Education' primaryText="Education"/>
              <MenuItem value='Music teacher' primaryText="Music teacher"/>
              <MenuItem value='Photography' primaryText="Photography"/>
              <MenuItem value='Music_Band' primaryText="Music band"/>
              <MenuItem value='Rides' primaryText="Rides"/>
              <MenuItem value='Miscellaneous' primaryText="Miscellaneous"/>
            </SelectField>
          </div>
          <div className={styles.btnContainer}>
            <FlatButton label="Start scraping"/>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Scraper;
