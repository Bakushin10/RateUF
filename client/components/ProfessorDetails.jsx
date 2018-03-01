import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider } from 'antd';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

import 'antd/dist/antd.css';
import Head from './Header-Footer/Head';

class ProfessorDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      profName: '',
      id: '',
      major: '',
      reviews: [] //has reviews
    };
    this.getProfInto = this.getProfInto.bind(this);
  }

  componentDidMount() {
    let self = this;
    const _id = this.props.match.params.id;
    const name = this.props.match.params.name;
    const major = this.props.match.params.major;

    axios
      .get('/getProfDetails', {
        params: {
          major: major,
          _id: _id
        }
      })
      .then(function(response) {
        self.init(response.data);
      });

    axios
      .get('/getProfReviews', {
        params: {
          major: major,
          name: name
        }
      })
      .then(function(response) {
        console.log('getProfReview');
        console.log(response.data.review);
        self.setState({ reviews: response.data.review });
      });
  }

  getProfInto() {
    axios
      .get('/getProfDetails', {
        params: {
          major: major,
          _id: _id
        }
      })
      .then(function(response) {
        self.init(response.data);
      });
  }

  init(profInfo) {
    this.setState({ profName: profInfo.name });
    this.setState({ id: profInfo._id });
    this.setState({ major: profInfo.major });
  }

  jumpToSelectedClass(e, major) {
    console.log('clicked!');
  }

  render() {
    console.log(this.state);
    const menu = (
      <Menu>
        <Menu.Item onClick={e => this.jumpToSelectedClass(e, 'CS')}>CS</Menu.Item>
        <Menu.Item onClick={e => this.jumpToSelectedClass(e, 'ECE')}>ECE</Menu.Item>
        <Menu.Item onClick={e => this.jumpToSelectedClass(e, 'MATH')}>MATH</Menu.Item>
      </Menu>
    );

    const data = [
    { subject: 'Math', A: 100, B: 80, fullMark: 100 },
    { subject: 'Chinese', A: 100, B: 70, fullMark: 100 },
    { subject: 'English', A: 20, B: 80, fullMark: 100 },
    { subject: 'Geography', A: 45, B: 100, fullMark: 100 },
    { subject: 'Physics', A: 60, B: 100, fullMark: 100 },
    { subject: 'History', A: 100, B: 100, fullMark: 100 },
];

    return (
      <div>
      <Head />
      <div className="container">
              {this.state.profName}
              <div>
                <Button type="primary" ghost>
                  <Link to={`/ProfessorForm/${this.state.major}/${this.state.profName}`}>Rate this professor</Link>
                </Button>
              </div>
              Departmemnt : {this.state.major}
              <div>
                <Dropdown overlay={menu} title="previous course">
                  <Button>See previous course</Button>
                </Dropdown>
              </div>
              <div>OverAll Experiense</div>
              <div>OverAll Experiense</div>
            list of form here
            <div>
              <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}/>
                <PolarGrid />
                <Legend />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]}/>
              </RadarChart>
            </div>
      </div>
      </div>
    );
  }
}

export default ProfessorDetails;
