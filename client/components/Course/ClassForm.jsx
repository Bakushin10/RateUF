import React from 'react';
import axios from 'axios';
import { Form, Select, Input, Slider, Icon, Button, Checkbox, Row, Col } from 'antd';
import Head from '../Header-Footer/Head';
import { Redirect } from 'react-router';
import { GetSliderMark, GetLabel, GetErrorMessage } from '../utility/commonJS';

var querystring = require('querystring');
const FormItem = Form.Item;
const { TextArea } = Input;

class ClassForm extends React.Component {
  constructor() {
    super();

    this.state = {
      courseCode: '',
      courName: '',
      overallExpe: 0,
      levelOfDiffculty: 0,
      extraComment: '',
      knowBeforeCourse: [],
      howIsTheClass: [],
      hasError: false,
      submitted : false,
      whoTookWith: '',
      professor : []
    };

    this.overAllExpeOnChange = this.overAllExpeOnChange.bind(this);
    this.levelOfDiffcultyOnChange = this.levelOfDiffcultyOnChange.bind(this);
    this.knowBeforeCourseOnChange = this.knowBeforeCourseOnChange.bind(this);
    this.howIsTheClassOnChange = this.howIsTheClassOnChange.bind(this);
    this.whoTookWithOnChange = this.whoTookWithOnChange.bind(this);
    this.extraCommentOnChange = this.extraCommentOnChange.bind(this);
    this.submitClicked = this.submitClicked.bind(this);
    this.insertNewCourseReview = this.insertNewCourseReview.bind(this);
    this.getKnowBeforeCourseOption = this.getKnowBeforeCourseOption.bind(this);
    this.getHowIstheClassOption = this.getHowIstheClassOption.bind(this);
    this.getAllProfByMajor = this.getAllProfByMajor.bind(this);
    this.getWhoTookWithOption = this.getWhoTookWithOption.bind(this);
  }

  componentDidMount(){
    this.getAllProfByMajor(this, this.props.match.params.major);
  }

  overAllExpeOnChange(value) {
    this.setState({ overallExpe: value });
  }

  levelOfDiffcultyOnChange(value) {
    this.setState({ levelOfDiffculty: value });
  }

  knowBeforeCourseOnChange(value) {
    this.setState({ knowBeforeCourse: value });
  }

  howIsTheClassOnChange(value) {
    this.setState({ howIsTheClass: value });
  }

  whoTookWithOnChange(value){
    this.setState({whoTookWith : value});
  }

  extraCommentOnChange(e) {
    this.setState({ extraComment: e.target.value });
  }

  getAllProfByMajor(ev, major) {
    axios.get('/getAllProfByMajor', {
        params: {
          major: major
        }
      })
      .then(function(response) {
        ev.setState({ professor: response.data });
      });
  }

