import React from 'react';
import { Form, Select, Radio, Input, Slider, Icon, Rate, Button, Card } from 'antd';
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

class ProfessorForm extends React.Component {

    constructor(){
        super();
        this.state = {
            overallExpe : 0,
            levelOfDiffculty : 0,
            communicationOfIdeas : 0,
            facilitationOfLearning : 0,
            wouldTakeAgain : "Yes", //by default
            extraComment: '',
            hasError : false
        }
        
        this.overAllExpeOnChange = this.overAllExpeOnChange.bind(this);
        this.levelOfDiffcultyOnChange = this.levelOfDiffcultyOnChange.bind(this);
        this.communicationOfIdeasOnChange = this.communicationOfIdeasOnChange.bind(this);
        this.facilitationOfLearningOnChange = this.facilitationOfLearningOnChange.bind(this);
        this.wouldTakeAgainOnChange = this.wouldTakeAgainOnChange.bind(this);
        this.extraCommentOnChange = this.extraCommentOnChange.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
    }

    overAllExpeOnChange(value){
        this.setState({overallExpe : value})
    }

    levelOfDiffcultyOnChange(value){
        this.setState({levelOfDiffculty : value})
    }

    communicationOfIdeasOnChange(value){
        this.setState({communicationOfIdeas : value})
    }

    facilitationOfLearningOnChange(value){
        this.setState({facilitationOfLearning : value})
    }
    wouldTakeAgainOnChange(value){
        this.setState({wouldTakeAgain: value})
    }

    extraCommentOnChange(e){
        this.setState({ extraComment: e.target.value })
        console.log(this.state.extraComment)
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

        if(tag === "CI"){
            if(val === 0 ){
                return(
                    <WarningOn>* Communication </WarningOn>
                )
            }else{
                return(
                    <WarningOff> Communication </WarningOff>
                )
            }
        }

        if(tag === "FL"){
            if(val === 0){
                return(
                    <WarningOn>* Facilitation Of Learning </WarningOn>
                )
            }else{
                return(
                    <WarningOff> Facilitation Of Learning </WarningOff>
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
         || this.state.communicationOfIdeas === 0
         || this.state.facilitationOfLearning === 0
         || this.state.extraComment === '')
         {
            this.setState({hasError: true});
            console.log("input false");
         }else{
           //submit
           console.log(this.state);  
         }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol : {span: 9}
        };

        const profName = this.props.match.params.profName;
        const hasError = this.state.hasError;
        return (
            <div className='button-center'>
                <Header />                
                    <h1>{ profName }</h1>
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
                                label = {this.getLabel(this.state.communicationOfIdeas, "CI")}
                            >
                                <Slider
                                    onChange = {this.communicationOfIdeasOnChange}
                                    value = {this.state.communicationOfIdeas}
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
                                label = {this.getLabel(this.state.facilitationOfLearning, "FL")}
                            >
                                <Slider
                                    onChange = {this.facilitationOfLearningOnChange}
                                    value = {this.state.facilitationOfLearning}
                                    defaultValue = {0}
                                    marks={{
                                        0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                                        50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                                        100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                                    }} 
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
                                label="Would Take This Professor Again?"
                            >
                                <Select name="select" defaultValue="Yes" style={{ width: 80 }} onChange = {this.wouldTakeAgainOnChange} >
                                    <Select.Option value = {"Yes"}> Yes </Select.Option>
                                    <Select.Option  value = {"No"}> No  </Select.Option>
                                </Select>
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

export default ProfessorForm;
