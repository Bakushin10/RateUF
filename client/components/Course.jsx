import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Slider,Menu, Dropdown, Button, Form} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Head from './Header-Footer/Head';

const CourseName = styled.h5`
  color: #878fad;
  padding-top: 15px;
  padding-left: 30px;
`;

class Course extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMajor: 'CS',
      course: [], //array courses to keep
      courseToShow: [], //this array will change based on the search
      searchTerm: '', // user input for search
      loading: false,
      hasMore: true
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

  getAllCoursesByMajor(ev, major) {
    axios
      .get('/getAllCoursesByMajor',{
          params:{
            major : major
          }
      }) //passing major as an argument
      .then(function(response) {
        ev.setState({ course: response.data });
        ev.setState({ courseToShow: response.data });
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
    const pagination = {
      pageSize: 10,
      current: 1,
      total: this.state.course.length,
      onChange: () => {}
    };

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
                          <form>
                              <Form
                                  type="text"
                                  value={this.state.searchTerm}
                                  placeholder="Search Your Courses"
                                  onChange={this.handleSearchCourse}
                              />
                          </form>
                      </div>
                      <div>
                          <Dropdown overlay = {menu} title="Change Major">
                              <Button >Change Major</Button>
                          </Dropdown>
                      </div>
                      <InfiniteScroll className = "demo-infinite-container"
                          initialLoad={false}
                          pageStart={0}
                          loadMore={this.handleInfiniteOnLoad}
                          hasMore={!this.state.loading && this.state.hasMore}
                          useWindow={false}
                      >
                      <List 
                          itemLayout="vertical"
                          size="large"
                          pagination={pagination}
                          dataSource={ this.state.courseToShow }
                          renderItem={item => (
                              <Link to={`/ClassDetails/${item.major}/${item._id}/${item.courseCode}`}>

                                              <CourseName>
                                                  <div>{item.courseCode}</div>
                                                  <div>{item.courseName}</div>
                                              </CourseName>
                                          <Slider className = "ant-slider-disabled" /*.ant-slider-disabled*/
                                              defaultValue={30} 
                                              disabled = {true} 
                                              marks={{ 
                                                      30: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                                                      60: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>, 
                                                      90: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div> 
                                                      }}
                                          />
                                      <List.Item xs = {9} md = {9}
                                          key={item.id}
                                          /*
                                          actions={[<IconText type="star-o" text="156" />, 
                                                  <IconText type= "like-o" text="156" />, 
                                                  <IconText type="message" text="2" />]}
                                          */
                          >
                              <List.Item.Meta />
                          </List.Item>
                      </Link>
                      )}
                  />
              </InfiniteScroll>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default Course;
