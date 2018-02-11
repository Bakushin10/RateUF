import React from 'react';
import { Form, Select, Radio, Input, Slider, Icon, Rate, Button } from 'antd';

import Header from './Header';
import Footer from './Footer';

const FormItem = Form.Item;
const { TextArea } = Input;

class ProfessorForm extends React.Component {

    constructor(){
        super();
        this.state = {
            overallExpe : 0,
            levelOfDiffculty : 0,
            communicationOfIdeas : 0,
            facilitationOfLearning : 0,
            wouldTakeAgain : "Yes", //by default
            extraComment: '' 
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

    submitClicked(){
        console.log("submitted");
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol : {span: 9}
        };
        const profName = this.props.match.params.profName;

        return (
            <div className='button-center'>
                <Header />
                <h1>{ profName }</h1>
                    <div align="center">
                        <Form>
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
                                label="Communication of Ideas"
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
                                label="Facilitation of Learning"
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
                                label="Would Take This Professor Again?"
                            >
                                <Select name="select" defaultValue="Yes" style={{ width: 80 }} onChange = {this.wouldTakeAgainOnChange} >
                                    <Select.Option value = {"Yes"}> Yes </Select.Option>
                                    <Select.Option  value = {"No"}> No  </Select.Option>
                                </Select>
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
                                label="Rate"
                            >
                                <Rate />
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
