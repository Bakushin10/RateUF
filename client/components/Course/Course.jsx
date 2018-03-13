import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider,Menu, Dropdown, Button, Form, Input} from 'antd';
import 'antd/dist/antd.css';
import Search from '../utility/Search';

import Head from '../Header-Footer/Head';

class Course extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMajor: 'CS',
      course: [], //array courses to keep
      loading: false,
      hasMore: true,
      dataloaded : false
    };

    this.getAllCoursesByMajor = this.getAllCoursesByMajor.bind(this);
    this.handleSearchCourse = this.handleSearchCourse.bind(this);
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
                <Dropdown overlay = {menu} title="Change Major">
                    <Button >Change Major</Button>
                </Dropdown>
            </div>
            { <Search {...this.state} type = {"Course"} /> }
        </div>
      </div>
    );
  }
}

export default Course;