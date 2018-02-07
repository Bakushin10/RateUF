//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ProfessorForm from './components/ProfessorForm';
import Professor from './components/Professor';
import ProfessorDetails from './components/ProfessorDetails';
import ClassForm from './components/ClassForm';
import FourOhFour from './components/FourOhFour'

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/ProfessorForm' component={ProfessorForm} />
      <Route path='/Professor' component={Professor} />
      <Route path='/ProfessorDetails/:id' component={ProfessorDetails} />
      <Route path='/ClassForm' component={ClassForm} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;