  insertNewCourseReview() {
    axios.post('/insertNewCourseReview',
      querystring.stringify({
        overallExpe: this.state.overallExpe,
        levelOfDiffculty: this.state.levelOfDiffculty,
        extraComment: this.state.extraComment,
        knowBeforeCourse: this.state.knowBeforeCourse,
        howIsTheClass: this.state.howIsTheClass, 
        major: this.props.match.params.major,
        courseCode: this.props.match.params.courseCode,
        whoTookWith : this.state.whoTookWith
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )
    
    axios.post('/updatePreviousHistory',
      querystring.stringify({
        name : this.state.whoTookWith,
        major: this.props.match.params.major,
        courseCode : this.props.match.params.courseCode,
        courseName : this.props.match.params.courseName
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).then(function(response) {
      //go to submit successfully page
      console.log(response.data);
    });

      this.setState({submitted : true})
  }

  submitClicked() {
    if (
      this.state.overallExpe === 0 ||
      this.state.levelOfDiffculty === 0 ||
      this.state.knowBeforeCourse.length === 0 ||
      this.state.howIsTheClass.length === 0 ||
      this.state.extraComment === '' ||
      this.state.whoTookWith === ''
    ) {
      this.setState({ hasError: true });
    } else {
      this.insertNewCourseReview();
    }
  }

  getKnowBeforeCourseOption(major){

    if(major === 'CS'){
      return(
        <Select 
          mode="multiple" 
          placeholder="Please select the skills students should before taking this course"
          onChange={this.knowBeforeCourseOnChange}
        >
          <Select.Option value="Nothing">Nothing</Select.Option>
          <Select.Option value="java">Java</Select.Option>
          <Select.Option value="C">C</Select.Option>
          <Select.Option value="C++">C++</Select.Option>
          <Select.Option value="JavaScript">JavaScript</Select.Option>
          <Select.Option value="Python">Python</Select.Option>
          <Select.Option value="Git">Git</Select.Option>
          <Select.Option value="Some Programming Experiences">Some Programming Experiences</Select.Option>
        </Select>
      )
    }
    if(major === 'ECE'){
      return(
        <Select 
          mode="multiple" 
          placeholder="Please select the skills students should before taking this course"
          onChange={this.knowBeforeCourseOnChange}
        >
          <Select.Option value="Nothing">Nothing</Select.Option>
          <Select.Option value="some ECE classes">some ECE classes</Select.Option>
          <Select.Option value="C">C</Select.Option>
          <Select.Option value="Some Programming Experiences">Some Programming Experiences</Select.Option>
        </Select>
      )
    }
    if(major === 'MATH'){
      return(
        <Select 
          mode="multiple" 
          placeholder="Please select the skills students should before taking this course"
          onChange={this.knowBeforeCourseOnChange}
        >
          <Select.Option value="Nothing">Nothing</Select.Option>
          <Select.Option value="MATLAB">MATLAB</Select.Option>
          <Select.Option value="Trig">Trig</Select.Option>
          <Select.Option value="Calc 1">Calc 1</Select.Option> 
          <Select.Option value="Calc 2">Calc 2</Select.Option>
          <Select.Option value="Calc 3">Calc 3</Select.Option>
          <Select.Option value="Higher math courses">Higher math courses</Select.Option>
          <Select.Option value="Some Programming Experiences">Some Programming Experiences</Select.Option>
        </Select>
      )
    }
  }

  getHowIstheClassOption(){
    return(
        <Select 
          mode="multiple" 
          placeholder="How is the course itself ?"
          onChange={this.howIsTheClassOnChange}
        >
          <Select.Option value="class is easy">class is easy</Select.Option>
          <Select.Option value="material is hard">material is hard</Select.Option>
          <Select.Option value="busy work">busy work</Select.Option>
          <Select.Option value="Weekly quizzes">Weekly quizzes</Select.Option>
          <Select.Option value="lecture heavy">lecture heavy</Select.Option>
          <Select.Option value="attendance mandatory">attendance mandatory</Select.Option>
          <Select.Option value="hard Projects">hard projects</Select.Option>
          <Select.Option value="Hard exams">Hard exams</Select.Option>
          <Select.Option value="easy exams">easy exams</Select.Option>
        </Select>
    )
  }

    getWhoTookWithOption(){
      return(
        <Select
          placeholder="Please pick a professor you took this course with"
          onChange={this.whoTookWithOnChange}
        >
          <Select.Option value= "Don't remeber">Don't remeber</Select.Option>
          {
            this.state.professor.map(prof =>(
              <Select.Option value= {prof.name}>{prof.name}</Select.Option>
            ))
          }
        </Select>
      )
    }

  render() {
    console.log(this.state)
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 10 }
    };
    const hasError = this.state.hasError;
    const courseCode = this.props.match.params.courseCode;
    const courseName = this.props.match.params.courseName;

    // redirect to ProfessorDetails page after review is successfully submitted
    if(this.state.submitted){
      return (<Redirect to ={`/ClassDetails/${this.props.match.params.major}/${this.props.match.params.courseCode}/${"success"}`}/>);
    }
    
    return (
      <div>
        <Head />
        <div className="button-center">
          <h1 class="class-code">{courseCode}</h1>
          <h1 class="class-name">{courseName}</h1>
          {GetErrorMessage(hasError)} {/* input error check*/}
          <div align="center">
            <Form style={{ position:'relative', display:'block', background: '#ffffff', borderRadius:'25px', width:'60%' }}>
              <br/>
              <FormItem {...formItemLayout} label={ GetLabel(this.state.whoTookWith, 'Who did you take with ?')}>
                {this.getWhoTookWithOption()}
              </FormItem>
              <FormItem {...formItemLayout} label={ GetLabel(this.state.howIsTheClass, 'How is the class ?')}>
                {this.getHowIstheClassOption()}
              </FormItem>
              <FormItem {...formItemLayout} label={ GetLabel(this.state.overallExpe, 'Overall Experiences')}>
                <Slider
                  onChange={this.overAllExpeOnChange}
                  value={this.state.overallExpe}
                  defaultValue={0}
                  marks={ GetSliderMark() }
                />
              </FormItem>
              <FormItem {...formItemLayout} label={ GetLabel(this.state.levelOfDiffculty, 'Level of Difficulty')}>
                <Slider
                  onChange={this.levelOfDiffcultyOnChange}
                  value={this.state.levelOfDiffculty}
                  defaultValue={0}
                  marks={ GetSliderMark() }
                />
              </FormItem>
              <FormItem {...formItemLayout} label={ GetLabel(this.state.knowBeforeCourse, 'Know Before Course')}>
                  {this.getKnowBeforeCourseOption(this.props.match.params.major)}
              </FormItem>
              <FormItem {...formItemLayout} label={ GetLabel(this.state.extraComment, 'Comment')}>
                <TextArea
                  type="text"
                  value={this.state.extraComment}
                  placeholder="enter text"
                  rows={4}
                  onChange={this.extraCommentOnChange}
                />
              </FormItem>
              <FormItem>
                <Button align="center" type="primary" htmlType="submit" onClick={this.submitClicked}>
                  Submit
                </Button>
              </FormItem>
            </Form>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
export default ClassForm;
