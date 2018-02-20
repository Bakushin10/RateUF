import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider } from 'antd';
import { Link } from 'react-router-dom';
import { Row, Grid, Col } from 'react-bootstrap';
import { Menu, Dropdown, Button } from 'antd';

import 'antd/dist/antd.css';
import Head from './Header-Footer/Head';

class CourseDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      courseCode: '',
      courseName: '',
      id: '',
      major: '',
      reviews: [] //has reviews
    };
  }

  componentDidMount() {
    let self = this;
    const _id = this.props.match.params.id;
    const courseCode = this.props.match.params.courseCode;
    const major = this.props.match.params.major;

    axios
      .get('/getCourseDetails', {
        params: {
          major: major,
          courseCode: courseCode
        }
      })
      .then(function(response) {
        self.init(response.data);
      });

    axios
      .get('/getCourseReviews', {
        params: {
          major: major,
          courseCode: courseCode
        }
      })
      .then(function(response) {
        console.log('getCourseReviews');
        console.log(response.data.review);
        self.setState({ reviews: response.data.review });
      });
  }

  init(courseInfo) {
    this.setState({ courseCode: courseInfo.courseCode });
    this.setState({ courseName: courseInfo.courseName });
    this.setState({ id: courseInfo._id });
    this.setState({ major: courseInfo.major });
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

    return (
      <div>
      <Head />
      <div className="container">
        <Grid>
          <Row>
            {' '}
            {/* fitst row */}
            <Col xs={3} md={3}>
              <div>{this.state.courseCode}</div>
              <div>{this.state.courseName}</div>
              <div>
                <Button type="primary" ghost>
                  <Link to={`/ClassForm/${this.state.major}/${this.state.courseCode}/${this.state.courseName}`}>
                    Rate this Course
                  </Link>
                </Button>
              </div>
            </Col>
            <Col xs={3} md={3}>
              Departmemnt : {this.state.major}
              <div>
                <Dropdown overlay={menu} title="previous course">
                  <Button>See previous course</Button>
                </Dropdown>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div>OverAll Experiense</div>
              <div>OverAll Experiense</div>
            </Col>
          </Row>
          <Col>
            list of form here
            {/* list of form here */}
          </Col>
        </Grid>
      </div>
      </div>
    );
  }
}

export default CourseDetails;
