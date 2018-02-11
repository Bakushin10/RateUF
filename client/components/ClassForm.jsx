import React from 'react';
import { Form, Select, Input, Slider, Icon, Button, Checkbox, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import Header from './Header';
import Footer from './Footer';

const FormItem = Form.Item;
const { TextArea } = Input;

class ClassForm extends React.Component {

    constructor(){
        super();

        this.state = {
            overallExpe : 0,
            levelOfDiffculty : 0,
            extraComment: '',
            knowBeforeCourse: ''
        }

        this.overAllExpeOnChange = this.overAllExpeOnChange.bind(this);
        this.levelOfDiffcultyOnChange = this.levelOfDiffcultyOnChange.bind(this);
        this.checkboxOnChange = this.checkboxOnChange.bind(this);
        this.knowBeforeCourseOnChange = this.knowBeforeCourseOnChange.bind(this);
        this.extraCommentOnChange = this.extraCommentOnChange.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    overAllExpeOnChange(value){
        this.setState({overallExpe : value})
        console.log("overallExpe")
        console.log(this.state.overallExpe)
    }

    levelOfDiffcultyOnChange(value){
        this.setState({levelOfDiffculty : value})
        console.log("levelOfDiff")
        console.log(this.state.levelOfDiffculty)
    }

    checkboxOnChange(value){
        this.setState({a : value})
        console.log("checkboxOnChange")
    }

    knowBeforeCourseOnChange(e){
        this.setState({ knowBeforeCourse: e.target.value })
        console.log(this.state.knowBeforeCourse)
    }

    extraCommentOnChange(e){
        this.setState({ extraComment: e.target.value })
        console.log(this.state.extraComment)
    }

    submitClicked(){
        console.log("submitted");
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol : {span: 10}
        };


        return (
            <div className='button-center'>
                <Header />
                <h1>Rate a Class</h1>

                <div align="center">
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label = "Select a Class"
                            hasFeedback
                        >
                            <Select name="select" placeholder="Please select a Class" style={{ width: 150 }}>
                                <Select.Option value="CDA 4630">CDA 4630 Embedded Systems</Select.Option>
                                <Select.Option value="CIS 4914">CIS 4914 Senior Project</Select.Option>
                                <Select.Option value="COP 3502">COP 3503 Programming 1</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Overall Experience"
                        >
                            <Slider
                                onChange = {this.overAllExpeOnChange}
                                value = {this.state.overallExpe}
                                defaultValue={0}
                                marks = {{
                                    0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                                    50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                                    100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                                }} 
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Level of Difficulty"
                        >
                            <Slider
                                onChange = {this.levelOfDiffcultyOnChange}
                                value = {this.state.levelOfDiffculty}
                                defaultValue =  {0}
                                marks={{
                                    0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                                    50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                                    100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                                }}
                            />
                        </FormItem>
                        <FormItem  
                            {...formItemLayout}
                            label="What to know before the course"
                        >
                            <TextArea
                                type = "text"
                                value = {this.state.knowBeforeCourse}
                                placeholder = "enter text"
                                rows={4} 
                                onChange = {this.knowBeforeCourseOnChange}
                            />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="Extra Comments"
                        >
                            <TextArea
                                type = "text"
                                value = {this.state.extraComment}
                                placeholder = "enter text"
                                rows={4} 
                                onChange = {this.extraCommentOnChange}
                            />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="Select what to know beforehand"
                        >
                            <Checkbox.Group style={{ width: '100%' }} onChange={this.checkboxOnChange}>
                                <Row>
                                    <Col span={8}><Checkbox value="Java">Java</Checkbox></Col>
                                    <Col span={8}><Checkbox value="C++">C++</Checkbox></Col>
                                    <Col span={8}><Checkbox value="C">C</Checkbox></Col>
                                    <Col span={8}><Checkbox value="JavaScript">JavaScript</Checkbox></Col>
                                    <Col span={8}><Checkbox value="Git">Git</Checkbox></Col>
                                    <Col span={8}><Checkbox value="some sort of coding experiences">some sort of coding experiences</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        </FormItem>
                        <FormItem>
                            <Button align="center" type="primary" htmlType="submit" onClick = {this.submitClicked}>
                                Submit
                            </Button>
                        </FormItem>
                    </Form>
                </div>
                <Footer />
            </div>
        )
    }
}
export default ClassForm;
