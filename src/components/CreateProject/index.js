import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import faker from 'faker';
import Paper from 'material-ui/Paper';
import {browserHistory} from 'react-router';

import styles from './CreateProject.css';
import TextForm from '../../components/TextForm';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
  }
  render() {
    return (
      <div className={styles.createProject}>
        <Paper className={styles.paper}>
          {this.state.step === 0
            ? <div style={{
                width: '100%'
              }}>
                <h2>CreateProject page</h2>
                <p>{faker.lorem.paragraph(a)}</p>
              </div>
            : <div style={{
              width: '100%'
            }}>
              <TextForm/>
            </div>}
          <div className={styles.btnContainer}>
            <FlatButton
              onTouchTap={() => {
              this.setState({
                step: this.state.step + 1
              })
            }}
              label='Create Project'/>
          </div>
        </Paper>
      </div>
    );
  }
}

export default CreateProject;
