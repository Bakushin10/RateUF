import React from 'react';
import axios from 'axios';
import { Menu, Dropdown, Button, List, Avatar, Icon, Slider, Card } from 'antd';
import { Link } from 'react-router-dom';
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
      reviews: [], //has reviews
      hasReview : false,
      overAllExpe : 0,
      isOverAllExpeUpdated : false,
      submitSuccess : false
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

    overAllExpe = overAllExpe/this.state.reviews.length;

    //update the overAllExpe after new overAllExpe was calculated
    axios.get('/updateOverAllExpeForAProf', {
      params: {
        major: major,
        _id: _id,
        overAllExpe : overAllExpe
      }
    })
    .then(function(response) {
      self.setState({ overAllExpe: overAllExpe });
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
              <Card style={{ width: 500 }} hidden={!this.state.submitSuccess}>
                <p> <Icon type="check-circle-o" /> Thank you! Your revire was successfully submitted ! (make Icon big, message green)</p>
              </Card>
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
                <div>OverAll Experiense {this.state.overAllExpe}</div>
                <div>Level of Difficulty {ProfFields.levelOfDiff}</div>
                <div>Communication of Ideas { ProfFields.CommOfIdea}</div>
                <div>Facilitation Of Learning {ProfFields.FaciliOfLearning}</div>
            </div>
            <div hidden={ProfFields.hasReview}> {/* if there are no review, show the message*/}
              <Card style={{ width: 500 }}>
                <p> Be the first one to review this Professor ! </p>
              </Card>
            </div>
            <div hidden={!ProfFields.hasReview}> {/* if there are at least one review, show the prof detail*/}
              <div>
                <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                  <Radar name= {this.state.profName} dataKey="prof" stroke="#e858bf" fill="#e858bf" fillOpacity={0.6}/>
                  <Radar name= {this.state.major + " Professors Average"}exoerience dataKey="average" stroke="#4e42f4" fill="#4e42f4" fillOpacity={0.6}/>
                  <PolarGrid />
                  <Legend />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]}/>
                </RadarChart>
              </div>
              <div>
                <div>
                  comment section
                </div>
                <List
                  className="demo-loadmore-list"
                  // loading={loading}
                  itemLayout="horizontal"
                  // loadMore={loadMore}
                  dataSource={this.state.reviews}
                  renderItem={item => (
                    <List.Item actions={[<Icon type="like" />, <Icon type="dislike" />]}>
                      <List.Item.Meta
                        // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        //title={<a href="https://ant.design">{item.name.last}</a>}
                        description = {item.extraComment}
                      />
                      <div>
                        Would you take this professor again <p>{item.wouldTakeAgain}</p>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default ProfessorDetails;
