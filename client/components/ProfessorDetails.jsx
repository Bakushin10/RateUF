import React from 'react';
import axios from 'axios';
import { Menu, Dropdown, Button, List, Avatar, Icon, Slider, Card } from 'antd';
import { Link } from 'react-router-dom';
import { GetSuccessMessage } from './commonJS';
import { GetMessageOrGraph, GetReview } from './ProfDetailComponent';

import 'antd/dist/antd.css';
import Head from './Header-Footer/Head';
import Foot from './Header-Footer/Foot';

class ProfessorDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      profName: '',
      id: '',
      major: '',
      reviews: [], //has reviews
      hasReview : false,
      overAllExpe : 0,
      isOverAllExpeUpdated : false,
      submitSuccess : false,
      dataloaded : false 
    };
    this.getProfInfo = this.getProfInfo.bind(this);
    this.getProfReview = this.getProfReview.bind(this);
    this.getFieldValueForProfessor = this.getFieldValueForProfessor.bind(this);
    this.updateValueForOverAllExperience = this.updateValueForOverAllExperience.bind(this);
  }

  componentDidMount() {
    let self = this;
    const _id = this.props.match.params.id;
    const name = this.props.match.params.name;
    const major = this.props.match.params.major;

    self.getProfInfo(self, major, _id);
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
      console.log('getProfReview');
      console.log(response.data.review);
      self.setState({ reviews: response.data.review });
      self.setState({ dataloaded : true });
    });
  }

  getProfInfo(self, major, _id) {
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
    this.setState({ overAllExpe: profInfo.overview });
  }

  jumpToSelectedClass(e, major) {
    //TODO
    console.log('clicked!');
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
  
  updateValueForOverAllExperience(){
    let overAllExpe = 0;
    let self = this;
    const _id = this.props.match.params.id;
    const major = this.props.match.params.major;

    for(let i = 0; i < this.state.reviews.length; i++){
      overAllExpe += this.state.reviews[i].overallExpe;
    }

    const averageOverAllExpe = overAllExpe/this.state.reviews.length;

    //update the overAllExpe after new overAllExpe was calculated
    axios.get('/updateOverAllExpeForAProf', {
      params: {
        major: major,
        _id: _id,
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
    const menu = (
      <Menu>
        <Menu.Item onClick={e => this.jumpToSelectedClass(e, 'CS')}>CS</Menu.Item>
        <Menu.Item onClick={e => this.jumpToSelectedClass(e, 'ECE')}>ECE</Menu.Item>
        <Menu.Item onClick={e => this.jumpToSelectedClass(e, 'MATH')}>MATH</Menu.Item>
      </Menu>
    );

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
                    <Link to={`/ProfessorForm/${this.state.major}/${this.props.match.params.id}/${this.state.profName}`}>
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
                <div>OverAll Experiense {parseFloat(this.state.overAllExpe).toFixed(1)}</div>
                <div>Level of Difficulty {parseFloat(ProfFields.levelOfDiff).toFixed(1)}</div>
                <div>Communication of Ideas { parseFloat(ProfFields.CommOfIdea).toFixed(1)}</div>
                <div>Facilitation Of Learning {parseFloat(ProfFields.FaciliOfLearning).toFixed(1)}</div>
            </div>
            <div>
              { GetMessageOrGraph(ProfFields.hasReview, this.state.dataloaded, this.state.profName, this.state.major, data) }
              { GetReview(ProfFields.hasReview, this.state.reviews)}
            </div>
          </div>
          <Foot />
      </div>
    );
  }
}

export default ProfessorDetails;
