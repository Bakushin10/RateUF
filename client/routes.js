//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import App from './components/App';
import Home from './components/Home';
import Add from './components/Add';
import Professor from './components/Professor';
import ProfessorDetails from './components/ProfessorDetails';
import FourOhFour from './components/FourOhFour'

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Add' component={Add} />
      <Route path='/Professor' component={Professor} />
      <Route path='/ProfessorDetails/:id' component={ProfessorDetails} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;