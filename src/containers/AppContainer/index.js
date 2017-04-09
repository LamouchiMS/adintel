// Subscribe to store here
import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout from '../../containers/Layout';
import First from '../../components/First';
import Database from '../../containers/Database';
import MassComm from '../../containers/MassComm';
import Projects from '../../containers/Projects';
import Scraper from '../../containers/Scraper';
import Statistics from '../../containers/Statistics';
import Talks from '../../containers/Talks';
import CreateProject from '../../components/CreateProject';

const AppContainer = () => (
  <div>
    <Router history={browserHistory} path={'/'}>
      <Route path={'/'} component={Layout}>
        <IndexRoute component={First}/>
        <Route path={'database'} component={Database}/>
        <Route path={'masscomm'} component={MassComm}/>
        <Route path={'projects'} component={Projects}/>
        <Route path={'scraper'} component={Scraper}/>
        <Route path={'statistics'} component={Statistics}/>
        <Route path={'talks'} component={Talks}/>
        <Route path={'createProject'} component={CreateProject}/>
      </Route>
    </Router>
  </div>
);

export default AppContainer;
