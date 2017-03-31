import React from 'react';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Tab, Tabs} from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FullStarIcon from 'material-ui/svg-icons/toggle/star';
import EmptyStarIcon from 'material-ui/svg-icons/toggle/star-border';
import faker from 'faker';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui/svg-icons/action/info';
import DeleteIcon from 'material-ui/svg-icons/content/clear';
import LinkIcon from 'material-ui/svg-icons/action/launch';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import Snackbar from 'material-ui/Snackbar';
import NextIcon from 'material-ui/svg-icons/navigation/chevron-right';
import PreviousIcon from 'material-ui/svg-icons/navigation/chevron-left';
import FirstIcon from 'material-ui/svg-icons/navigation/first-page';
import LastIcon from 'material-ui/svg-icons/navigation/last-page';

import styles from './First.css';

class First extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      dataSource: [],
      entries: [],
      snackbarOpen: false,
      snackbarMessage: '',
      projectValue: 'All',
      contactValue: 'All',
      sourceValue: 'All',
      categoryValue: 'All',
      languageValue: 'All',
      countryValue: 'All',
      regionValue: 'All',
      townValue: 'All',
      count: 0,
      maxPage: 0,
      currentPage: 0
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    let phase = 0;
    fetch('/api/getEntries/' + this.state.projectValue + '/' + this.state.categoryValue + '/' + this.state.contactValue + '/' + this.state.currentPage).then((res) => {
      return res.json().then((json) => {
        let result = json.entries;
        result.forEach((elem) => {
          let link = elem.url;
          let count = 0;
          let startIndex = 0;
          let endIndex = 0;
          for (var i = 0; i < link.length; i++) {
            if (link.charAt(i) === '/') {
              count++;
            }
            if (count === 3) {
              startIndex = i;
            } else if (count === 4) {
              endIndex = i;
            }
          }
          let currentTown = link.substring(startIndex + 2, endIndex + 1);
          currentTown = currentTown.replace(/-/g, ' ');
          elem.town = currentTown;
        });
        console.info(json);
        this.setState({
          entries: json.entries
        }, () => {
          this.setState({
            count: json.count,
            maxPage: json.maxPage
          }, () => {
            let msg = 'Found ' + this.state.count + ' result';
            if (json.count !== 1) {
              msg += '';
            }
            this.setState({
              snackbarMessage: msg
            }, () => {
              this.setState({
                snackbarOpen: true
              }, () => {
                console.info('state', this.state);
              });
            });
          });
        });
      });
    });
  }
  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value, value + value,
        value + value + value
      ]
    });
  };
  handleChangeProject = (event, index, value) => this.setState({
    projectValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeContact = (event, index, value) => this.setState({
    contactValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeSource = (event, index, value) => this.setState({
    sourceValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeCategory = (event, index, value) => this.setState({
    categoryValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeLanguage = (event, index, value) => this.setState({
    languageValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeCountry = (event, index, value) => this.setState({
    countryValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeRegion = (event, index, value) => this.setState({
    regionValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  handleChangeTown = (event, index, value) => this.setState({
    townValue: value,
    currentPage: 0
  }, () => {
    this.fetchData();
  });
  fakeCard(entry, i) {
    let title = entry.project + ' ' + entry.category;
    let subtitle = entry.town + ', ' + entry.address;
    if (this.state.contactValue === 'Phone_Only')
      title = entry.phone;
    else if (this.state.contactValue === 'Email_Only')
      subtitle = (
        <div>
          {entry.email}<br/>{entry.town + ', ' + entry.address}
        </div>
      );
    else if (this.state.contactValue === 'Email_Phone') {
      title = entry.phone;
      subtitle = (
        <div>
          {entry.email}<br/>{entry.town + ', ' + entry.address}
        </div>
      );
    }
    return (
      <Card key={i} expanded={true} className={styles.card}>
        <CardHeader
          className={styles.cardHeader}
          title={title}
          subtitle={subtitle}
          avatar={faker.image.image()}
          actAsExpander={true}
          showExpandableButton={false}/>
        <CardText className={styles.cardBody} expandable={true}>
          {entry.body}
        </CardText>
        <CardActions className={styles.cardActions}>
          <IconButton tooltip="Delete">
            <DeleteIcon/></IconButton>
          <IconButton target="_blank" href={entry.url} tooltip="See original page">
            <LinkIcon/></IconButton>
          <IconButton tooltip="More">
            <MoreIcon/></IconButton>
        </CardActions>
      </Card>
    );
  }
  generateCards() {
    return this.state.entries.map((entry, i) => {
      return this.fakeCard(entry, i);
    });
  }
  getFirstPage() {
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: 0
      }, () => {
        this.fetchData();
      });
    }
  }
  getPreviousPage() {
    if (this.state.currentPage > 0) {
      this.setState({
        currentPage: this.state.currentPage - 1
      }, () => {
        this.fetchData();
      });
    }
  }
  getNextPage() {
    if (this.state.currentPage < this.state.maxPage) {
      this.setState({
        currentPage: this.state.currentPage + 1
      }, () => {
        this.fetchData();
      });
    }
  }
  getLastPage() {
    if (this.state.currentPage < this.state.maxPage) {
      this.setState({
        currentPage: this.state.maxPage
      }, () => {
        this.fetchData();
      });
    }
  }
  render() {
    return (
      <div className={styles.first}>
        <Snackbar
          className={styles.snackbar}
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={4000}/>
        <Paper className={styles.firstPaper}>
          <div className={styles.autoCompleteContainer}>
            <AutoComplete
              fullWidth
              hintText="Type anything"
              dataSource={this.state.dataSource}
              onUpdateInput={this.handleUpdateInput}/></div>
          <div className={styles.filtersRow}>
            <SelectField
              floatingLabelText="Project"
              value={this.state.projectValue}
              onChange={this.handleChangeProject}>
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
            <SelectField
              floatingLabelText="Contact info"
              value={this.state.contactValue}
              onChange={this.handleChangeContact}>
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Phone_Only' primaryText="Phone only"/>
              <MenuItem value='Email_Only' primaryText="Email only"/>
              <MenuItem value='Email_Phone' primaryText="Phone & email"/>
              <MenuItem value='No_Info' primaryText="No contact info"/>
            </SelectField>
            <SelectField
              floatingLabelText="Source"
              value={this.state.sourceValue}
              onChange={this.handleChangeSource}>
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Kijiji' primaryText="Kijiji"/>
              <MenuItem value='Gumtree_UK' primaryText="Gumtree UK"/>
              <MenuItem value='Locanto' primaryText="Locanto"/>
              <MenuItem value='LeBonCoin' primaryText="LeBonCoin"/>
              <MenuItem value='Gumtree_AU' primaryText="Gumtree AU"/>
              <MenuItem value='Classifiedads' primaryText="Classifiedads"/>
            </SelectField>
            <SelectField
              floatingLabelText="Category"
              value={this.state.categoryValue}
              onChange={this.handleChangeCategory}>
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='Offering' primaryText="Offering"/>
              <MenuItem value='Wanted' primaryText="Wanted"/>
            </SelectField>
          </div>
          <div className={styles.filtersRow}>
            <SelectField
              floatingLabelText="Language"
              value={this.state.languageValue}
              onChange={this.handleChangeLanguage}>
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='English' primaryText="English"/>
              <MenuItem value='French' primaryText="French"/>
              <MenuItem value='Unknown' primaryText="Unknown"/>
            </SelectField>
            <SelectField
              floatingLabelText="Country"
              value={this.state.countryValue}
              onChange={this.handleChangeCountry}>
              <MenuItem value='All' primaryText="All"/>
              <MenuItem value='CA' primaryText="Canada"/>
              <MenuItem value='UK' primaryText="United Kingdom"/>
              <MenuItem value='FR' primaryText="France"/>
              <MenuItem value='AU' primaryText="Australia"/>
            </SelectField>
            <SelectField
              floatingLabelText="Region"
              value={this.state.regionValue}
              onChange={this.handleChangeRegion}>
              <MenuItem value={1} primaryText="All"/>
              <MenuItem value={2} primaryText="Alberta"/>
              <MenuItem value={3} primaryText="British Columbia"/>
              <MenuItem value={4} primaryText="Manitoba"/>
              <MenuItem value={5} primaryText="New Brunswick"/>
              <MenuItem value={6} primaryText="Nova Scotia"/>
              <MenuItem value={7} primaryText="Ontario"/>
              <MenuItem value={8} primaryText="Prince Edward Island"/>
              <MenuItem value={9} primaryText="Quebec"/>
              <MenuItem value={10} primaryText="Saskatchewan"/>
              <MenuItem value={11} primaryText="Territories"/>
            </SelectField>
            <SelectField
              floatingLabelText="Town"
              value={this.state.townValue}
              onChange={this.handleChangeTown}>
              <MenuItem value={1} primaryText="All"/>
            </SelectField>
          </div>
        </Paper>
        <Tabs>
          <Tab label='Feed'>
            <div className={styles.content}>
              {this.generateCards()}
            </div>
            <div className={styles.pagination}>
              <IconButton
                onTouchTap={() => this.getFirstPage()}
                disabled={this.state.currentPage <= 0}
                tooltip="First page">
                <FirstIcon/>
              </IconButton>
              <IconButton
                onTouchTap={() => this.getPreviousPage()}
                disabled={this.state.currentPage <= 0}
                tooltip="Previous page">
                <PreviousIcon/>
              </IconButton>
              <span className={styles.currentPage}>{this.state.currentPage}</span>
              <IconButton
                onTouchTap={() => this.getNextPage()}
                disabled={this.state.currentPage >= this.state.maxPage}
                tooltip="Next page">
                <NextIcon/>
              </IconButton>
              <IconButton
                onTouchTap={() => this.getLastPage()}
                disabled={this.state.currentPage >= this.state.maxPage}
                tooltip="Last page">
                <LastIcon/>
              </IconButton>
            </div>
          </Tab>
          <Tab label='Trasmit'></Tab>
          <Tab label='Scrape'></Tab>
          <Tab label='Statistics'></Tab>
        </Tabs>
      </div>
    );
  }
}

export default First;
