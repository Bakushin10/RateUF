//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Add from './Add';
import Home from './Home';

export default class App extends React.Component {

  render() {
    
    const FourOhFour = () =><h1>404</h1>

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path ="/" component = { Add }/>
          <Route path ="/home" component = { Home }/>
          <Route component = { FourOhFour }/>
        </Switch>
      </BrowserRouter>
    );
  }
}