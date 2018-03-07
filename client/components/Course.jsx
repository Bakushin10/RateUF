import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider,Menu, Dropdown, Button, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import { CourseList } from './CourseList';

import Head from './Header-Footer/Head';

class Course extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMajor: 'CS',
      course: [], //array courses to keep
      courseToShow: [], //this array will change based on the search
      searchTerm: '', // user input for search
      loading: false,
      hasMore: true,
      dataloaded : false
    };

    this.getAllCoursesByMajor = this.getAllCoursesByMajor.bind(this);
    this.handleSearchCourse = this.handleSearchCourse.bind(this);
    this.searchCourse = this.searchCourse.bind(this);
  }

  handleInfiniteOnLoad() {
    let data = this.state.course;
    this.setState({
      loading: true
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false
      });
      return;
    }
    this.getData(res => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false
      });
    });
  }

  componentDidMount() {
    this.getAllCoursesByMajor(this, 'CS');
    //  this.setState({selectedMajor:'CS'});
  }

  handleSearchCourse(e) {
    this.setState({ searchTerm: e.target.value });
    this.searchCourse();
  }

  searchCourse() {
    const selectedCourse = this.state.course.filter(course => {
      if (`${course.courseName}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0 ||
          `${course.courseCode}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0) {
        return course;
      }
    });
    this.setState({ courseToShow: selectedCourse });
  }

  getAllCoursesByMajor(self, major) {
    axios
      .get('/getAllCoursesByMajor',{
          params:{
            major : major
          }
      }) //passing major as an argument
      .then(function(response) {
        self.setState({ course: response.data });
        self.setState({ courseToShow: response.data });
        self.setState({ dataloaded : true});
      });
  }

  handleInfiniteOnLoad() {
    let data = this.state.course;
    this.setState({
      loading: true
    });
  }

  changeProfByMajor(e, major) {
    if (this.state.selectedMajor != major) {
      this.setState({ selectedMajor: major }); //update currently selected major
      this.getAllCoursesByMajor(this, major);
    }
  }

  render() {

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const menu = (
        <Menu>
          <Menu.Item >
             <div onClick = { (e) => this.changeProfByMajor(e,"CS")} align="center" >CS</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick = { (e) => this.changeProfByMajor(e,"ECE")} align="center" >ECE</div>
          </Menu.Item>
          <Menu.Item>
            <div onClick = { (e) => this.changeProfByMajor(e,"MATH")} align="center">MATH</div>
          </Menu.Item>
        </Menu>
      );

    console.log(this.state)
    
    return(
      <div>
        <Head />
          <div className = "container">
            <div>
              <Form>
                <Input
                  type="text"
                  value={this.state.searchTerm}
                  placeholder="Search Your Courses. ex) 'COP 4600' or 'operating systems'"
                  onChange={this.handleSearchCourse}
                />
              </Form>
            </div>
            <div>
                <Dropdown overlay = {menu} title="Change Major">
                    <Button >Change Major</Button>
                </Dropdown>
            </div>
            { CourseList(this.state.courseToShow, this.state.loading, 
                          this.state.hasMore, this.handleInfiniteOnLoad, this.state.dataloaded) }
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default Course;
