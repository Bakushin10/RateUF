//client/components/ProfessorForm.jsx
import React from 'react';
// import { Button, ButtonToolbar } from 'react-bootstrap';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';

import 'antd/dist/antd.css';

import { Form, Select, Input, Slider, Icon, Button } from 'antd';
import Header from './Header';
import Footer from './Footer';

const FormItem = Form.Item;

class ClassForm extends React.Component {
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
                    <Form.Item
                        {...formItemLayout}
                        label = "Select a Class"
                        hasFeedback
                    >
                        <Select name="select" placeholder="Please select a Class">
                            <Select.Option value="CDA 4630">CDA 4630 Embedded Systems</Select.Option>
                            <Select.Option value="CIS 4914">CIS 4914 Senior Project</Select.Option>
                            <Select.Option value="COP 3502">COP 3503 Programming 1</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Overall Experience"
                    >
                        <Slider marks={{
                            0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                            50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                            100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                        }} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Level of Difficulty"
                    >
                        <Slider marks={{
                            0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                            50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                            100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                        }} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="What to know before the course"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Extra Comments"
                    >
                        <Input />
                    </Form.Item>

                    {/*dont need this. Just showing another option for selecting something beforehand. */}
                    {/*instead of the user typing, we have predetermined options and they are able to chose */}
                    {/*whatever ones they want. (able to select as many as you want)*/}
                    <FormItem
                        {...formItemLayout}
                        label="Select what to know beforehand"
                    >
                        <Select mode="multiple" placeholder="Please select what someone should
                        know beforehand">
                            <Select.Option value="C++">C++</Select.Option>
                            <Select.Option value="Java">Java</Select.Option>
                            <Select.Option value="Javascript">Javascript</Select.Option>
                            <Select.Option value="Databases">Databases</Select.Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button align="center" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </FormItem>
                </div>
                <Footer />
            </div>
        )
    }
}
export default ClassForm;
