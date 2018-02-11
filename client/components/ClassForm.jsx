import React from 'react';
import { Form, Select, Input, Slider, Icon, Button, Checkbox, Row, Col, Card} from 'antd';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const FormItem = Form.Item;
const { TextArea } = Input;

const WarningOn = styled.p`
    color:#fc2f4e;
`
const WarningOff = styled.p`
    color:#6be594;
`

class ClassForm extends React.Component {

    constructor(){
        super();

        this.state = {
            overallExpe : 0,
            levelOfDiffculty : 0,
            extraComment: '',
            knowBeforeCourse: '',
            hasError : false
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
    }

    levelOfDiffcultyOnChange(value){
        this.setState({levelOfDiffculty : value})
    }

    checkboxOnChange(value){
        this.setState({a : value})
    }

    knowBeforeCourseOnChange(e){
        this.setState({ knowBeforeCourse: e.target.value })
    }

    extraCommentOnChange(e){
        this.setState({ extraComment: e.target.value })
    }

    getLabel(val, tag){

        if(tag === "OE"){
            if(val == 0){            
                return(
                    <WarningOn>* Overall Experience</WarningOn>
                )
            }else{
                return(
                    <WarningOff>Overall Experience</WarningOff>
                )
            }
        }

        if(tag === "LD"){
            if(val === 0 ){
                return(
                    <WarningOn>* Level Of Diffculty </WarningOn>
                )
            }else{
                return(
                    <WarningOff> Level Of Diffculty </WarningOff>
                )
            }   
        }

        if(tag === "knowBeforeCourse"){
            if(val === '' ){
                return(
                    <WarningOn>* What to know before the course </WarningOn>
                )
            }else{
                return(
                    <WarningOff> What to know before the course </WarningOff>
                )
            }
        }

        if(tag === "Comment"){
            if(val === ''){
                return(
                    <WarningOn>* Commnet </WarningOn>
                )
            }else{
                return(
                    <WarningOff> Commnet </WarningOff>
                )
            }
        }
    }

    submitClicked(){
        if( this.state.overallExpe === 0 
         || this.state.levelOfDiffculty === 0
         || this.state.knowBeforeCourse === ''
         || this.state.extraComment === '')
         {
            this.setState({hasError: true});
         }else{
           //successfully submitted 
           console.log(this.state);  
         }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol : {span: 10}
        };
        const hasError = this.state.hasError;

        return (
            <div className='button-center'>
                <Header />
                <h1>Rate a Class</h1>
                <div>
                    <Card style={{ width: 500}} hidden = {!hasError}>
                        <p>Please Check your inputs ! </p>
                    </Card>
                </div>
                <div align="center">
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label = {this.getLabel(this.state.overallExpe, "OE")}
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
                            label = {this.getLabel(this.state.levelOfDiffculty, "LD")}
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
                            label = {this.getLabel(this.state.knowBeforeCourse, "knowBeforeCourse")}
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
                            label = {this.getLabel(this.state.extraComment, "Comment")}
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
