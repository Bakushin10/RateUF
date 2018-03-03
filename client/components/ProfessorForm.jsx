import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Select, Radio, Input, Slider, Icon, Rate, Button, Card } from 'antd';
import styled from 'styled-components';
import { Redirect } from 'react-router';

import Head from './Header-Footer/Head';

var querystring = require('querystring');
const FormItem = Form.Item;
const { TextArea } = Input;

const WarningOn = styled.span`
  color: #fc2f4e;
`;
const WarningOff = styled.span`
  color: #6be594;
`;

class ProfessorForm extends React.Component {
  constructor() {
    super();
    this.state = {
      overallExpe: 0,
      levelOfDiffculty: 0,
      communicationOfIdeas: 0,
      facilitationOfLearning: 0,
      wouldTakeAgain: 'Yes', //by default
      extraComment: '',
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
    console.log(this.state.extraComment);
  }

  insertNewProfessorReview() {
    axios.post('/insertNewProfessorReview',
        querystring.stringify({
          overallExpe: this.state.overallExpe,
          levelOfDiffculty: this.state.levelOfDiffculty,
          communicationOfIdeas: this.state.communicationOfIdeas,
          facilitationOfLearning: this.state.facilitationOfLearning,
          wouldTakeAgain: this.state.wouldTakeAgain,
          extraComment: this.state.extraComment,
          major: this.props.match.params.major,
          name: this.props.match.params.profName
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
      this.state.extraComment === ''
    ) {
      this.setState({ hasError: true }); //trigger the error message
    } else {
      //  will be updated
      this.insertNewProfessorReview();
    }
  }

  getLabel(val, tag) {
    if (val === '' || val === 0) {
      return <WarningOn> *{tag} </WarningOn>;
    } else {
      return <WarningOff> {tag} </WarningOff>;
    }
  }

  render() {
    const profName = this.props.match.params.profName;
    const hasError = this.state.hasError;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 9 }
    };
    
    // redirect to ProfessorDetails page after revire is successfully submitted
    if(this.state.submitted){
      return (<Redirect to ={`/ProfessorDetails/${this.props.match.params.major}/${this.props.match.params.id}/${this.props.match.params.profName}/${"success"}`}/>);
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
            <FormItem {...formItemLayout} label={this.getLabel(this.state.overallExpe, 'Overall Experices')}>
              <Slider
                onChange={this.overAllExpeOnChange}
                value={this.state.overallExpe}
                defaultValue={0}
                marks={{
                  0: (
                    <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }} /><div>meh</div></div>
                  ),
                  50: (
                    <div><Icon type="meh-o" style={{ fontSize: 15, color: '#08c' }} /><div>good</div></div>
                  ),
                  100: (
                    <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }} /><div>excellent</div></div>
                  )
                }}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={this.getLabel(this.state.levelOfDiffculty, 'Level of Difficulty')}>
              <Slider
                onChange={this.levelOfDiffcultyOnChange}
                value={this.state.levelOfDiffculty}
                defaultValue={0}
                marks={{
                  0: (
                    <div> <Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }} /><div>meh</div></div>
                  ),
                  50: (
                    <div><Icon type="meh-o" style={{ fontSize: 15, color: '#08c' }} /><div>good</div></div>
                  ),
                  100: (
                    <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }} /><div>excellent</div></div>
                  )
                }}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.getLabel(this.state.communicationOfIdeas, 'Communication of Ideas')}
            >
              <Slider
                onChange={this.communicationOfIdeasOnChange}
                value={this.state.communicationOfIdeas}
                defaultValue={0}
                marks={{
                  0: (
                    <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }} /><div>meh</div></div>
                  ),
                  50: (
                    <div><Icon type="meh-o" style={{ fontSize: 15, color: '#08c' }} /><div>good</div></div>
                  ),
                  100: (
                    <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }} /><div>excellent</div></div>
                  )
                }}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={this.getLabel(this.state.facilitationOfLearning, 'Facilitation Of Learning')}
            >
              <Slider
                onChange={this.facilitationOfLearningOnChange}
                value={this.state.facilitationOfLearning}
                defaultValue={0}
                marks={{
                  0: (
                    <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }} /><div>meh</div></div>
                  ),
                  50: (
                    <div><Icon type="meh-o" style={{ fontSize: 15, color: '#08c' }} /><div>good</div> </div>
                  ),
                  100: (
                    <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }} /><div>excellent</div></div>
                  )
                }}
              />
            </FormItem>
            <FormItem {...formItemLayout} label={this.getLabel(this.state.extraComment, 'Comment')}>
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
        <div hidden={this.state.submitted}>
          <Link to={`/ProfessorForm/${this.state.major}/${this.state.profName}`}></Link>
        </div>
        {/* <Footer /> */}
      </div>
      </div>
    );
  }
}

export default ProfessorForm;
