import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {browserHistory} from 'react-router';

import styles from './Projects.css';

const Projects = () => (
  <div>
    <p>Projects page</p>
    <FloatingActionButton
      onTouchTap={() => {
      browserHistory.push('/createProject')
    }}
      className={styles.fab}>
      <ContentAdd/>
    </FloatingActionButton>
  </div>
);

export default Projects;
