import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Grid } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Grid>
            <Row>
              <Col xs={6} md={4}>
                <Link to="/Add">
                  <Button>Form</Button>
                </Link>
              </Col>
              <Col xs={6} md={4}>
                <Link to="/Add">
                  <Button>also Form</Button>
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
