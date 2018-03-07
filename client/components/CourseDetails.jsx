import React from 'react';
import axios from 'axios';
import { List, Avatar, Icon, Slider, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'antd';
import {Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

import 'antd/dist/antd.css';
import Head from './Header-Footer/Head';
import { ShowArrays, GetMessageIfNoReview, GetSuccessMessage } from './commonJS';

class CourseDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      courseCode: '',
      courseName: '',
      id: '',
      major: '',
      reviews: [], //has reviews,
      overAllExpe : 0,
      isOverAllExpeUpdated : false,
      submitSuccess : false,
      dataloaded : false 
    };
    this.getFieldValueForProfessor = this.getFieldValueForProfessor.bind(this);
    this.updateValueForOverAllExperience = this.updateValueForOverAllExperience.bind(this);
  }

  componentDidMount() {
    let self = this;
    const _id = this.props.match.params.id;
    const courseCode = this.props.match.params.courseCode;
    const major = this.props.match.params.major;

    axios.get('/getCourseDetails', {
        params: {
          major: major,
          courseCode: courseCode
        }
      })
      .then(function(response) {
        self.init(response.data);
      });

    axios.get('/getCourseReviews', {
        params: {
          major: major,
          courseCode: courseCode
        }
      })
      .then(function(response) {
        console.log('getCourseReviews');
        console.log(response.data.review);
        self.setState({ reviews: response.data.review });
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
      { subject: 'Level of Difficulty', prof: ProfFields.levelOfDiff, average: 50, fullMark: 100 }
    ];

    return (
      <div>
      <Head />
      <div className="container">
        <div>
          { GetSuccessMessage(this.state.submitSuccess) }
        </div>
        <div>
          <div>{this.state.courseCode}</div>
          <div>{this.state.courseName}</div>
            <div>
              <Button type="primary" ghost>
                <Link to={`/ClassForm/${this.state.major}/${this.state.courseCode}/${this.state.courseName}`}>
                  <Icon type="form" /> Rate this Course
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
          </div>
          <div>
              { GetMessageIfNoReview(ProfFields.hasReview, this.state.dataloaded) }
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
                    {/* show the knowBeforeCourse Array */}
                    knowBeforeCourse:
                    { ShowArrays(item.knowBeforeCourse) }
                  </div>
                  <div>
                    {/* show the HowIdTHeClass Array */}
                    howIsTheClass:
                    { ShowArrays(item.howIsTheClass) }
                  </div>
                  <div>
                    Prof : 
                    {item.whoTookWith}
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

export default CourseDetails;
