//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import ProfessorForm from './components/ProfessorForm';
import Professor from './components/Professor';
import ProfessorDetails from './components/ProfessorDetails';
import Course from './components/Course';
import CourseDetails from './components/CourseDetails';
import ClassForm from './components/ClassForm';
import FourOhFour from './components/FourOhFour';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Professor' component={Professor} />
      <Route path='/ProfessorDetails/:major/:id/:name' component={ProfessorDetails} />
      <Route path='/ProfessorForm/:major/:profName' component={ProfessorForm} />
      <Route path='/Class' component={Course} />
      <Route path='/ClassDetails/:major/:id/:courseCode' component={CourseDetails} />
      <Route path='/ClassForm/:major/:courseCode/:courseName' component={ClassForm} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;