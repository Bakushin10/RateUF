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
import CSEPrereq from './components/Prereqs/CSEPrereq';
import CSCPrereq from './components/Prereqs/CSCPrereq';
import CEPrereq from './components/Prereqs/CEPrereq';
import EEPrereq from './components/Prereqs/EEPrereq';
import MATHPrereq from './components/Prereqs/MATHPrereq';
import CSECatalog from './components/CourseCatalog/CSECatalog';
import CSCCatalog from './components/CourseCatalog/CSCCatalog';
import CECatalog from './components/CourseCatalog/CECatalog';
import EECatalog from './components/CourseCatalog/EECatalog';
import MATHCatalog from './components/CourseCatalog/MATHCatalog';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/Professor' component={Professor} />
      <Route path='/ProfessorDetails/:major/:name/:submissionSuccess?' component={ProfessorDetails} />
      <Route path='/ProfessorForm/:major/:profName' component={ProfessorForm} />
      <Route path='/Class' component={Course} />
      <Route path='/ClassDetails/:major/:courseCode/:submissionSuccess?' component={CourseDetails} />
      <Route path='/ClassForm/:major/:courseCode/:courseName' component={ClassForm} />
      <Route path='/CSEPrereq' component={CSEPrereq} />
      <Route path='/CSCPrereq' component={CSCPrereq} />
      <Route path='/CEPrereq' component={CEPrereq} />
      <Route path='/EEPrereq' component={EEPrereq} />
      <Route path='/MATHPrereq' component={MATHPrereq} />
      <Route path='/CSECatalog' component={CSECatalog} />
      <Route path='/CSLACatalog' component={CSCCatalog} />
      <Route path='/CECatalog' component={CECatalog} />
      <Route path='/EECatalog' component={EECatalog} />
      <Route path='/MATHCatalog' component={MATHCatalog} />
      <Route component={FourOhFour} />
    </Switch>
);

export default Routes;