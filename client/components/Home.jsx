import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Grid } from 'react-bootstrap';
import Head from './Header-Footer/Head';
// import Foot from './Header-Footer/Foot';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Head />
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
