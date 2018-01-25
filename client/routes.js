//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import FourOhFour from './components/FourOhFour'

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/home' component={Home} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;