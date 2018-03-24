import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Select, Radio, Input, Slider, Icon, Rate, Button, Card } from 'antd';
import { Redirect } from 'react-router';
import { GetSliderMark, GetLabel } from '../utility/commonJS'

import Head from '../Header-Footer/Head';

var querystring = require('querystring');
const FormItem = Form.Item;
const { TextArea } = Input;

class ProfessorForm extends React.Component {
  constructor() {
    super();
    this.state = {
      overallExpe: 0,
      levelOfDiffculty: 0,
      communicationOfIdeas: 0,
      facilitationOfLearning: 0,
      wouldTakeAgain: 'Yes', //by default
      howIsTheProfessor : [],
      tipsForSuccess : [],
      course : [],
      extraComment: '',
      courseTakenFor : '',
      hasError: false,
      submitted : false
    };

    this.overAllExpeOnChange = this.overAllExpeOnChange.bind(this);
    this.levelOfDiffcultyOnChange = this.levelOfDiffcultyOnChange.bind(this);
    this.communicationOfIdeasOnChange = this.communicationOfIdeasOnChange.bind(this);
    this.facilitationOfLearningOnChange = this.facilitationOfLearningOnChange.bind(this);
    this.wouldTakeAgainOnChange = this.wouldTakeAgainOnChange.bind(this);
    this.extraCommentOnChange = this.extraCommentOnChange.bind(this);
    this.submitClicked = this.submitClicked.bind(this);
    this.insertNewProfessorReview = this.insertNewProfessorReview.bind(this);
    this.howIsTheProfessorOnChange = this.howIsTheProfessorOnChange.bind(this);
    this.getHowIstheProfessorOption = this.getHowIstheProfessorOption.bind(this);
    this.courseTakenForOnChange = this.courseTakenForOnChange.bind(this);
    this.TipsForSuccessOnChange = this.TipsForSuccessOnChange.bind(this);
    this.getAllCoursesByMajor = this.getAllCoursesByMajor.bind(this);
    this.getTipsForSuccess = this.getTipsForSuccess.bind(this);
  }

  overAllExpeOnChange(value) {
    this.setState({ overallExpe: value });
  }

  levelOfDiffcultyOnChange(value) {
    this.setState({ levelOfDiffculty: value });
  }

  communicationOfIdeasOnChange(value) {
    this.setState({ communicationOfIdeas: value });
  }

  facilitationOfLearningOnChange(value) {
    this.setState({ facilitationOfLearning: value });
  }
  wouldTakeAgainOnChange(value) {
    this.setState({ wouldTakeAgain: value });
  }

  extraCommentOnChange(e) {
    this.setState({ extraComment: e.target.value });
  }

  howIsTheProfessorOnChange(value){
    this.setState({howIsTheProfessor : value})
  }

  TipsForSuccessOnChange(value){
    this.setState({tipsForSuccess : value})
    console.log(this.state.tipsForSuccess);
  }

  courseTakenForOnChange(value){
    this.setState({courseTakenFor : value})
  }

  componentDidMount(){
    this.getAllCoursesByMajor(this, this.props.match.params.major);
  }

  getAllCoursesByMajor(self, major) {
    axios.get('/getAllCoursesByMajor',{
          params:{
            major : major
          }
      }) //passing major as an argument
      .then(function(response) {
        self.setState({ course: response.data });
        //self.setState({ dataloaded : true});
      });
  }

