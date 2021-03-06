import React from 'react';
import axios from 'axios';
import { Menu, Dropdown, Button, List, Avatar, Icon, Slider, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { GetSuccessMessage, getPreviousCourse, getDepartment} from '../utility/commonJS';
import { GetMessageOrGraph, GetReview } from './ProfDetailComponent';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Redirect } from 'react-router';
import 'antd/dist/antd.css';
import Head from '../Header-Footer/Head';
import Foot from '../Header-Footer/Foot';

class ProfessorDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      profName: '',
      id: '',
      major: '',
      reviews: [], //has reviews
      previousCourse : [],
      hasReview : false,
      overAllExpe : 0,
      isOverAllExpeUpdated : false,
      submitSuccess : false,
      dataloaded : false,
      redirectCourse : false
    };
    this.getProfInfo = this.getProfInfo.bind(this);
    this.getProfReview = this.getProfReview.bind(this);
    this.getFieldValueForProfessor = this.getFieldValueForProfessor.bind(this);
    this.updateValueForOverAllExperience = this.updateValueForOverAllExperience.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  componentDidMount() {
    let self = this;
    let courses;
    const name = this.props.match.params.name;
    const major = this.props.match.params.major;

    self.getProfInfo(self, major, name);
    self.getProfReview(self, major, name)
    
    /*  
      obtain a list of all major for overview
    */
    axios.get('/getAllCoursesByMajor',{
          params:{
            major : major
          }
      }).then(function(response) {

        courses = response.data;
        
        axios.get('/getPreviousCourse', {
          params: {
            major: major,
            name : name
          }
        }).then(function(response) {
          let noDuplicate = []
          const arr = response.data.coursePreviouslyTaught;
          
          // trimming the duplicate from course
          for(var i = 0; i < arr.length ;i++){
            var hasDuplicate = false
            for(var j = 0; j < noDuplicate.length; j++){
              if(arr[i].courseCode === noDuplicate[j].courseCode){
                  hasDuplicate = true
              }
            }
            if(!hasDuplicate){
              noDuplicate.push(arr[i])
            }
          }
    
          //assign overview for previous courses
          for(var i = 0; i < noDuplicate.length;i++){
            for(var j = 0; j < courses.length ;j ++){
              if(noDuplicate[i].courseCode === courses[j].courseCode){
                var course = {
                  courseCode : noDuplicate[i].courseCode,
                  overview : courses[j].overview
                }
                self.setState({ previousCourse: self.state.previousCourse.concat([course])});
              }
            }
          }
    
          self.setState({ dataloaded : true });
        });
      });

    if(this.props.match.params.submissionSuccess === "success"){
       this.setState({submitSuccess : true})
     }
  }
  
  getProfReview(self, major, name){
    axios.get('/getProfReviews', {
      params: {
        major: major,
        name: name
      }
    }).then(function(response) {
      self.setState({ reviews: response.data.review });
    });
  }

  getProfInfo(self, major, name) {
    axios.get('/getProfDetails', {
        params: {
          major: major,
          name: name
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
    this.setState({ overAllExpe: profInfo.overview });
  }

  getFieldValueForProfessor(ProfFields){
    let tempLevelOfDiff = 0;
    let tempCommOfIdea = 0;
    let tempFaciliOfLearning = 0;

    for(let i = 0; i < this.state.reviews.length;i++){
      tempLevelOfDiff += this.state.reviews[i].levelOfDiffculty;
      tempCommOfIdea += this.state.reviews[i].communicationOfIdeas;
      tempFaciliOfLearning += this.state.reviews[i].facilitationOfLearning;
    }

    ProfFields.levelOfDiff = (tempLevelOfDiff/this.state.reviews.length);
    ProfFields.CommOfIdea = (tempCommOfIdea/this.state.reviews.length);
    ProfFields.FaciliOfLearning = (tempFaciliOfLearning/this.state.reviews.length);
    ProfFields.hasReview = true;
  }
  
  handleMenuClick(e) {
    //TODO
    console.log('click', e.keyPath[0]);
    this.setState({ redirectTo : e.keyPath[0] })
    this.setState({ redirectCourse : true })
    //return (<Redirect to ={`/ClassDetails/${this.props.match.params.major}/${e.keyPath[0]}`}/>);
  }
  
  updateValueForOverAllExperience(){
    let overAllExpe = 0;
    let self = this;
    const name = this.props.match.params.name;
    const major = this.props.match.params.major;

    for(let i = 0; i < this.state.reviews.length; i++){
      overAllExpe += this.state.reviews[i].overallExpe;
    }

    const averageOverAllExpe = overAllExpe/this.state.reviews.length;

    //update the overAllExpe after new overAllExpe was calculated
    axios.get('/updateOverAllExpeForAProf', {
      params: {
        major: major,
        name: name,
        overAllExpe : averageOverAllExpe
      }
    })
    .then(function(response) {
      self.setState({ overAllExpe: averageOverAllExpe });
      self.setState({ isOverAllExpeUpdated : true});
    });
  }

  render() {
    //console.log(this.state);
    const ProfFields = {
      levelOfDiff : 0,
      CommOfIdea : 0,
      FaciliOfLearning : 0,
      hasReview : this.state.hasReview
    }

    // get values for graph if there are any reviews
    if(typeof this.state.reviews !== 'undefined' && this.state.reviews.length > 0){
      this.getFieldValueForProfessor(ProfFields);
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
        <Head/>
          <div className="container">
            <div>
              { GetSuccessMessage(this.state.submitSuccess) }
            </div>
            <div className= "prof">
              <Row>
                <Col span={8} className = "title-detail-page">
                  {this.state.profName}
                </Col>
                <Col span={8}></Col>
                <Col span={6} className = "title-detail-page">
                  <div className="profRateButtom">
                    {/* <p className="profRateText">Taken this professor? </p> */}
                    <Button type="primary" >
                      <Link to={`/ProfessorForm/${this.state.major}/${this.state.profName}`}>
                        <Icon type="form" /> Rate this professor
                      </Link>
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="profDept department">
                    <h6>{getDepartment(this.state.major)}</h6>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
              <Tabs>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Comments</Tab>
                  <Tab>Previous Courses</Tab>
                </TabList>

                <TabPanel>
                  { GetMessageOrGraph(ProfFields, this.state) }
                </TabPanel>
                <TabPanel>
                  <div className="the-graphs">
                    { GetReview(ProfFields.hasReview, this.state)}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="the-graphs">
                    { getPreviousCourse(this.state.major, this.state.previousCourse, "professor")}
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
          <Foot/>
      </div>
    );
  }
}

export default ProfessorDetails;
