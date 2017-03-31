import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';
import {white} from 'material-ui/styles/colors';

import styles from './Header.css';

const Header = () => (
  <AppBar
    className={styles.header}
    iconElementLeft={< IconButton tooltip = 'Menu' > <MenuIcon color={white}/> < /IconButton>}
    iconElementRight={< IconButton tooltip = 'More' > <MoreVertIcon/> < /IconButton>}/>
);

export default Header;
