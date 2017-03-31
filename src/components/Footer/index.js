import React from 'react';

import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.footer}>
    <img className={styles.myAvatarAlt} src="http://i.imgur.com/mTjWfR3.png"/>
    <p className='smol'>Handmade by me © 2017.</p>
  </footer>
);

export default Footer;