  insertNewProfessorReview() {
    axios.post('/insertNewProfessorReview',
        querystring.stringify({
          overallExpe: this.state.overallExpe,
          levelOfDiffculty: this.state.levelOfDiffculty,
          communicationOfIdeas: this.state.communicationOfIdeas,
          facilitationOfLearning: this.state.facilitationOfLearning,
          howIsTheProfessor : this.state.howIsTheProfessor,
          wouldTakeAgain: this.state.wouldTakeAgain,
          extraComment: this.state.extraComment,
          courseTakenFor : this.state.courseTakenFor,
          major: this.props.match.params.major,
          name: this.props.match.params.profName,
          tipsForSuccess : this.state.tipsForSuccess
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(function(response) {
        //go to submit successfully page
        console.log(response.data);
      });
      

      this.setState({submitted : true})
  }

  submitClicked() {
    if (
      this.state.overallExpe === 0 ||
      this.state.levelOfDiffculty === 0 ||
      this.state.communicationOfIdeas === 0 ||
      this.state.facilitationOfLearning === 0 ||
      this.state.howIsTheProfessor.length === 0 ||
      this.state.courseTakenFor.length === 0 ||
      this.state.tipsForSuccess.length === 0 ||
      this.state.extraComment === ''
    ) {
      this.setState({ hasError: true }); //trigger the error message
    } else {
      //  will be updated
      this.insertNewProfessorReview();
    }
  }

  getCourseOption(){
    return(
      <Select
        placeholder="How is the Professor ?"
        onChange={this.courseTakenForOnChange}
      >
        {
          this.state.course.map(course =>(
            <Select.Option value= {course.courseCode}>{course.courseCode + " " + course.courseName}</Select.Option>
          ))
        }
    </Select>
    )
  }

  getTipsForSuccess(){
    return(
      <Select 
        mode="multiple" 
        placeholder="How is the Professor ?"
        onChange={this.TipsForSuccessOnChange}
      >
        <Select.Option value="option1">option1</Select.Option>
        <Select.Option value="option2">option2</Select.Option>
      </Select>
    )
  }

  getHowIstheProfessorOption(){
    return(
      <Select 
        mode="multiple" 
        placeholder="How is the Professor ?"
        onChange={this.howIsTheProfessorOnChange}
      >
        <Select.Option value="Easy">Easy</Select.Option>
        <Select.Option value="meh, okay">meh, okay</Select.Option>
        <Select.Option value="Hard">Hard</Select.Option>
        <Select.Option value="Group Project">Group Project</Select.Option>
        <Select.Option value="Caring">Caring</Select.Option>
        <Select.Option value="Tough Grader">Tough Grader</Select.Option>
        <Select.Option value="Test Heavy">Test Heavy</Select.Option>
      </Select>
    )
  }

  render() {
    const profName = this.props.match.params.profName;
    const hasError = this.state.hasError;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 9 }
    };
    
    // redirect to ProfessorDetails page after review is successfully submitted
    if(this.state.submitted){
      return (<Redirect to ={`/ProfessorDetails/${this.props.match.params.major}/${this.props.match.params.profName}/${"success"}`}/>);
    }
    
    return (
      <div>
      <Head />
      <div className="button-center">
        <h1>{profName}</h1>
        <div>
          <Card style={{ width: 500 }} hidden={!hasError}>
            {' '}
            {/*only show when the input errors are detected */}
            <p> <Icon type="exclamation-circle-o" /> Please Check your inputs ! </p>
          </Card>
        </div>
        <div align="center">
          <Form>
            <FormItem {...formItemLayout} label={ GetLabel(this.state.courseTakenFor, 'What class did you take this professor for ?')}>
                { this.getCourseOption()}
            </FormItem>
            <FormItem {...formItemLayout} label={ GetLabel(this.state.howIsTheProfessor, 'How is the Professor')}>
                { this.getHowIstheProfessorOption()}
            </FormItem>




            <FormItem {...formItemLayout} label={ GetLabel(this.state.tipsForSuccess, 'Tips for success')}>
                { this.getTipsForSuccess()}
            </FormItem>





            <FormItem {...formItemLayout} label={ GetLabel(this.state.overallExpe, 'Overall Experices')}>
              <Slider
                onChange={this.overAllExpeOnChange}
                value={this.state.overallExpe}
                defaultValue={0}
                marks={GetSliderMark()}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={ GetLabel(this.state.levelOfDiffculty, 'Level of Difficulty')}>
              <Slider
                onChange={this.levelOfDiffcultyOnChange}
                value={this.state.levelOfDiffculty}
                defaultValue={0}
                marks={GetSliderMark()}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={ GetLabel(this.state.communicationOfIdeas, 'Communication of Ideas')}
            >
              <Slider
                onChange={this.communicationOfIdeasOnChange}
                value={this.state.communicationOfIdeas}
                defaultValue={0}
                marks={GetSliderMark()}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={ GetLabel(this.state.facilitationOfLearning, 'Facilitation Of Learning')}
            >
              <Slider
                onChange={this.facilitationOfLearningOnChange}
                value={this.state.facilitationOfLearning}
                defaultValue={0}
                marks={GetSliderMark()}
              />
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
            <FormItem {...formItemLayout} label="Would Take This Professor Again?">
              <Select name="select" defaultValue="Yes" style={{ width: 80 }} onChange={this.wouldTakeAgainOnChange}>
                <Select.Option value={'Yes'}> Yes </Select.Option>
                <Select.Option value={'No'}> No </Select.Option>
              </Select>
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

export default ProfessorForm;
