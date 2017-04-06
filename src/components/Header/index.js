import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import {white} from 'material-ui/styles/colors';
import DatabaseIcon from 'material-ui/svg-icons/content/archive';
import MassCommIcon from 'material-ui/svg-icons/communication/rss-feed';
import TalksIcon from 'material-ui/svg-icons/communication/chat';
import ProjectsIcons from 'material-ui/svg-icons/places/free-breakfast';
import StatisticsIcon from 'material-ui/svg-icons/social/poll';
import ScraperIcon from 'material-ui/svg-icons/image/flash-on';
import HomeIcon from 'material-ui/svg-icons/action/home';
import MenuItem from 'material-ui/MenuItem';
import {browserHistory} from 'react-router';

import styles from './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  changeRoute(route) {
    this.setState({
      open: false
    }, () => {
      browserHistory.push(route);
    });
  }
  render() {
    return (
      <div>
        <AppBar
          className={styles.header}
          iconElementLeft={< IconButton onTouchTap = {
          () => this.setState({open: true})
        }
        tooltip = 'Menu' > <MenuIcon color={white}/> < /IconButton>}
          iconElementRight={< IconButton tooltip = 'More' > <MoreVertIcon/> < /IconButton>}/>
        <Drawer
          className={styles.drawer}
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <AppBar title="Adintel" showMenuIconButton={false}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/')
          }}
            primaryText="Home"
            leftIcon={< HomeIcon />}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/database')
          }}
            primaryText="Database"
            leftIcon={< DatabaseIcon />}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/masscomm')
          }}
            primaryText="Mass Comm"
            leftIcon={< MassCommIcon />}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/projects')
          }}
            primaryText="Projects"
            leftIcon={< ProjectsIcons />}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/scraper')
          }}
            primaryText="Scraper"
            leftIcon={< ScraperIcon />}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/statistics')
          }}
            primaryText="Statistics"
            leftIcon={< StatisticsIcon />}/>
          <MenuItem
            onTouchTap={() => {
            this.changeRoute('/talks')
          }}
            primaryText="Talks"
            leftIcon={< TalksIcon />}/>
        </Drawer>
      </div>
    );
  }
}

export default Header;
