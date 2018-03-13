//client/routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

import ProfessorForm from './components/Professor/ProfessorForm';
import Professor from './components/Professor/Professor';
import ProfessorDetails from './components/Professor/ProfessorDetails';
import Course from './components/Course/Course';
import CourseDetails from './components/Course/CourseDetails';
import ClassForm from './components/Course/ClassForm';
import FourOhFour from './components/utility/FourOhFour';

import cseCatalog from './components/CourseCatalog/cseCatalog';
import cscCatalog from './components/CourseCatalog/cscCatalog';
import ceCatalog from './components/CourseCatalog/ceCatalog';
import eeCatalog from './components/CourseCatalog/eeCatalog';
import mathCatalog from './components/CourseCatalog/mathCatalog';
//import cePrereq from './components/prerequisites/cePrereq';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Professor' component={Professor} />
      <Route path='/ProfessorDetails/:major/:name/:submissionSuccess?' component={ProfessorDetails} />
      <Route path='/ProfessorForm/:major/:profName' component={ProfessorForm} />
      <Route path='/Class' component={Course} />
      <Route path='/ClassDetails/:major/:courseCode/:submissionSuccess?' component={CourseDetails} />
      <Route path='/ClassForm/:major/:courseCode/:courseName' component={ClassForm} />

      <Route path='/ComputerScienceEngineeringCatalog' component={cseCatalog} />
      <Route path='/ComputerScienceLiberalArtsCatalog' component={cscCatalog} />
      <Route path='/ComputerEngineeringCatalog' component={ceCatalog} />
      <Route path='/ElectricalEngineeringCatalog' component={eeCatalog} />
      <Route path='/MathCatalog' component={mathCatalog} />
      {/*<Route path='/cePrereq' component={cePrereq} />*/}

      <Route component={FourOhFour} />

    </Switch>
);
import ClassForm from './components/ClassForm';

import FourOhFour from './components/FourOhFour';

export default Routes;