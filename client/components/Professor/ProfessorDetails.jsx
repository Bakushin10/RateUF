import React from 'react';
import axios from 'axios';
import { Menu, Dropdown, Button, List, Avatar, Icon, Slider, Card } from 'antd';
import { Link } from 'react-router-dom';
import { GetSuccessMessage } from '../utility/commonJS';
import { GetMessageOrGraph, GetReview } from './ProfDetailComponent';
import { Redirect } from 'react-router';
import 'antd/dist/antd.css';
import Head from '../Header-Footer/Head';

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
      redirectCourse : false,
      redirectTo : '',
    };
    this.getProfInfo = this.getProfInfo.bind(this);
    this.getProfReview = this.getProfReview.bind(this);
    this.getFieldValueForProfessor = this.getFieldValueForProfessor.bind(this);
    this.updateValueForOverAllExperience = this.updateValueForOverAllExperience.bind(this);
    this.getPreviousCourse = this.getPreviousCourse.bind(this);
    this.getMenuItemForPreviousCourse = this.getMenuItemForPreviousCourse.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  componentDidMount() {
    let self = this;
    const name = this.props.match.params.name;
    const major = this.props.match.params.major;

    self.getProfInfo(self, major, name);
    self.getProfReview(self, major, name)

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
    })
    .then(function(response) {
      self.setState({ reviews: response.data.review });
      self.setState({ dataloaded : true });
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

  getPreviousCourse(){
    for(var i = 0;i< this.state.reviews.length;i++){
      let hasValue = false;
      for(var j = 0; j < this.state.previousCourse.length ;j++){
        if(this.state.previousCourse[j] === this.state.reviews[i].courseTakenFor){
          hasValue = true;
        }
      }
      if(!hasValue){
        const item = this.state.previousCourse;
        item[i] = this.state.reviews[i].courseTakenFor;
      }
    }
  }

  getMenuItemForPreviousCourse(){
    return(
      <Menu onClick={this.handleMenuClick}>
      {
        this.state.previousCourse.map(course => (
          <Menu.Item key = {course} >{ course }</Menu.Item>
        ))
      }
      </Menu>
    )
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
    console.log(this.state);
    const ProfFields = {
      levelOfDiff : 0,
      CommOfIdea : 0,
      FaciliOfLearning : 0,
      hasReview : this.state.hasReview
    }
    let menu = ( 
      <Menu><Menu.Item>No courses to show</Menu.Item></Menu>
    );

    if(this.state.redirectCourse){
      return (<Redirect to ={`/ClassDetails/${this.props.match.params.major}/${this.state.redirectTo}`}/>);
    }
    // get values for graph if there are any reviews
    if(typeof this.state.reviews !== 'undefined' && this.state.reviews.length > 0){
      this.getFieldValueForProfessor(ProfFields);
      this.getPreviousCourse();
      menu = (
        this.getMenuItemForPreviousCourse()
      );
    }

    //only execute ONCE to update overall experience value when a review was submitted.   
    if(this.props.match.params.submissionSuccess === "success" && this.state.isOverAllExpeUpdated === false){

      if(this.props.match.params.submissionSuccess === "success" && 
         typeof this.state.reviews !== 'undefined' && this.state.reviews.length > 0){
        this.updateValueForOverAllExperience()
      }
    }

    const data = [
      { subject: 'Level of Difficulty', prof: ProfFields.levelOfDiff, average: 50, fullMark: 100 },
      { subject: 'Communication of Ideas', prof: ProfFields.CommOfIdea, average: 70, fullMark: 100 },
      { subject: 'Facilitation Of Learning', prof: ProfFields.FaciliOfLearning, average: 80, fullMark: 100 },
    ];

    return (
      <div>
        <Head />
          <div className="container">
            <div>
              { GetSuccessMessage(this.state.submitSuccess) }
            </div>
            <div>
              {this.state.profName}
                <div>
                  <Button type="primary" ghost>
                    <Link to={`/ProfessorForm/${this.state.major}/${this.state.profName}`}>
                      <Icon type="form" /> Rate this professor
                    </Link>
                  </Button>
                </div>
                  Departmemnt : {this.state.major}
                <div>
                  <Dropdown overlay={menu} title="previous course">
                    <Button>See previous course</Button>
                  </Dropdown>
                </div>
                <div>OverAll Experiense { parseFloat(this.state.overAllExpe).toFixed(1)}</div>
                <div>Level of Difficulty { parseFloat(ProfFields.levelOfDiff).toFixed(1)}</div>
                <div>Communication of Ideas { parseFloat(ProfFields.CommOfIdea).toFixed(1)}</div>
                <div>Facilitation Of Learning { parseFloat(ProfFields.FaciliOfLearning).toFixed(1)}</div>
            </div>
            <div>
              { GetMessageOrGraph(ProfFields.hasReview, this.state.dataloaded, this.state.profName, this.state.major, data) }
              { GetReview(ProfFields.hasReview, this.state.reviews)}
            </div>
          </div>
      </div>
    );
  }
}

export default ProfessorDetails;