//client/components/ProfessorForm.jsx
import React from 'react';
// import { Button, ButtonToolbar } from 'react-bootstrap';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import 'antd/dist/antd.css';

import ShowAllProf from './ShowAllProf';

import { Form, Select, Radio, Input, Slider, Icon, Rate } from 'antd';
import Header from './Header';
import Footer from './Footer';

const FormItem = Form.Item;

class ProfessorForm extends React.Component {
  render() {
      const formItemLayout = {
          labelCol: {span: 8},
          wrapperCol : {span: 9}
      };

      return (
          <div className='button-center'>
          <Header />
          <ShowAllProf/>
          <br/>

          <div>
              <h1>Rate a Professor</h1>
              <Form.Item
                  {... formItemLayout}
                  label = "Select a Professor"
                  hasFeedback
              >
                  <Select name="select" placeholder="Please select a professor">
                      <Select.Option value="Lisa Anthony">Lisa Anthony</Select.Option>
                      <Select.Option value="David Small">David Small</Select.Option>
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
                  label="Communication of Ideas"
              >
                  <Slider marks={{
                      0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                      50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                      100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                  }} />
              </Form.Item>
              <Form.Item
                  {...formItemLayout}
                  label="Facilitation of Learning"
              >
                  <Slider marks={{
                      0: <div><Icon type="frown-o" style={{ fontSize: 15, color: '#db0f0f' }}/><div>meh</div></div>,
                      50: <div><Icon type="meh-o"   style={{ fontSize: 15, color: '#08c' }}/><div>good</div></div>,
                      100: <div><Icon type="smile-o" style={{ fontSize: 15, color: '#77f987' }}/><div>excellent</div></div>
                  }} />
              </Form.Item>
              <Form.Item
                  {...formItemLayout}
                  label="Would Take Again?"
              >
                  <Radio.Group>
                      <Radio.Button value="a">Yes</Radio.Button>
                      <Radio.Button value="b">No</Radio.Button>
                  </Radio.Group>
              </Form.Item>
              <Form.Item
                  {...formItemLayout}
                  label="Extra Comments"
              >
                  <Input />
              </Form.Item>
              <FormItem
                  {...formItemLayout}
                  label="Rate"
              >
                  <Rate />
              </FormItem>
          </div>
          <Footer />
          </div>
      )
  }
}

  export default ProfessorForm;
