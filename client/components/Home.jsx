import React from 'react';
import { Link } from 'react-router-dom';
import Head from './Header-Footer/Head';
import { Col, Row, Button, Radio } from 'antd';
// import Foot from './Header-Footer/Foot';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Head />
        <div className="welcome-box">
          <h1 className="welcome-text">Welcome to RateUF</h1>
          <h2 className="start">Start Here:</h2>

          <div className="welcome-buttons">
            <Col span={3} offset={3}>
              <Button type="primary" className="botones" size="large">
                <a href="/#/Professor"> Professors </a>
              </Button>
            </Col>
            <Col span={3} offset={3}>
              <Button type="primary" className="botones" size="large">
                <a href="/#/Class">Classes</a>
              </Button>
            </Col>
            <Col span={3} offset={2}>
              <Button type="primary" className="botones" size="large">
                Degree Outline
              </Button>
            </Col>
          </div>
        </div>
        {/* <div>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <Link to="/ProfessorForm">
                  <Button>Professor Form</Button>
                </Link>
              </Col>
              <Col xs={6} md={4}>
                <Link to="/ClassForm">
                  <Button>Class Form</Button>
                </Link>
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer /> */}
        {/* <Foot /> */}
      </div>
    );
  }
}
