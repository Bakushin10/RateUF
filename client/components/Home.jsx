import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Grid } from 'react-bootstrap';
import Header from './Header-Footer/Header';
import Footer from './Header-Footer/Footer';

export default class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <div>
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
        <Footer />
      </div>
    );
  }
}
