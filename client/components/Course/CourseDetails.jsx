import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import { Redirect } from 'react-router';
import 'antd/dist/antd.css';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';
import { GetSuccessMessage } from '../utility/commonJS';
import { GetMessageOrGraph, GetReview } from './CourseDetailComponent';

class CourseDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      courseCode: '',
      courseName: '',
      id: '',
      major: '',
      reviews: [], //has reviews,
      previousProf : [],
      overAllExpe : 0,
      isOverAllExpeUpdated : false,
      submitSuccess : false,
      dataloaded : false,
      redirectCourse : false,
      redirectTo : '',
    };
    this.getFieldValueForProfessor = this.getFieldValueForProfessor.bind(this);
    this.updateValueForOverAllExperience = this.updateValueForOverAllExperience.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this)
    this.getMenuItemForPreviousProf = this.getMenuItemForPreviousProf.bind(this);
  }

  componentDidMount() {
    let self = this;
    let professors;
    const courseCode = this.props.match.params.courseCode;
    const major = this.props.match.params.major;

    /* 
    obtain a list of all major for overview
    */
    axios.get('/getAllProfByMajor',{
            params:{
              major : major
            }
        }).then(function(response) {
          professors = response.data;
        });

    axios.get('/getCourseDetails', {
        params: {
          major: major,
          courseCode: courseCode
        }
      }).then(function(response) {
        self.init(response.data);
      });

    axios.get('/getCourseReviews', {
        params: {
          major: major,
          courseCode: courseCode
        }
      }).then(function(response) {
        self.setState({ reviews: response.data.review });
      });

    axios.get('/getPreviousProf', {
        params: {
          major: major,
          courseCode : courseCode
        }
      }).then(function(response) {
        const arr = response.data.ProfPreviouslyTaught;
        let noDuplicate = []

        // trimming the duplicate 
        for(var i = 0; i < arr.length ;i++){
          var hasDuplicate = false
          for(var j = 0; j < noDuplicate.length; j++){
            if(arr[i].name === noDuplicate[j].name){
                hasDuplicate = true
            }
          }
          if(!hasDuplicate){
            noDuplicate.push(arr[i])
          }
        }

        //assign overview for previous courses
        for(var i = 0; i < noDuplicate.length;i++){
          for(var j = 0; j < professors.length; j++){
            if(noDuplicate[i].name === professors[j].name){
              var professor = {
                name : noDuplicate[i].name,
                overview : professors[j].overview
              }
              self.setState({ previousProf: self.state.previousProf.concat([professor])});
            }
          }
        }

        self.setState({ dataloaded : true });
      });

      if(this.props.match.params.submissionSuccess === "success"){
        this.setState({submitSuccess : true})
      }
  }

  init(courseInfo) {
    this.setState({ courseCode: courseInfo.courseCode });
    this.setState({ courseName: courseInfo.courseName });
    this.setState({ id: courseInfo._id });
    this.setState({ major: courseInfo.major });
    this.setState({ overAllExpe: courseInfo.overview });
  }

  jumpToSelectedClass(e, major) {
    console.log('clicked!');
  }

  getFieldValueForProfessor(ProfFields){
    let tempLevelOfDiff = 0;

    for(let i = 0; i < this.state.reviews.length;i++){
      tempLevelOfDiff += this.state.reviews[i].levelOfDiffculty;
    }

    ProfFields.levelOfDiff = (tempLevelOfDiff/this.state.reviews.length);
    ProfFields.hasReview = true;
  }

  handleMenuClick(e) {
    //TODO
    console.log('click', e.keyPath[0]);
    this.setState({ redirectTo : e.keyPath[0] })
    this.setState({ redirectCourse : true })
    //return (<Redirect to ={`/ClassDetails/${this.props.match.params.major}/${e.keyPath[0]}`}/>);
  }

  getMenuItemForPreviousProf(){
    return(
      <Menu onClick={this.handleMenuClick}>
      {
        this.state.previousProf.map(prof => (
          <Menu.Item key = { prof.name } >{ prof.name+ "  " + prof.overview + "/100" }</Menu.Item>
        ))
      }
      </Menu>
    )
  }

  updateValueForOverAllExperience(){
    let overAllExpe = 0;
    let self = this;
    const major = this.props.match.params.major;
    const courseCode = this.props.match.params.courseCode;

    for(let i = 0; i < this.state.reviews.length; i++){
      overAllExpe += this.state.reviews[i].overallExpe;
    }

    const averageOverAllExpe = overAllExpe/this.state.reviews.length;

    //update the overAllExpe after new overAllExpe was calculated
    axios.get('/updateOverAllExpeForACourse', {
      params: {
        major: major,
        courseCode: courseCode,
        overAllExpe : averageOverAllExpe
      }
    })
    .then(function(response) {
      self.setState({ overAllExpe: averageOverAllExpe });
      self.setState({ isOverAllExpeUpdated : true});
    });
  }

  render() {
    console.log(this.state);
    const ProfFields = {
      levelOfDiff : 0,
      hasReview : this.state.hasReview
    }
    let menu = (
      <Menu><Menu.Item>No Professors to show</Menu.Item></Menu>
    );

    if(this.state.redirectCourse){
      return (<Redirect to ={`/ProfessorDetails/${this.props.match.params.major}/${this.state.redirectTo}`}/>);
    }

    // get values for graph if there are any reviews
    if(typeof this.state.reviews !== 'undefined' && this.state.reviews.length > 0){
      this.getFieldValueForProfessor(ProfFields);
      menu = (
        this.getMenuItemForPreviousProf()
      );
    }

    //only execute ONCE to update overall experience value when a review was submitted.   
    if(this.props.match.params.submissionSuccess === "success" && this.state.isOverAllExpeUpdated === false){

      if(this.props.match.params.submissionSuccess === "success" && 
         typeof this.state.reviews !== 'undefined' && this.state.reviews.length > 0){
        this.updateValueForOverAllExperience()
      }
    }

    return (
      <div>
        <Head />
        <div className="container">
          <div>
            { GetSuccessMessage(this.state.submitSuccess) }
          </div>
          <div className="class-deets">
            <div className="class-code">{this.state.courseCode}</div>
            <div className="class-name">{this.state.courseName}</div>
            Departmemnt : {this.state.major}
            
              <div>
              <br/>
              <div className="class-taken"> Taken This Course? </div>
                <Button type="primary" ghost>
                  <Link to={`/ClassForm/${this.state.major}/${this.state.courseCode}/${this.state.courseName}`}>
                    <Icon type="form" /> Rate this Course
                  </Link>
                </Button>
              </div>
              <br/>      
              <div>
                <Dropdown overlay={menu} title="previous course">
                  <Button>Previous Professors</Button>
                </Dropdown>
              </div>
              <br/>
            </div>
            <div>
                { GetMessageOrGraph(ProfFields, this.state) }
                <div className="the-graphs">{ GetReview(ProfFields.hasReview, this.state)}</div>
            </div>
        </div>
        <Foot />
      </div>
    );
  }
}

export default CourseDetails;
