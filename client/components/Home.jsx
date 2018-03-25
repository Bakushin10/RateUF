import React from 'react';
import { Link } from 'react-router-dom';
import Head from './Header-Footer/Head';
import Foot from './Header-Footer/Foot';
import { Col, Row, Button, Radio } from 'antd';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <div className="welcome-box">
          <h1 className="welcome-text">Welcome to RateUF</h1>
          <div className="welcome-buttons">
            <Col span={3} offset={3}>
            <a href="/#/Professor" >
              <Button type="default" className="botones" size="large" ghost>
                  Professors 
              </Button>
              </a>
            </Col>
            <Col span={3} offset={3}>
            <a href="/#/Class">
              <Button type="default" className="botones" size="large" ghost>
                Classes
              </Button>
              </a>
            </Col>
            <Col span={3} offset={2}>
            <a href="/#/CSECatalog">
              <Button type="default" className="botones" size="large" ghost>
                Degree Outline
              </Button>
              </a>
            </Col>
          </div>
        </div>
        <div className="whitespace"></div>
       <Foot />
      </div>
    );
  }
}
